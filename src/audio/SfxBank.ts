import manifest from '../data/sfx-manifest.json';
import type { StageId } from '../types/game';

/**
 * ElevenLabs-generated sound effects, ambience loops and music stings
 * (docs/v2/SFX-NOTES.md). Every play call returns false when the clip is not
 * decoded yet, so callers can fall back to the procedural Web Audio sounds.
 */
export interface SfxEntry {
  files: string[];
  loop: boolean;
  durationTarget: number;
  gainDb?: number;
}

export const SFX_MANIFEST = manifest as Record<string, SfxEntry>;
export const SFX_IDS = Object.keys(SFX_MANIFEST);

export function sfxUrl(file: string): string {
  return `./assets/audio/${file}`;
}

export type StageVariant = 'night' | 'day';

const STAGE_KEYS: Record<string, string> = {
  'matrix-subway': 'subway',
  'disco-penthouse': 'penthouse',
  'eggplant-colosseum': 'colosseum',
  'scottsdale-lounge': 'lounge',
};

const FOOTSTEP_SURFACE: Record<string, string> = {
  'matrix-subway': 'step_tile',
  'disco-penthouse': 'step_glass',
  'eggplant-colosseum': 'step_sand',
  'scottsdale-lounge': 'step_flagstone',
};

export function ambienceIdForStage(stage: StageId | string, variant: StageVariant = 'night'): string | null {
  const key = STAGE_KEYS[stage];
  if (!key) return null;
  const id = `amb_${key}_${variant}`;
  return SFX_MANIFEST[id] ? id : null;
}

export function footstepIdForStage(stage: StageId | string): string {
  return FOOTSTEP_SURFACE[stage] ?? 'step_tile';
}

/** PLAN.md §7: ±8% random pitch and ±2 dB random gain on every one-shot. */
export const PITCH_VARIATION = 0.08;
export const GAIN_VARIATION_DB = 2;

export function randomizePlayback(rng: () => number = Math.random, pitchVar = PITCH_VARIATION, gainVarDb = GAIN_VARIATION_DB): { rate: number; gainDb: number } {
  return {
    rate: 1 + (rng() * 2 - 1) * pitchVar,
    gainDb: (rng() * 2 - 1) * gainVarDb,
  };
}

export const dbToGain = (db: number): number => Math.pow(10, db / 20);

/** Variant picker that avoids repeating the previous take of the same id. */
export class VariantPicker {
  private last = new Map<string, number>();
  constructor(private rng: () => number = Math.random) {}
  public pick(id: string, count: number): number {
    if (count <= 1) return 0;
    const prev = this.last.get(id) ?? -1;
    let i = Math.floor(this.rng() * count);
    if (i === prev) i = (i + 1) % count;
    this.last.set(id, i);
    return i;
  }
}

export interface SfxPlayOptions {
  /** Extra gain in dB on top of manifest gain and random variation. */
  gainDb?: number;
  /** Disable the random pitch/gain variation (stings, UI). */
  exact?: boolean;
  delayMs?: number;
  /** -1..1 stereo position. */
  pan?: number;
  /** Bus override; defaults to sfx. */
  bus?: 'sfx' | 'sting' | 'ambience';
  onEnded?: () => void;
}

export interface LoopHandle {
  stop(fadeSec?: number): void;
}

type Buses = { ctx: AudioContext; sfx: AudioNode; sting: AudioNode; ambience: AudioNode };

export class SfxBank {
  private buffers = new Map<string, AudioBuffer>();
  private pending = new Map<string, Promise<AudioBuffer | null>>();
  private picker: VariantPicker;

  constructor(private getBuses: () => Buses | null, private rng: () => number = Math.random) {
    this.picker = new VariantPicker(rng);
  }

  public has(id: string): boolean {
    return Boolean(SFX_MANIFEST[id]);
  }

  /** Decode every take of the given ids (one-shots are small; loops load on demand). */
  public preload(ids: string[]): void {
    for (const id of ids) {
      const e = SFX_MANIFEST[id];
      if (!e) continue;
      for (const f of e.files) void this.load(f);
    }
  }

  /** All short one-shots (excludes ambience, the drone and music stings). */
  public static oneShotIds(): string[] {
    return SFX_IDS.filter((id) => !id.startsWith('amb_') && !id.startsWith('sting_'));
  }

  /** Seconds of the first decoded take (0 when not decoded). */
  public duration(id: string): number {
    const f = SFX_MANIFEST[id]?.files.find((x) => this.buffers.has(x));
    return f ? this.buffers.get(f)!.duration : 0;
  }

  public isReady(id: string): boolean {
    const e = SFX_MANIFEST[id];
    return Boolean(e && e.files.some((f) => this.buffers.has(f)));
  }

  private load(file: string): Promise<AudioBuffer | null> {
    const cached = this.buffers.get(file);
    if (cached) return Promise.resolve(cached);
    const inflight = this.pending.get(file);
    if (inflight) return inflight;
    const b = this.getBuses();
    if (!b || typeof fetch === 'undefined') return Promise.resolve(null);
    const p = fetch(sfxUrl(file))
      .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status)))))
      .then((buf) => b.ctx.decodeAudioData(buf))
      .then((ab) => {
        this.buffers.set(file, ab);
        return ab;
      })
      .catch(() => null)
      .finally(() => this.pending.delete(file));
    this.pending.set(file, p);
    return p;
  }

  /**
   * Play one take of `id`. Returns false (and starts loading it) when nothing is
   * decoded yet, so the caller can play the procedural fallback instead.
   */
  public play(id: string, opts: SfxPlayOptions = {}): boolean {
    const e = SFX_MANIFEST[id];
    const b = this.getBuses();
    if (!e || !b) return false;
    const ready = e.files.filter((f) => this.buffers.has(f));
    if (ready.length === 0) {
      this.preload([id]);
      return false;
    }
    const file = ready[this.picker.pick(id, ready.length)];
    const buf = this.buffers.get(file)!;
    const v = opts.exact ? { rate: 1, gainDb: 0 } : randomizePlayback(this.rng);
    const src = b.ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = v.rate;
    const g = b.ctx.createGain();
    g.gain.value = dbToGain((e.gainDb ?? 0) + (opts.gainDb ?? 0) + v.gainDb);
    let node: AudioNode = src;
    src.connect(g);
    node = g;
    if (opts.pan && typeof b.ctx.createStereoPanner === 'function') {
      const p = b.ctx.createStereoPanner();
      p.pan.value = Math.max(-1, Math.min(1, opts.pan));
      g.connect(p);
      node = p;
    }
    node.connect(opts.bus === 'sting' ? b.sting : opts.bus === 'ambience' ? b.ambience : b.sfx);
    if (opts.onEnded) src.onended = () => opts.onEnded!();
    const when = b.ctx.currentTime + Math.max(0, (opts.delayMs ?? 0) / 1000);
    src.start(when);
    return true;
  }

  /** Start a seamless loop (ambience, drone, dizzy birds). Null when not decoded yet. */
  public startLoop(id: string, opts: { gainDb?: number; fadeSec?: number; bus?: 'sfx' | 'sting' | 'ambience' } = {}): LoopHandle | null {
    const e = SFX_MANIFEST[id];
    const b = this.getBuses();
    if (!e || !b) return null;
    const buf = this.buffers.get(e.files[0]);
    if (!buf) {
      this.preload([id]);
      return null;
    }
    const src = b.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const g = b.ctx.createGain();
    const target = dbToGain((e.gainDb ?? 0) + (opts.gainDb ?? 0));
    const now = b.ctx.currentTime;
    const fade = opts.fadeSec ?? 0.6;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(target, now + fade);
    src.connect(g);
    g.connect(opts.bus === 'sting' ? b.sting : opts.bus === 'sfx' ? b.sfx : b.ambience);
    src.start(now);
    let stopped = false;
    return {
      stop: (fadeSec = 0.5) => {
        if (stopped) return;
        stopped = true;
        const t = b.ctx.currentTime;
        g.gain.cancelScheduledValues(t);
        g.gain.setValueAtTime(g.gain.value, t);
        g.gain.linearRampToValueAtTime(0.0001, t + fadeSec);
        try {
          src.stop(t + fadeSec + 0.05);
        } catch {
          /* already stopped */
        }
      },
    };
  }

  /** Resolve once the given ids are decoded (or failed). */
  public async ensure(ids: string[]): Promise<void> {
    const ps: Promise<unknown>[] = [];
    for (const id of ids) for (const f of SFX_MANIFEST[id]?.files ?? []) ps.push(this.load(f));
    await Promise.all(ps);
  }
}
