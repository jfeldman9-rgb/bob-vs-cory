import { describe, expect, it } from 'vitest';
import { CombatEngine } from '../src/engine/CombatEngine';
import { emptyInput } from '../src/engine/InputBuffer';
import { getComboScaling } from '../src/engine/constants';
import { MatchConfig } from '../src/types/game';

function makeEngine(overrides: Partial<MatchConfig> = {}): CombatEngine {
  const cfg: MatchConfig = {
    mode: 'vs-p2',
    p1Fighter: 'bob',
    p2Fighter: 'cory',
    p1Palette: 0,
    p2Palette: 0,
    stage: 'matrix-subway',
    aiDifficulty: 'normal',
    roundTimeSeconds: 99,
    roundsToWin: 2,
    easyFatality: true,
    ...overrides,
  };
  const eng = new CombatEngine(cfg);
  // Skip straight into fighting phase for deterministic tests
  eng.phase = 'fighting';
  eng.phaseFrame = 0;
  return eng;
}

describe('CombatEngine 60Hz Simulation', () => {
  it('registers melee hits, applies damage, and prevents pushbox overlap', () => {
    const eng = makeEngine();
    eng.fighters[0].x = 900;
    eng.fighters[1].x = 995;

    const p1Atk = { ...emptyInput(), p1: true };
    eng.step(p1Atk, emptyInput());
    for (let i = 0; i < 15; i++) {
      eng.step(emptyInput(), emptyInput());
    }

    expect(eng.fighters[1].health).toBeLessThan(eng.fighters[1].maxHealth);
    expect(eng.firstHitAwarded).toBe(true);
    expect(Math.abs(eng.fighters[0].x - eng.fighters[1].x)).toBeGreaterThanOrEqual(80);
  });

  it('scales combo damage monotonically downward on subsequent hits', () => {
    expect(getComboScaling(0)).toBe(1.0);
    expect(getComboScaling(1)).toBeLessThan(1.0);
    expect(getComboScaling(5)).toBeLessThan(getComboScaling(2));
  });

  it('validates Fatality range and triggers FINISH HIM! on deciding round without ever saying K.O.', () => {
    const eng = makeEngine({ roundsToWin: 1 });
    eng.fighters[0].x = 900;
    eng.fighters[1].x = 1000;
    eng.fighters[1].health = 20;

    eng.step({ ...emptyInput(), p2: true }, emptyInput());
    for (let i = 0; i < 20; i++) {
      eng.step(emptyInput(), emptyInput());
    }

    expect(eng.phase).toBe('finish_him');
    expect(eng.announcer?.text).toBe('FINISH HIM!');
    expect(eng.announcer?.text).not.toMatch(/K\.?O\.?/i);

    // Move to mid range (250px) and verify Fatality distance validator
    eng.fighters[0].x = 800;
    eng.fighters[1].x = 1050;
    expect(eng.isFatalityRangeValid(eng.fighters[0], eng.fighters[1])).toBe(true);
  });

  it('awards timeout victory to fighter with higher remaining health %', () => {
    const eng = makeEngine({ roundsToWin: 2 });
    eng.fighters[0].health = 800;
    eng.fighters[1].health = 400;
    eng.timerFrames = 1;
    eng.step(emptyInput(), emptyInput());
    expect(eng.roundWins[0]).toBe(1);
    expect(eng.announcer?.text).not.toMatch(/K\.?O\.?/i);
  });
});
