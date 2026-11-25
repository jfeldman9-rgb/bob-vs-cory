import type { Fighter } from '../engine/Fighter';
import type { FighterId } from '../types/game';
import bobFrames from '../../public/assets/fighters/bob/frames.json';
import attackFrames from '../data/attack-frames.json';

/** Metadata written by tools/process-art.py for each processed v2 frame. */
export interface FrameMeta {
  file: string;
  w: number;
  h: number;
  pivotX: number;
  baselineY: number;
  figureH: number;
  standH: number;
}

/**
 * v2 painted frame sets. A fighter missing here (or a frame missing from its set) falls back
 * to the v1 single-pose sprites. Cory stays on v1 until his frames are painted.
 */
export const FRAME_SETS: Partial<Record<FighterId, Record<string, FrameMeta>>> = {
  bob: bobFrames as Record<string, FrameMeta>,
};

/** Per-move v2 attack frames: `startup` during startup frames, `active` during active + recovery. */
export const ATTACK_FRAMES: Partial<Record<FighterId, Record<string, { startup: string; active: string }>>> = {
  bob: (attackFrames as unknown as Record<string, Record<string, { startup: string; active: string }>>).bob,
};

export function frameUrl(id: FighterId, meta: FrameMeta): string {
  return `./assets/fighters/${id}/${meta.file}`;
}

/** World-space height of a standing fighter, matched to v1 (532 px figure x 0.52 scale). */
export const STAND_WORLD_H = 532 * 0.52;

const IDLE_CYCLE = ['idle_01', 'idle_02', 'idle_03', 'idle_02'];
const WALK_CYCLE = ['walk_02', 'walk_03', 'walk_04', 'walk_03'];

function cycle(frames: string[], tick: number, ticksPerFrame: number, set: Record<string, FrameMeta>): string | null {
  const avail = frames.filter((f) => set[f]);
  if (avail.length === 0) return null;
  return avail[Math.floor(tick / ticksPerFrame) % avail.length];
}

/**
 * Picks the v2 frame for a fighter's current state, or null to use the v1 pose sprite.
 * Pure function of fighter state + render tick, so it never affects the simulation.
 */
export function pickFrame(
  f: Pick<Fighter, 'id' | 'state' | 'vy'> & Partial<Pick<Fighter, 'currentMove' | 'moveFrame'>>,
  tick: number
): string | null {
  const set = FRAME_SETS[f.id];
  if (!set) return null;
  const has = (n: string) => (set[n] ? n : null);
  switch (f.state) {
    case 'idle':
      return cycle(IDLE_CYCLE, tick, 10, set);
    case 'walk_fwd':
      return cycle(WALK_CYCLE, tick, 7, set);
    case 'walk_back':
      return has('walk_back') ?? cycle(WALK_CYCLE, tick, 7, set);
    case 'dash_fwd':
      return has('dash');
    case 'dash_back':
      return has('walk_back');
    case 'jump':
      if (f.vy < -8) return has('jump_takeoff');
      if (f.vy > 6) return has('jump_fall');
      return has('jump_apex');
    case 'crouch':
      return has('crouch');
    case 'block_crouch':
      return has('crouch_block'); // rejected in batch 1 -> v1 block fallback
    case 'attack': {
      const move = f.currentMove;
      const map = move ? ATTACK_FRAMES[f.id]?.[move.id] : undefined;
      if (!move || !map) return null;
      const inStartup = (f.moveFrame ?? 0) < move.startup;
      const first = inStartup ? map.startup : map.active;
      const second = inStartup ? map.active : map.startup;
      return has(first) ?? has(second);
    }
    case 'block_stand':
    case 'up_block':
    case 'flawless_block':
      return has('block');
    default:
      return null;
  }
}
