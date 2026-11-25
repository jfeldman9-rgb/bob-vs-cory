import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  SFX_IDS,
  SFX_MANIFEST,
  VariantPicker,
  ambienceIdForStage,
  footstepIdForStage,
  randomizePlayback,
} from '../src/audio/SfxBank';
import { SfxDirector, SfxOut, SPECIAL_SFX, FallbackKind } from '../src/audio/SfxDirector';
import { AIController } from '../src/engine/AIController';
import { CombatEngine } from '../src/engine/CombatEngine';
import { uiSoundForAction } from '../src/ui/UIManager';
import { STAGES } from '../src/data/stages';
import { MatchConfig } from '../src/types/game';

const AUDIO = join(process.cwd(), 'public/assets/audio');

function files(pred: (id: string) => boolean): string[] {
  return SFX_IDS.filter(pred).flatMap((id) => SFX_MANIFEST[id].files);
}

function wavInfo(path: string): { channels: number; rate: number; seconds: number } {
  const b = readFileSync(path);
  expect(b.toString('ascii', 0, 4)).toBe('RIFF');
  expect(b.toString('ascii', 8, 12)).toBe('WAVE');
  const channels = b.readUInt16LE(22);
  const rate = b.readUInt32LE(24);
  const bits = b.readUInt16LE(34);
  const dataSize = b.readUInt32LE(40);
  return { channels, rate, seconds: dataSize / (rate * channels * (bits / 8)) };
}

describe('sfx manifest', () => {
  it('has the PLAN.md §7 set: 120 one-shots, 8 ambience loops, 7 stings', () => {
    expect(files((id) => !id.startsWith('amb_') && !id.startsWith('sting_')).length).toBe(120);
    expect(files((id) => id.startsWith('amb_')).length).toBe(8);
    expect(files((id) => id.startsWith('sting_')).length).toBe(7);
  });

  it('matches the plan category counts', () => {
    const n = (re: RegExp) => files((id) => re.test(id)).length;
    expect(n(/^hit_/)).toBe(22);
    expect(n(/^block/)).toBe(10);
    expect(n(/^whoosh_/)).toBe(12);
    expect(n(/^(step_|land|bodyfall)/)).toBe(24);
    expect(n(/^bob_/)).toBe(14);
    expect(n(/^cory_/)).toBe(15);
    expect(n(/^fx_/)).toBe(10);
    expect(n(/^ui_/)).toBe(8);
    expect(n(/^misc_/)).toBe(5);
  });

  it('every file exists, is 44.1 kHz WAV and has a sane length', () => {
    for (const id of SFX_IDS) {
      const e = SFX_MANIFEST[id];
      for (const f of e.files) {
        const p = join(AUDIO, f);
        expect(existsSync(p), p).toBe(true);
        const w = wavInfo(p);
        expect(w.rate).toBe(44100);
        if (id.startsWith('amb_') || id.startsWith('sting_') || e.loop) expect(w.channels).toBe(2);
        else expect(w.channels).toBe(1);
        expect(w.seconds).toBeGreaterThan(0.05);
        expect(w.seconds).toBeLessThanOrEqual(e.durationTarget + 0.05);
        if (e.loop) expect(Math.abs(w.seconds - e.durationTarget)).toBeLessThan(0.05);
      }
    }
  });

  it('maps every stage to ambience and a footstep surface', () => {
    for (const st of STAGES) {
      expect(ambienceIdForStage(st.id)).toMatch(/^amb_/);
      expect(ambienceIdForStage(st.id, 'day')).toMatch(/_day$/);
      expect(SFX_MANIFEST[footstepIdForStage(st.id)]).toBeTruthy();
    }
  });

  it('special-move signature sounds all exist', () => {
    for (const id of Object.values(SPECIAL_SFX)) expect(SFX_MANIFEST[id], id).toBeTruthy();
  });
});

describe('playback variation', () => {
  it('stays within ±8% pitch and ±2 dB gain', () => {
    for (const r of [0, 0.25, 0.5, 0.9999]) {
      const v = randomizePlayback(() => r);
      expect(v.rate).toBeGreaterThanOrEqual(0.92);
      expect(v.rate).toBeLessThanOrEqual(1.08);
      expect(Math.abs(v.gainDb)).toBeLessThanOrEqual(2);
    }
  });

  it('never repeats the same take twice in a row', () => {
    const p = new VariantPicker(() => 0.1);
    let prev = -1;
    for (let i = 0; i < 20; i++) {
      const k = p.pick('hit_light_a', 4);
      expect(k).not.toBe(prev);
      prev = k;
    }
  });

  it('maps UI actions to the right sample', () => {
    expect(uiSoundForAction('back-title')).toBe('back');
    expect(uiSoundForAction('p1-bob')).toBe('lockin');
    expect(uiSoundForAction('mode-arcade')).toBe('confirm');
  });
});

class FakeOut implements SfxOut {
  played: string[] = [];
  stings: string[] = [];
  fallbacks: FallbackKind[] = [];
  loops = new Set<string>();
  constructor(private ok = true) {}
  play(id: string): boolean {
    this.played.push(id);
    return this.ok;
  }
  fallback(kind: FallbackKind): void {
    this.fallbacks.push(kind);
  }
  startLoop(key: string, id: string): void {
    this.loops.add(key);
    this.played.push(id);
  }
  stopLoop(key: string): void {
    this.loops.delete(key);
  }
  sting(id: string): void {
    this.stings.push(id);
  }
}

function cpuMatch(out: SfxOut, overrides: Partial<MatchConfig> = {}): CombatEngine {
  const engine = new CombatEngine({
    mode: 'cpu-vs-cpu',
    p1Fighter: 'bob',
    p2Fighter: 'cory',
    p1Palette: 0,
    p2Palette: 0,
    stage: 'disco-penthouse',
    aiDifficulty: 'hard',
    roundTimeSeconds: 99,
    roundsToWin: 2,
    easyFatality: true,
    ...overrides,
  });
  const a = new AIController('hard');
  const b = new AIController('hard');
  const dir = new SfxDirector(out);
  for (let i = 0; i < 60 * 60 * 6 && engine.phase !== 'match_over'; i++) {
    engine.step(a.computeInput(engine, 0), b.computeInput(engine, 1));
    dir.update(engine, engine.events);
  }
  for (let i = 0; i < 5; i++) {
    engine.step(a.computeInput(engine, 0), b.computeInput(engine, 1));
    dir.update(engine, engine.events);
  }
  return engine;
}

describe('SfxDirector', () => {
  it('plays only known samples through a full CPU match, with stings at the right moments', () => {
    const out = new FakeOut();
    const engine = cpuMatch(out);
    for (const id of out.played) expect(SFX_MANIFEST[id], id).toBeTruthy();
    for (const id of out.stings) expect(SFX_MANIFEST[id], id).toBeTruthy();
    expect(out.stings[0]).toBe('sting_versus');
    expect(out.played.some((id) => id.startsWith('hit_'))).toBe(true);
    expect(out.played.some((id) => id.startsWith('whoosh_'))).toBe(true);
    expect(out.played).toContain('step_glass');
    expect(out.played).toContain('misc_round_bell');
    expect(out.fallbacks.length).toBe(0);
    if (engine.phase === 'match_over' && engine.winnerIndex !== null) {
      expect(out.stings.some((s) => s.startsWith('sting_victory_'))).toBe(true);
    }
  });

  it('falls back to procedural sounds when samples are missing', () => {
    const out = new FakeOut(false);
    cpuMatch(out, { stage: 'matrix-subway' });
    expect(out.fallbacks.length).toBeGreaterThan(0);
    expect(out.fallbacks.some((k) => k === 'hit' || k === 'hit_heavy')).toBe(true);
  });
});
