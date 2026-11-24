import { AttackHeight, Box, MoveHitbox } from '../types/game';
import {
  FIGHTER_HURT_CROUCH_H,
  FIGHTER_HURT_CROUCH_W,
  FIGHTER_HURT_STAND_H,
  FIGHTER_HURT_STAND_W,
  FIGHTER_PUSH_H,
  FIGHTER_PUSH_W,
} from './constants';

export function boxesOverlap(a: Box, b: Box): boolean {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

export function getPushbox(x: number, y: number): Box {
  return {
    x: x - FIGHTER_PUSH_W / 2,
    y: y - FIGHTER_PUSH_H,
    w: FIGHTER_PUSH_W,
    h: FIGHTER_PUSH_H,
  };
}

export function getHurtbox(x: number, y: number, crouching: boolean): Box {
  const w = crouching ? FIGHTER_HURT_CROUCH_W : FIGHTER_HURT_STAND_W;
  const h = crouching ? FIGHTER_HURT_CROUCH_H : FIGHTER_HURT_STAND_H;
  return {
    x: x - w / 2,
    y: y - h,
    w,
    h,
  };
}

export function getWorldHitbox(
  x: number,
  y: number,
  facing: 1 | -1,
  hb: MoveHitbox
): Box {
  const worldX = facing === 1 ? x + hb.ox : x - hb.ox - hb.w;
  return {
    x: worldX,
    y: y + hb.oy,
    w: hb.w,
    h: hb.h,
  };
}

export type BlockOutcome =
  | 'hit'
  | 'whiff_high_crouch'
  | 'blocked'
  | 'flawless_block'
  | 'up_block';

/**
 * Evaluates how a defender handles an incoming strike of `height`.
 * - High attacks whiff against neutral/attacking crouching opponents (MK classic rule!), unless they are blocking.
 * - Low attacks beat standing block and up-block; must be crouch-blocked.
 * - Overhead attacks beat crouching block; must be stand-blocked or up-blocked (up-block grants big punish!).
 * - Mid attacks are blocked by both standing and crouching block.
 * - Unblockable attacks (throws / traps) cannot be blocked.
 */
export function evaluateDefense(params: {
  height: AttackHeight;
  defenderCrouching: boolean;
  defenderBlocking: boolean;
  defenderUpBlocking: boolean;
  defenderFlawlessWindow: boolean;
}): BlockOutcome {
  const {
    height,
    defenderCrouching,
    defenderBlocking,
    defenderUpBlocking,
    defenderFlawlessWindow,
  } = params;

  if (height === 'unblockable') {
    return 'hit';
  }

  // High attacks whiff over a non-blocking crouching opponent
  if (height === 'high' && defenderCrouching && !defenderBlocking) {
    return 'whiff_high_crouch';
  }

  if (defenderUpBlocking && height === 'overhead') {
    return 'up_block';
  }

  if (!defenderBlocking) {
    return 'hit';
  }

  if (height === 'low' && !defenderCrouching) {
    return 'hit';
  }

  if (height === 'overhead' && defenderCrouching) {
    return 'hit';
  }

  if (defenderFlawlessWindow) {
    return 'flawless_block';
  }

  return 'blocked';
}
