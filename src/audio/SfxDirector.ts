import type { CombatEngine, SimEvent } from '../engine/CombatEngine';
import { MAX_SUPER_METER } from '../engine/constants';
import type { FighterId, FighterState } from '../types/game';
import { footstepIdForStage, type SfxPlayOptions } from './SfxBank';

/** Procedural Web Audio sounds used when a sample is missing or not decoded yet. */
export type FallbackKind = 'hit' | 'hit_heavy' | 'block' | 'flawless' | 'parry' | 'teleport' | 'glitter' | 'splat' | 'gong';

/** What the director needs from the audio engine (keeps it unit-testable). */
export interface SfxOut {
  play(id: string, opts?: SfxPlayOptions): boolean;
  fallback(kind: FallbackKind): void;
  startLoop(key: string, id: string): void;
  stopLoop(key: string): void;
  /** Music sting; queued behind any sting already playing. */
  sting(id: string, opts?: { delayMs?: number; stopMusic?: boolean }): void;
}

/** Signature sound on special-move start (PLAN.md §7 Bob / Cory signature lists). */
export const SPECIAL_SFX: Record<string, string> = {
  palm_flurry: 'bob_palm_flurry',
  palm_flurry_ex: 'bob_palm_flurry',
  clone_grapple: 'bob_clone_summon',
  bullet_lean: 'bob_bullet_time',
  aerial_dive: 'whoosh_heavy_b',
  glitter_bomb: 'cory_glitter_throw',
  glitter_bomb_ex: 'cory_glitter_throw',
  runway_dash: 'cory_runway_whoosh',
  runway_dash_ex: 'cory_runway_whoosh',
  disco_drop: 'cory_disco_ball',
  vogue_parry: 'cory_camera_flash',
  boa_whip: 'cory_boa_whip',
  air_twirl: 'cory_feather',
};

const WALK_STEP_FRAMES = 17;
const DASH_STEP_FRAMES = 7;

const AIRBORNE: FighterState[] = ['jump', 'launch'];
const GROUNDED_AFTER_AIR: FighterState[] = ['idle', 'walk_fwd', 'walk_back', 'crouch', 'block_stand', 'block_crouch', 'attack', 'dash_fwd', 'dash_back'];

interface Snap {
  state: FighterState;
  moveId: string | null;
  stepCounter: number;
  meterFull: boolean;
}

/**
 * Turns combat-engine state and events into ElevenLabs SFX + stings, with the
 * old procedural sounds as fallback. Purely presentational.
 */
export class SfxDirector {
  private engine: CombatEngine | null = null;
  private prev: [Snap, Snap] = [this.blank(), this.blank()];
  private lastPhase = '';
  private lastTimerSec = -1;
  private versusPlayed = false;
  private fatalityStung = false;

  constructor(private out: SfxOut) {}

  private blank(): Snap {
    return { state: 'idle', moveId: null, stepCounter: 0, meterFull: false };
  }

  public attach(engine: CombatEngine): void {
    this.engine = engine;
    this.lastPhase = '';
    this.lastTimerSec = -1;
    this.versusPlayed = false;
    this.fatalityStung = false;
    this.prev = [this.blank(), this.blank()];
    engine.fighters.forEach((f, i) => {
      this.prev[i].state = f.state;
      this.prev[i].meterFull = f.superMeter >= MAX_SUPER_METER;
    });
  }

  public detach(): void {
    this.engine = null;
    this.out.stopLoop('dizzy0');
    this.out.stopLoop('dizzy1');
  }

  private pan(engine: CombatEngine, x: number | undefined): number {
    if (x === undefined) return 0;
    const mid = (engine.fighters[0].x + engine.fighters[1].x) / 2;
    return Math.max(-0.6, Math.min(0.6, (x - mid) / 700));
  }

  private playOr(id: string, kind: FallbackKind | null, opts?: SfxPlayOptions): void {
    if (!this.out.play(id, opts) && kind) this.out.fallback(kind);
  }

  /** Call once per sim step, after engine.step(). */
  public update(engine: CombatEngine, events: readonly SimEvent[]): void {
    if (engine !== this.engine) this.attach(engine);

    if (engine.phase !== this.lastPhase) {
      this.onPhase(engine, this.lastPhase, engine.phase);
      this.lastPhase = engine.phase;
    }

    // Last-10-seconds timer ticks.
    if (engine.phase === 'fighting' && engine.config.mode !== 'training') {
      const sec = Math.ceil(engine.timerFrames / 60);
      if (sec !== this.lastTimerSec && sec > 0 && sec <= 10) this.out.play('misc_timer_tick', { exact: true, gainDb: -4 });
      this.lastTimerSec = sec;
    }

    engine.fighters.forEach((f, i) => {
      const p = this.prev[i];
      const pan = this.pan(engine, f.x);
      const moveId = f.currentMove ? f.currentMove.id : null;
      if (moveId && moveId !== p.moveId) this.onMoveStart(f.id, f.currentMove!.id, f.currentMove!.category, f.currentMove!.damage ?? 0, pan);
      if (f.state !== p.state) this.onStateChange(engine, i as 0 | 1, f.id, p.state, f.state, pan);

      // Footsteps while walking or dashing on the ground.
      const walking = f.state === 'walk_fwd' || f.state === 'walk_back';
      const dashing = f.state === 'dash_fwd' || f.state === 'dash_back';
      if ((walking || dashing) && engine.phase === 'fighting') {
        const every = dashing ? DASH_STEP_FRAMES : WALK_STEP_FRAMES;
        if (p.stepCounter % every === 0) this.out.play(footstepIdForStage(engine.config.stage), { gainDb: dashing ? -6 : -9, pan });
        p.stepCounter++;
      } else {
        p.stepCounter = 0;
      }

      const full = f.superMeter >= MAX_SUPER_METER;
      if (full && !p.meterFull && engine.phase === 'fighting') this.out.play('misc_meter_full', { gainDb: -3, pan });
      p.meterFull = full;
      p.moveId = moveId;
      p.state = f.state;
    });

    for (const ev of events) this.onEvent(engine, ev);
  }

  private onPhase(engine: CombatEngine, from: string, to: string): void {
    if (to === 'intro_banter' && !this.versusPlayed) {
      this.versusPlayed = true;
      this.out.sting('sting_versus');
    }
    if (to === 'fighting' && (from === 'round_announce' || from === 'intro_banter')) {
      this.out.play('misc_round_bell', { exact: true, gainDb: -2 });
    }
    if (to === 'match_over' && engine.winnerIndex !== null) {
      const humanLost = engine.config.mode === 'arcade' && engine.winnerIndex === 1;
      if (humanLost) this.out.sting('sting_game_over', { delayMs: 700, stopMusic: true });
      else this.out.sting(`sting_victory_${engine.fighters[engine.winnerIndex].id}`, { delayMs: 700, stopMusic: true });
    }
  }

  private onMoveStart(id: FighterId, moveId: string, category: string, damage: number, pan: number): void {
    const sig = SPECIAL_SFX[moveId];
    if (sig && (category === 'special' || category === 'ex')) {
      this.out.play(sig, { pan });
      return;
    }
    if (category === 'taunt') {
      this.out.play(id === 'bob' ? 'bob_shades_click' : 'cory_feather', { pan });
      return;
    }
    if (category === 'normal' || category === 'string' || category === 'throw' || category === 'wakeup' || category === 'special' || category === 'ex') {
      const heavy = damage >= 70 || category === 'throw';
      const base = heavy ? 'whoosh_heavy' : 'whoosh_light';
      this.out.play(`${base}_${Math.random() < 0.65 ? 'a' : 'b'}`, { pan, gainDb: -3 });
    }
  }

  private onStateChange(engine: CombatEngine, idx: 0 | 1, id: FighterId, from: FighterState, to: FighterState, pan: number): void {
    if (to === 'jump') this.out.play('whoosh_light_b', { pan, gainDb: -8 });
    if (AIRBORNE.includes(from) && GROUNDED_AFTER_AIR.includes(to)) this.out.play('land', { pan, gainDb: -3 });
    if (to === 'knockdown') this.out.play('bodyfall', { pan });
    if (to === 'dizzy') this.out.startLoop(`dizzy${idx}`, 'misc_dizzy');
    if (from === 'dizzy' && to !== 'dizzy') this.out.stopLoop(`dizzy${idx}`);
    void engine;
    void id;
  }

  private onEvent(engine: CombatEngine, ev: SimEvent): void {
    const pan = this.pan(engine, ev.x);
    const idx = ev.playerIndex;
    const attacker = idx !== undefined ? engine.fighters[idx] : undefined;
    switch (ev.type) {
      case 'hit': {
        const cat = attacker?.currentMove?.category;
        if (cat === 'special' || cat === 'ex' || cat === 'fatal_blow') {
          const id = attacker?.id === 'bob' ? 'hit_special_glitch' : 'hit_heavy_b';
          this.playOr(id, 'hit_heavy', { pan });
          if (attacker?.id === 'cory') this.out.play('cory_glitter_burst', { pan, gainDb: -6 });
        } else if (ev.heavy) {
          this.playOr(Math.random() < 0.5 ? 'hit_heavy_a' : 'hit_heavy_b', 'hit_heavy', { pan });
        } else {
          this.playOr(Math.random() < 0.5 ? 'hit_light_a' : 'hit_light_b', 'hit', { pan });
        }
        break;
      }
      case 'block':
        this.playOr('block', 'block', { pan });
        break;
      case 'flawless_block':
      case 'up_block':
        this.playOr('block_flawless', 'flawless', { pan });
        break;
      case 'parry':
        this.playOr('block_parry', 'parry', { pan });
        break;
      case 'throw':
        this.playOr('hit_heavy_a', 'hit_heavy', { pan });
        this.out.play('bodyfall', { pan, delayMs: 320 });
        break;
      case 'throw_tech':
        this.playOr('block_parry', 'parry', { pan });
        break;
      case 'teleport':
        this.playOr('bob_teleport', 'teleport', { pan });
        break;
      case 'projectile_spawn':
        if (ev.fighterId === 'cory') this.playOr('cory_glitter_burst', 'glitter', { pan, gainDb: -4 });
        else this.playOr('bob_eggplant_spawn', 'teleport', { pan });
        break;
      case 'combo_breaker':
        this.playOr('misc_combo_breaker', 'parry', { pan });
        break;
      case 'wall_bounce':
        this.out.play('hit_heavy_b', { pan, gainDb: -2 });
        break;
      case 'taunt':
        if (ev.fighterId === 'bob' && Math.random() < 0.5) this.out.play('bob_earpiece', { pan, delayMs: 250 });
        if (ev.fighterId === 'cory') this.out.play('cory_camera_flash', { pan, delayMs: 200 });
        break;
      case 'fatal_blow_start':
        this.out.play('fx_slowmo_hit', { exact: true });
        if (ev.fighterId === 'bob') {
          this.out.play('bob_bullet_time', { delayMs: 500, gainDb: -3 });
          this.out.play('fx_orbital_descent', { delayMs: 1300, exact: true });
        } else {
          this.out.play('cory_camera_flash', { delayMs: 400 });
          this.out.play('cory_camera_flash', { delayMs: 900 });
          this.out.play('cory_disco_ball', { delayMs: 2300 });
        }
        this.out.play('fx_giant_slam', { delayMs: 3000, exact: true });
        this.out.play('fx_crowd_gasp', { delayMs: 3400, gainDb: -4 });
        break;
      case 'fatality_start':
        this.fatalityStung = true;
        if (ev.fighterId) this.out.sting(`sting_fatality_${ev.fighterId}`, { stopMusic: true });
        this.out.play('fx_crowd_gasp', { delayMs: 600, gainDb: -3 });
        if (ev.fighterId === 'bob') {
          this.out.play('bob_clone_summon', { delayMs: 900 });
          this.out.play('fx_orbital_descent', { delayMs: 1600, exact: true });
        } else {
          this.out.play('cory_runway_whoosh', { delayMs: 900 });
          this.out.play('fx_confetti_cannon', { delayMs: 1800, exact: true });
          this.out.play('cory_disco_ball', { delayMs: 3000 });
        }
        if (!this.out.play('fx_giant_slam', { delayMs: 3600, exact: true })) this.out.fallback('splat');
        this.out.play('fx_crowd_cheer', { delayMs: 5000, gainDb: -2 });
        break;
      case 'brutality_start':
        this.playOr('hit_special_eggplant', 'splat', { pan });
        this.out.play('fx_confetti_cannon', { delayMs: 500 });
        this.out.play('fx_crowd_cheer', { delayMs: 1400, gainDb: -3 });
        break;
      case 'round_win':
        this.out.play('fx_crowd_cheer', { delayMs: 300, gainDb: -5 });
        break;
      default:
        break;
    }
  }

  /** Whether a Fatality sting already fired this match (for tests / debugging). */
  public get playedFatalitySting(): boolean {
    return this.fatalityStung;
  }
}
