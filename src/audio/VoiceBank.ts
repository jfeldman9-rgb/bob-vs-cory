import manifest from '../data/voice-manifest.json';

export type VoiceSpeaker = 'announcer' | 'bob' | 'cory';

export interface VoiceLine {
  id: string;
  speaker: VoiceSpeaker | string;
  file: string;
  trigger: string;
  text: string;
  source: string;
}

export const VOICE_LINES: VoiceLine[] = manifest as VoiceLine[];
const BY_ID = new Map<string, VoiceLine>(VOICE_LINES.map((l) => [l.id, l]));

const norm = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const BY_TEXT = new Map<string, VoiceLine>();
for (const l of VOICE_LINES) {
  const key = `${l.speaker}|${norm(l.text)}`;
  if (!BY_TEXT.has(key)) BY_TEXT.set(key, l);
}

/** Never let any clip id or text that reads "K.O." through. */
export const FORBIDDEN_KO = /\bK\.?\s?O\b\.?/i;

export function getVoiceLine(id: string): VoiceLine | undefined {
  return BY_ID.get(id);
}

export function findLineByText(speaker: string, text: string): VoiceLine | undefined {
  return BY_TEXT.get(`${speaker}|${norm(text)}`);
}

export function idsWithPrefix(prefix: string): string[] {
  return VOICE_LINES.filter((l) => l.id.startsWith(prefix)).map((l) => l.id);
}

export function voiceUrl(line: VoiceLine): string {
  return `./assets/audio/voice/${line.file}`;
}

/**
 * Maps an on-screen announcer banner (CombatEngine.setAnnouncer text) to a
 * recorded announcer clip id. Returns null when no clip fits.
 */
export function announcerClipForText(text: string, isFinalRound = false): string | null {
  const t = norm(text);
  if (FORBIDDEN_KO.test(text)) return null;
  const round = /^round (\d+)$/.exec(t);
  if (round) {
    const n = Number(round[1]);
    if (isFinalRound) return 'ann_final_round';
    return n >= 1 && n <= 3 ? `ann_round_${n}` : 'ann_final_round';
  }
  const table: Record<string, string> = {
    'final round': 'ann_final_round',
    fight: 'ann_fight',
    'finish him': 'ann_finish_him',
    fatality: 'ann_fatality',
    brutality: 'ann_brutality',
    'time over': 'ann_time',
    'double defeat': 'ann_double_knockout',
    'agent bob wins': 'ann_bob_wins',
    'flamboyant cory wins': 'ann_cory_wins',
    'inevitable parm': 'ann_inevitable_parm',
    'runway aubergine': 'ann_runway_aubergine',
  };
  return table[t] ?? null;
}

/** Picks a random entry, avoiding an immediate repeat of the last pick for that pool. */
export class Shuffler {
  private last = new Map<string, string>();
  constructor(private rng: () => number = Math.random) {}
  pick(pool: string[], key = pool.join(',')): string | null {
    if (pool.length === 0) return null;
    const prev = this.last.get(key);
    const options = pool.length > 1 ? pool.filter((p) => p !== prev) : pool;
    const choice = options[Math.floor(this.rng() * options.length) % options.length];
    this.last.set(key, choice);
    return choice;
  }
}

/**
 * Loads and plays recorded voice clips through the AudioEngine voice bus.
 * One "channel" per speaker: a new line from a speaker cuts that speaker's
 * previous line, so grunts never pile up.
 */
export class VoiceBank {
  private buffers = new Map<string, AudioBuffer>();
  private pending = new Map<string, Promise<AudioBuffer | null>>();
  private playing = new Map<string, AudioBufferSourceNode>();
  private lastPlayAt = new Map<string, number>();

  constructor(private getContext: () => { ctx: AudioContext; bus: AudioNode } | null) {}

  public has(id: string): boolean {
    return BY_ID.has(id);
  }

  public preload(ids: string[]): void {
    for (const id of ids) void this.load(id);
  }

  private load(id: string): Promise<AudioBuffer | null> {
    const cached = this.buffers.get(id);
    if (cached) return Promise.resolve(cached);
    const inflight = this.pending.get(id);
    if (inflight) return inflight;
    const line = BY_ID.get(id);
    const c = this.getContext();
    if (!line || !c || typeof fetch === 'undefined') return Promise.resolve(null);
    const p = fetch(voiceUrl(line))
      .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status)))))
      .then((buf) => c.ctx.decodeAudioData(buf))
      .then((ab) => {
        this.buffers.set(id, ab);
        return ab;
      })
      .catch(() => null)
      .finally(() => this.pending.delete(id));
    this.pending.set(id, p);
    return p;
  }

  /**
   * Play a clip. `cooldownMs` suppresses rapid repeats on the same speaker channel
   * (used for grunts). Returns false if the clip is unknown or rate-limited.
   */
  public play(id: string, opts: { cooldownMs?: number; delayMs?: number; interrupt?: boolean; gain?: number } = {}): boolean {
    const line = BY_ID.get(id);
    if (!line || FORBIDDEN_KO.test(line.text)) return false;
    const channel = String(line.speaker);
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const last = this.lastPlayAt.get(channel) ?? -Infinity;
    if (opts.cooldownMs && now - last < opts.cooldownMs) return false;
    // Don't let a grunt cut off a real spoken line already in progress.
    if (opts.interrupt === false && this.playing.has(channel)) return false;
    this.lastPlayAt.set(channel, now);
    const start = () => {
      void this.load(id).then((buf) => {
        const c = this.getContext();
        if (!buf || !c) return;
        const prev = this.playing.get(channel);
        if (prev) {
          try {
            prev.stop();
          } catch {
            /* already stopped */
          }
        }
        const src = c.ctx.createBufferSource();
        src.buffer = buf;
        const g = c.ctx.createGain();
        g.gain.value = opts.gain ?? 1;
        src.connect(g);
        g.connect(c.bus);
        src.onended = () => {
          if (this.playing.get(channel) === src) this.playing.delete(channel);
        };
        this.playing.set(channel, src);
        src.start();
      });
    };
    if (opts.delayMs && opts.delayMs > 0 && typeof window !== 'undefined') window.setTimeout(start, opts.delayMs);
    else start();
    return true;
  }

  public stopAll(): void {
    for (const src of this.playing.values()) {
      try {
        src.stop();
      } catch {
        /* ignore */
      }
    }
    this.playing.clear();
  }
}
