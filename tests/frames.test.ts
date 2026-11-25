import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { FRAME_SETS, pickFrame } from '../src/render/FrameSets';

describe('v2 frame sets', () => {
  const bob = FRAME_SETS.bob!;
  it('every frame in frames.json exists on disk with sane metadata', () => {
    for (const [name, m] of Object.entries(bob)) {
      expect(existsSync(join(process.cwd(), 'public/assets/fighters/bob', m.file)), name).toBe(true);
      expect(m.pivotX).toBeGreaterThan(0);
      expect(m.pivotX).toBeLessThan(m.w);
      expect(m.baselineY / m.h).toBeCloseTo(0.96, 2);
      expect(m.figureH).toBeLessThanOrEqual(m.baselineY);
    }
  });
  it('picks v2 frames for core states and falls back for the rest', () => {
    const f = (state: string, vy = 0) => pickFrame({ id: 'bob', state: state as never, vy }, 0);
    expect(f('idle')).toMatch(/^idle_0[1-3]$/);
    expect(f('walk_fwd')).toMatch(/^walk_0[2-4]$/);
    expect(f('jump', -20)).toBe('jump_takeoff');
    expect(f('jump', 0)).toBe('jump_apex');
    expect(f('jump', 12)).toBe('jump_fall');
    expect(f('crouch')).toBe('crouch');
    expect(f('block_stand')).toBe('block');
    expect(f('block_crouch')).toBeNull(); // crouch_block rejected -> v1
    expect(f('attack')).toBeNull();
    const mv = (id: string, startup = 8) => ({ id, startup }) as never;
    const atk = (id: string, moveFrame: number) =>
      pickFrame({ id: 'bob', state: 'attack', vy: 0, currentMove: mv(id), moveFrame }, 0);
    expect(atk('n_1', 2)).toBe('fp_02'); // fp_01 rejected -> falls back to the extended jab
    expect(atk('n_2', 2)).toBe('bp_01');
    expect(atk('n_2', 9)).toBe('bp_02');
    expect(atk('n_3', 1)).toBe('fk_01');
    expect(atk('n_4', 12)).toBe('bk_02');
    expect(atk('d_4', 3)).toBe('sweep');
    expect(atk('palm_flurry', 3)).toBeNull(); // specials stay on v1
    expect(atk('s_b23', 3)).toBeNull();
    expect(pickFrame({ id: 'cory', state: 'idle', vy: 0 }, 0)).toBeNull();
  });
  it('every attack-frame mapping points at real moves', async () => {
    const { ATTACK_FRAMES } = await import('../src/render/FrameSets');
    const fighters = (await import('../src/data/fighters.json')).default as unknown as Record<string, { moves: Record<string, unknown> }>;
    for (const id of Object.keys(ATTACK_FRAMES.bob!)) expect(fighters.bob.moves[id], id).toBeTruthy();
  });
  it('idle cycle breathes through all three frames', () => {
    const seen = new Set<string>();
    for (let t = 0; t < 60; t++) seen.add(pickFrame({ id: 'bob', state: 'idle', vy: 0 }, t)!);
    expect(seen).toEqual(new Set(['idle_01', 'idle_02', 'idle_03']));
  });
});
