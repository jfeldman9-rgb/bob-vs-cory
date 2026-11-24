export const TICK_RATE = 60;
export const FIXED_DT = 1 / TICK_RATE;

// Logical stage coordinate space (16:9 widescreen base 1280x720)
export const VIEW_WIDTH = 1280;
export const VIEW_HEIGHT = 720;

export const STAGE_LEFT = 120;
export const STAGE_RIGHT = 1880;
export const STAGE_WIDTH = STAGE_RIGHT - STAGE_LEFT;
export const GROUND_Y = 615;

export const GRAVITY = 1.18;
export const MAX_FALL_SPEED = 24;

// Fighter collision dimensions
export const FIGHTER_PUSH_W = 84;
export const FIGHTER_PUSH_H = 210;
export const FIGHTER_HURT_STAND_W = 104;
export const FIGHTER_HURT_STAND_H = 225;
export const FIGHTER_HURT_CROUCH_W = 112;
export const FIGHTER_HURT_CROUCH_H = 148;

// Combat mechanics
export const INPUT_BUFFER_FRAMES = 8;
export const FLAWLESS_BLOCK_WINDOW = 3;
export const UP_BLOCK_WINDOW = 10;
export const THROW_TECH_WINDOW = 10;
export const THROW_RANGE = 118;

export const MAX_SUPER_METER = 300; // 3 segments of 100
export const METER_SEGMENT = 100;
export const FATAL_BLOW_HP_RATIO = 0.3;

export const FINISH_HIM_DURATION_FRAMES = 6 * TICK_RATE; // 6 seconds
export const ROUND_ANNOUNCE_FRAMES = 95;
export const INTRO_BANTER_FRAMES = 230;
export const ROUND_OVER_FRAMES = 110;

// Combo scaling: damage multiplier per hit index (0-based)
export const COMBO_DAMAGE_SCALING = [
  1.0, 0.9, 0.8, 0.72, 0.64, 0.56, 0.48, 0.42, 0.36, 0.3,
];

export function getComboScaling(hitIndex: number): number {
  if (hitIndex < 0) return 1.0;
  if (hitIndex >= COMBO_DAMAGE_SCALING.length) {
    return COMBO_DAMAGE_SCALING[COMBO_DAMAGE_SCALING.length - 1];
  }
  return COMBO_DAMAGE_SCALING[hitIndex];
}

// Gravity multiplier increases during juggles to prevent infinites
export function getJuggleGravityMultiplier(juggleHits: number): number {
  return 1 + Math.min(juggleHits * 0.14, 1.1);
}
