import { describe, expect, it } from 'vitest';
import {
  boxesOverlap,
  evaluateDefense,
  getHurtbox,
  getWorldHitbox,
} from '../src/engine/HitboxSystem';

describe('HitboxSystem & Defense Evaluation', () => {
  it('detects AABB overlap accurately', () => {
    expect(boxesOverlap({ x: 0, y: 0, w: 50, h: 50 }, { x: 40, y: 40, w: 50, h: 50 })).toBe(true);
    expect(boxesOverlap({ x: 0, y: 0, w: 50, h: 50 }, { x: 60, y: 0, w: 50, h: 50 })).toBe(false);
  });

  it('flips world hitbox correctly based on fighter facing', () => {
    const hbRight = getWorldHitbox(500, 600, 1, { ox: 60, oy: -150, w: 90, h: 40 });
    const hbLeft = getWorldHitbox(500, 600, -1, { ox: 60, oy: -150, w: 90, h: 40 });
    expect(hbRight.x).toBe(560);
    expect(hbLeft.x).toBe(350);
    expect(hbRight.y).toBe(hbLeft.y);
  });

  it('shrinks hurtbox height when crouching', () => {
    const stand = getHurtbox(500, 600, false);
    const crouch = getHurtbox(500, 600, true);
    expect(crouch.h).toBeLessThan(stand.h);
  });

  it('enforces MK attack height rules (High, Mid, Low, Overhead, Unblockable)', () => {
    // High whiffs over non-blocking crouch
    expect(
      evaluateDefense({
        height: 'high',
        defenderCrouching: true,
        defenderBlocking: false,
        defenderUpBlocking: false,
        defenderFlawlessWindow: false,
      })
    ).toBe('whiff_high_crouch');

    // Low beats standing block, blocked by crouching block
    expect(
      evaluateDefense({
        height: 'low',
        defenderCrouching: false,
        defenderBlocking: true,
        defenderUpBlocking: false,
        defenderFlawlessWindow: false,
      })
    ).toBe('hit');
    expect(
      evaluateDefense({
        height: 'low',
        defenderCrouching: true,
        defenderBlocking: true,
        defenderUpBlocking: false,
        defenderFlawlessWindow: false,
      })
    ).toBe('blocked');

    // Overhead beats crouch block, countered by Up-Block
    expect(
      evaluateDefense({
        height: 'overhead',
        defenderCrouching: true,
        defenderBlocking: true,
        defenderUpBlocking: false,
        defenderFlawlessWindow: false,
      })
    ).toBe('hit');
    expect(
      evaluateDefense({
        height: 'overhead',
        defenderCrouching: false,
        defenderBlocking: true,
        defenderUpBlocking: true,
        defenderFlawlessWindow: false,
      })
    ).toBe('up_block');

    // Flawless block triggers within 3-frame window
    expect(
      evaluateDefense({
        height: 'mid',
        defenderCrouching: false,
        defenderBlocking: true,
        defenderUpBlocking: false,
        defenderFlawlessWindow: true,
      })
    ).toBe('flawless_block');

    // Unblockable beats all blocks
    expect(
      evaluateDefense({
        height: 'unblockable',
        defenderCrouching: false,
        defenderBlocking: true,
        defenderUpBlocking: true,
        defenderFlawlessWindow: true,
      })
    ).toBe('hit');
  });
});
