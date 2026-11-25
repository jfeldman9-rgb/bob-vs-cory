import { GameSettings } from '../types/game';
import { StageDefinition } from '../data/stages';
import { VoiceBank, announcerClipForText } from './VoiceBank';
import { SfxBank, ambienceIdForStage, type LoopHandle, type SfxPlayOptions } from './SfxBank';
import type { FallbackKind, SfxOut } from './SfxDirector';

export class AudioEngine implements SfxOut {
  private ctx: AudioContext | null = null;
  private masterBus: GainNode | null = null;
  private musicBus: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private voiceBus: GainNode | null = null;
  private stingBus: GainNode | null = null;
  private ambienceBus: GainNode | null = null;

  /** ElevenLabs SFX / ambience / stings; procedural sounds below are the fallback. */
  public readonly sfx: SfxBank;
  private loops = new Map<string, LoopHandle>();
  private ambienceId: string | null = null;
  private stingEndsAt = 0;

  private musicTimer: number | null = null;
  private musicStep = 0;
  private currentStyle: StageDefinition['musicStyle'] | 'menu' | 'finish_him' = 'menu';
  private intenseMode = false;
  private settings: GameSettings;

  /** Recorded voice clips (ElevenLabs announcer + OpenAI TTS fighters). */
  public readonly voices: VoiceBank;

  constructor(settings: GameSettings) {
    this.settings = { ...settings };
    this.voices = new VoiceBank(() =>
      this.ctx && this.voiceBus ? { ctx: this.ctx, bus: this.voiceBus } : null
    );
    this.sfx = new SfxBank(() =>
      this.ctx && this.sfxBus && this.stingBus && this.ambienceBus
        ? { ctx: this.ctx, sfx: this.sfxBus, sting: this.stingBus, ambience: this.ambienceBus }
        : null
    );
  }

  public unlock(): void {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterBus = this.ctx.createGain();
      this.musicBus = this.ctx.createGain();
      this.sfxBus = this.ctx.createGain();
      this.voiceBus = this.ctx.createGain();
      this.stingBus = this.ctx.createGain();
      this.ambienceBus = this.ctx.createGain();

      this.stingBus.connect(this.masterBus);
      this.ambienceBus.connect(this.masterBus);
      this.musicBus.connect(this.masterBus);
      this.sfxBus.connect(this.masterBus);
      this.voiceBus.connect(this.masterBus);
      this.masterBus.connect(this.ctx.destination);
      this.applySettings(this.settings);
      // One-shots are ~9 MB of PCM in total: decode them all up front.
      this.sfx.preload(SfxBank.oneShotIds());
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public applySettings(settings: GameSettings): void {
    this.settings = { ...settings };
    if (!this.ctx || !this.masterBus || !this.musicBus || !this.sfxBus || !this.voiceBus) return;
    const now = this.ctx.currentTime;
    this.masterBus.gain.setTargetAtTime(settings.masterVolume, now, 0.03);
    this.musicBus.gain.setTargetAtTime(settings.musicVolume * 0.45, now, 0.05);
    this.sfxBus.gain.setTargetAtTime(settings.sfxVolume, now, 0.03);
    this.voiceBus.gain.setTargetAtTime(settings.voiceVolume, now, 0.03);
    if (this.stingBus) this.stingBus.gain.setTargetAtTime(settings.musicVolume * 0.85, now, 0.05);
    if (this.ambienceBus) this.ambienceBus.gain.setTargetAtTime(settings.sfxVolume * 0.55, now, 0.05);
  }

  // === SAMPLE SFX (SfxOut) ===
  public play(id: string, opts?: SfxPlayOptions): boolean {
    this.unlock();
    return this.sfx.play(id, opts);
  }

  public fallback(kind: FallbackKind): void {
    switch (kind) {
      case 'hit': this.playHit(false); break;
      case 'hit_heavy': this.playHit(true); break;
      case 'block': this.playBlock(false); break;
      case 'flawless': this.playBlock(true); break;
      case 'parry': this.playParry(); break;
      case 'teleport': this.playTeleport(); break;
      case 'glitter': this.playGlitterChime(); break;
      case 'splat': this.playEggplantSplat(); break;
      case 'gong': this.playGong(); break;
    }
  }

  public startLoop(key: string, id: string): void {
    if (this.loops.has(key)) return;
    const h = this.sfx.startLoop(id, { bus: 'sfx', gainDb: -6, fadeSec: 0.2 });
    if (h) this.loops.set(key, h);
  }

  public stopLoop(key: string, fadeSec = 0.4): void {
    const h = this.loops.get(key);
    if (h) {
      h.stop(fadeSec);
      this.loops.delete(key);
    }
  }

  /** Music sting, queued after any sting still playing. Stings are not stage music. */
  public sting(id: string, opts: { delayMs?: number; stopMusic?: boolean } = {}): void {
    this.unlock();
    if (!this.ctx) return;
    const buf = this.sfx.isReady(id);
    if (!buf) {
      // Not decoded yet: load and try once more when it arrives (if still soon).
      const asked = this.ctx.currentTime;
      void this.sfx.ensure([id]).then(() => {
        if (this.ctx && this.ctx.currentTime - asked < 1.5 && this.sfx.isReady(id)) this.sting(id, opts);
      });
      return;
    }
    if (opts.stopMusic) {
      this.stopMusic();
      this.stopLoop('drone', 0.8);
    }
    const now = this.ctx.currentTime;
    const startAt = Math.max(now + (opts.delayMs ?? 0) / 1000, this.stingEndsAt);
    const dur = this.sfx.duration(id);
    this.sfx.play(id, { bus: 'sting', exact: true, delayMs: (startAt - now) * 1000 });
    this.stingEndsAt = startAt + dur;
  }

  /** Decode the stings + ambience a match needs before it starts. */
  public async preloadMatchAudio(stage: string, fighters: string[]): Promise<void> {
    this.unlock();
    const ids = ['sting_versus', 'sting_finish_drone', 'sting_game_over', 'ui_gong', 'misc_round_bell'];
    for (const f of fighters) ids.push(`sting_fatality_${f}`, `sting_victory_${f}`);
    const amb = ambienceIdForStage(stage);
    if (amb) ids.push(amb);
    await this.sfx.ensure(ids);
  }

  /** Per-stage ambience bed (null stops it). */
  public setAmbience(stage: string | null): void {
    const id = stage ? ambienceIdForStage(stage) : null;
    if (id === this.ambienceId && this.loops.has('ambience')) return;
    this.stopLoop('ambience', 1.0);
    this.ambienceId = id;
    if (!id) return;
    const h = this.sfx.startLoop(id, { bus: 'ambience', fadeSec: 1.5 });
    if (h) this.loops.set('ambience', h);
    else void this.sfx.ensure([id]).then(() => {
      if (this.ambienceId === id && !this.loops.has('ambience')) this.setAmbience(stage);
    });
  }

  /** Stop ambience, drone, dizzy loops (leaving a match). */
  public stopMatchAudio(): void {
    for (const k of Array.from(this.loops.keys())) this.stopLoop(k, 0.4);
    this.ambienceId = null;
    this.stingEndsAt = 0;
  }

  public playUI(kind: 'hover' | 'confirm' | 'back' | 'lockin'): void {
    this.unlock();
    const id = kind === 'hover' ? 'ui_hover' : kind === 'back' ? 'ui_back' : kind === 'lockin' ? 'ui_lockin' : 'ui_confirm';
    if (!this.sfx.play(id, { exact: kind !== 'hover', gainDb: kind === 'hover' ? -8 : -3 }) && kind !== 'hover') this.playUIClickTone();
  }

  public setMusic(style: StageDefinition['musicStyle'] | 'menu' | 'finish_him', intense: boolean = false): void {
    if (this.currentStyle === style && this.intenseMode === intense && this.musicTimer !== null) return;
    this.currentStyle = style;
    this.intenseMode = intense;
    this.stopMusic();
    if (style !== 'finish_him') this.stopLoop('drone', 0.6);

    if (typeof window === 'undefined') return;
    if (style === 'finish_him') {
      // Recorded Finish Him drone (ElevenLabs loop); procedural drone only as fallback.
      if (!this.loops.has('drone')) {
        const h = this.sfx.startLoop('sting_finish_drone', { bus: 'sting', fadeSec: 0.8, gainDb: -2 });
        if (h) this.loops.set('drone', h);
      }
      if (this.loops.has('drone')) {
        this.musicTimer = window.setInterval(() => {}, 1000); // marks music as active
        return;
      }
    }
    const tempoMs =
      style === 'finish_him'
        ? 380
        : style === 'cyberpunk'
        ? intense ? 122 : 134
        : style === 'nudisco'
        ? intense ? 118 : 128
        : style === 'orchestral'
        ? intense ? 145 : 165
        : intense ? 130 : 145;

    this.musicTimer = window.setInterval(() => {
      this.tickMusic();
    }, tempoMs);
  }

  public stopMusic(): void {
    if (this.musicTimer !== null) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }

  private tickMusic(): void {
    if (!this.ctx || !this.musicBus || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const step = this.musicStep++ % 16;

    if (this.currentStyle === 'finish_him') {
      // Ominous low bass drone + tension heartbeat
      if (step % 4 === 0) {
        this.playTone(55, 0.36, 'sawtooth', 0.28, this.musicBus, 140);
      }
      if (step % 8 === 0) {
        this.playTone(41.2, 0.7, 'triangle', 0.35, this.musicBus, 110);
      }
      return;
    }

    if (this.currentStyle === 'menu') {
      const notes = [110, 130.8, 146.8, 164.8, 146.8, 130.8, 98, 110];
      if (step % 2 === 0) {
        this.playTone(notes[(step / 2) % notes.length], 0.22, 'sawtooth', 0.14, this.musicBus, 420);
      }
      if (step % 4 === 0) {
        this.playKick(0.24, this.musicBus);
      }
      return;
    }

    // 4 Stage Soundtracks!
    if (this.currentStyle === 'cyberpunk') {
      // Industrial Matrix breakbeat
      const bass = [55, 55, 65.4, 55, 73.4, 55, 61.7, 55];
      if (step === 0 || step === 6 || step === 10) this.playKick(0.32, this.musicBus);
      if (step === 4 || step === 12) this.playNoiseBurst(0.08, 0.16, this.musicBus, 1800);
      if (step % 2 === 0) {
        this.playTone(bass[(step / 2) % bass.length], 0.12, 'sawtooth', 0.2, this.musicBus, 520);
      }
      if (this.intenseMode && step % 2 === 1) {
        this.playTone(220 * (step % 4 === 1 ? 1 : 1.5), 0.06, 'square', 0.09, this.musicBus, 1200);
      }
    } else if (this.currentStyle === 'nudisco') {
      // Funky octave Nu-Disco synth bass + four-on-the-floor
      const discoBass = [110, 220, 110, 220, 130.8, 261.6, 146.8, 293.6];
      if (step % 4 === 0) this.playKick(0.3, this.musicBus);
      if (step % 4 === 2) this.playNoiseBurst(0.05, 0.11, this.musicBus, 5500);
      this.playTone(discoBass[step % discoBass.length], 0.09, 'triangle', 0.2, this.musicBus, 900);
      if (step % 4 === 0 || (this.intenseMode && step % 2 === 0)) {
        this.playTone(440, 0.08, 'sine', 0.08, this.musicBus, 2400);
      }
    } else if (this.currentStyle === 'orchestral') {
      // Epic Colosseum brass/choir & war drums
      const choir = [146.8, 174.6, 220, 196];
      if (step === 0 || step === 3 || step === 8 || step === 11) this.playKick(0.35, this.musicBus);
      if (step % 4 === 0) {
        const root = choir[(step / 4) % choir.length];
        this.playTone(root, 0.42, 'sawtooth', 0.15, this.musicBus, 650);
        this.playTone(root * 1.5, 0.42, 'triangle', 0.11, this.musicBus, 950);
      }
    } else {
      // Scottsdale midnight synthwave
      const wave = [98, 98, 123.5, 146.8, 130.8, 130.8, 110, 98];
      if (step % 4 === 0) this.playKick(0.28, this.musicBus);
      if (step === 4 || step === 12) this.playNoiseBurst(0.09, 0.14, this.musicBus, 2200);
      if (step % 2 === 0) {
        this.playTone(wave[(step / 2) % wave.length], 0.16, 'sawtooth', 0.18, this.musicBus, 700);
      }
      if (this.intenseMode && step % 4 === 2) {
        this.playTone(392, 0.12, 'sine', 0.09, this.musicBus, 1800);
      }
    }
    void now;
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType,
    vol: number,
    dest: AudioNode,
    filterHz: number = 2200
  ): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterHz, now);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  private playKick(vol: number, dest: AudioNode): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(145, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.11);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
    osc.connect(gain);
    gain.connect(dest);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  private playNoiseBurst(duration: number, vol: number, dest: AudioNode, filterHz: number = 1400): void {
    if (!this.ctx) return;
    const len = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = filterHz;
    const gain = this.ctx.createGain();
    gain.gain.value = vol;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    src.start();
  }

  // === COMBAT SFX ===
  public playHit(heavy: boolean): void {
    this.unlock();
    if (!this.ctx || !this.sfxBus) return;
    const pitchJitter = 0.88 + Math.random() * 0.24;
    this.playKick(heavy ? 0.65 : 0.4, this.sfxBus);
    this.playNoiseBurst(heavy ? 0.14 : 0.08, heavy ? 0.45 : 0.28, this.sfxBus, (heavy ? 900 : 1600) * pitchJitter);
    if (heavy) {
      this.playTone(95 * pitchJitter, 0.18, 'sawtooth', 0.25, this.sfxBus, 500);
    }
  }

  public playBlock(flawless: boolean = false): void {
    this.unlock();
    if (!this.ctx || !this.sfxBus) return;
    this.playNoiseBurst(0.06, 0.22, this.sfxBus, 900);
    this.playTone(flawless ? 880 : 210, flawless ? 0.16 : 0.08, flawless ? 'triangle' : 'square', 0.25, this.sfxBus, 2400);
    if (flawless) {
      this.playTone(1320, 0.2, 'sine', 0.22, this.sfxBus, 3200);
    }
  }

  public playTeleport(): void {
    this.unlock();
    if (!this.ctx || !this.sfxBus) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(1250, now + 0.12);
    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain);
    gain.connect(this.sfxBus);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playGlitterChime(): void {
    this.unlock();
    if (!this.ctx || !this.sfxBus) return;
    [880, 1174, 1568, 2093].forEach((hz, idx) => {
      setTimeout(() => {
        if (this.sfxBus) this.playTone(hz, 0.14, 'sine', 0.16, this.sfxBus, 4000);
      }, idx * 28);
    });
  }

  public playParry(): void {
    this.unlock();
    if (!this.ctx || !this.sfxBus) return;
    this.playTone(620, 0.22, 'triangle', 0.3, this.sfxBus, 2800);
    this.playTone(1240, 0.26, 'sine', 0.26, this.sfxBus, 3600);
  }

  public playEggplantSplat(): void {
    this.unlock();
    if (!this.ctx || !this.sfxBus) return;
    this.playKick(0.7, this.sfxBus);
    this.playNoiseBurst(0.24, 0.45, this.sfxBus, 680);
    this.playTone(140, 0.28, 'sawtooth', 0.3, this.sfxBus, 420);
  }

  public playGong(): void {
    this.unlock();
    if (!this.ctx || !this.sfxBus) return;
    if (this.sfx.play('ui_gong', { exact: true, gainDb: -4 })) return;
    this.playTone(110, 0.85, 'sawtooth', 0.28, this.sfxBus, 600);
    this.playTone(165, 0.75, 'triangle', 0.22, this.sfxBus, 900);
    this.playNoiseBurst(0.2, 0.18, this.sfxBus, 1200);
  }

  public playUIClick(): void {
    this.playUI('confirm');
  }

  private playUIClickTone(): void {
    if (!this.ctx || !this.sfxBus) return;
    this.playTone(540, 0.05, 'triangle', 0.15, this.sfxBus, 1800);
  }

  public speakAnnouncer(text: string, isFinalRound: boolean = false): void {
    // Safety guard: announcer NEVER says "K.O."!
    const clean = text.replace(/\bK\.?O\.?\b/gi, 'VICTORY');
    this.playGong();

    // Prefer the recorded announcer (Jason clone via ElevenLabs).
    const clip = announcerClipForText(clean, isFinalRound);
    if (clip && this.voices.play(clip)) return;

    // Optional Web Speech API announcer voice with clean fallback
    if (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      this.settings.masterVolume > 0.05 &&
      this.settings.voiceVolume > 0.05
    ) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(clean);
        utter.rate = 0.92;
        utter.pitch = 0.62; // Deep MK announcer baritone!
        utter.volume = Math.min(1, this.settings.masterVolume * this.settings.voiceVolume);
        window.speechSynthesis.speak(utter);
      } catch {
        // Ignore speech synthesis errors on restricted platforms
      }
    }
  }
}
