import type { CombatEngine, SimEvent } from '../engine/CombatEngine';
import type { FighterId, FighterState } from '../types/game';
import { Shuffler, findLineByText, idsWithPrefix } from './VoiceBank';

/** Minimal surface of VoiceBank the director needs (keeps it unit-testable). */
export interface VoicePlayer {
  play(id: string, opts?: { cooldownMs?: number; delayMs?: number; interrupt?: boolean; gain?: number }): boolean;
  preload?(ids: string[]): void;
}

const SPECIAL_LINES: Record<string, string> = {
  palm_flurry: 'bob_sp_palm_flurry',
  palm_flurry_ex: 'bob_sp_palm_flurry_ex',
  glitch_teleport: 'bob_sp_teleport',
  glitch_teleport_ex: 'bob_sp_teleport',
  eggplant_toss: 'bob_sp_eggplant',
  eggplant_toss_ex: 'bob_sp_eggplant_ex',
  clone_grapple: 'bob_sp_clone',
  bullet_lean: 'bob_sp_lean',
  aerial_dive: 'bob_sp_dive',
  glitter_bomb: 'cory_sp_glitter',
  glitter_bomb_ex: 'cory_sp_glitter_ex',
  runway_dash: 'cory_sp_runway',
  runway_dash_ex: 'cory_sp_runway_ex',
  disco_drop: 'cory_sp_disco_drop',
  vogue_parry: 'cory_sp_vogue',
  boa_whip: 'cory_sp_boa',
  air_twirl: 'cory_sp_twirl',
};

interface FighterSnapshot {
  moveId: string | null;
  state: FighterState;
}

/**
 * Turns combat-engine state changes and events into voiced lines:
 * intro banter, grunts, pain, specials, taunts, Fatal Blows, Fatalities,
 * round/match wins. Purely presentational: never touches simulation state.
 */
export class VoiceDirector {
  private engine: CombatEngine | null = null;
  private prev: [FighterSnapshot, FighterSnapshot] = [
    { moveId: null, state: 'idle' },
    { moveId: null, state: 'idle' },
  ];
  private banterPlayed = [false, false];
  private lastPhase = '';
  private shuffle: Shuffler;

  constructor(private voices: VoicePlayer, private rng: () => number = Math.random) {
    this.shuffle = new Shuffler(rng);
  }

  /** Call when a new CombatEngine is created. */
  public attach(engine: CombatEngine): void {
    this.engine = engine;
    this.banterPlayed = [false, false];
    this.lastPhase = '';
    this.prev = [
      { moveId: null, state: engine.fighters[0].state },
      { moveId: null, state: engine.fighters[1].state },
    ];
    const ids = new Set<FighterId>([engine.fighters[0].id, engine.fighters[1].id]);
    const pre: string[] = [];
    for (const id of ids) {
      pre.push(...idsWithPrefix(`${id}_grunt_`), ...idsWithPrefix(`${id}_pain_`), ...idsWithPrefix(`${id}_sp_`));
    }
    pre.push('ann_round_1', 'ann_fight', 'ann_final_round', 'ann_finish_him', 'ann_fatality', 'ann_bob_wins', 'ann_cory_wins');
    this.voices.preload?.(pre);
  }

  public detach(): void {
    this.engine = null;
  }

  private pick(prefix: string): string | null {
    return this.shuffle.pick(idsWithPrefix(prefix), prefix);
  }

  private playPick(prefix: string, opts?: Parameters<VoicePlayer['play']>[1]): void {
    const id = this.pick(prefix);
    if (id) this.voices.play(id, opts);
  }

  /** Per-render-frame update; call after engine.step() and before events are cleared. */
  public update(engine: CombatEngine, events: readonly SimEvent[]): void {
    if (engine !== this.engine) this.attach(engine);

    // Intro banter, voiced in sync with the on-screen banter box (line 2 at phaseFrame 115).
    if (engine.phase === 'intro_banter') {
      const lines = engine.activeBanter.lines;
      if (!this.banterPlayed[0]) {
        this.banterPlayed[0] = true;
        const l = findLineByText(lines[0].speaker, lines[0].text);
        if (l) this.voices.play(l.id);
      }
      if (!this.banterPlayed[1] && engine.phaseFrame >= 115) {
        this.banterPlayed[1] = true;
        const l = findLineByText(lines[1].speaker, lines[1].text);
        if (l) this.voices.play(l.id);
      }
    }

    if (engine.phase !== this.lastPhase) {
      if (engine.phase === 'finish_him' && engine.winnerIndex === null) {
        // The fighter still standing gets a menacing line after the announcer call.
        const standing = engine.fighters[0].health > engine.fighters[1].health ? 0 : 1;
        this.voices.play(`${engine.fighters[standing].id}_finish_line`, { delayMs: 1300 });
      }
      this.lastPhase = engine.phase;
    }

    // State-transition grunts (move starts, jumps, knockdowns, dizzy).
    engine.fighters.forEach((f, i) => {
      const prev = this.prev[i];
      const moveId = f.currentMove ? f.currentMove.id : null;
      if (moveId && moveId !== prev.moveId) this.onMoveStart(f.id, f.currentMove!.id, f.currentMove!.category, f.currentMove!.damage ?? 0);
      if (f.state !== prev.state) this.onStateChange(f.id, prev.state, f.state);
      prev.moveId = moveId;
      prev.state = f.state;
    });

    for (const ev of events) this.onEvent(engine, ev);
  }

  private onMoveStart(id: FighterId, moveId: string, category: string, damage: number): void {
    const special = SPECIAL_LINES[moveId];
    if (special && (category === 'special' || category === 'ex')) {
      this.voices.play(special);
      return;
    }
    if (moveId === 'wakeup_kick') {
      this.voices.play(`${id}_wakeup`);
      return;
    }
    if (category === 'throw') {
      this.voices.play(`${id}_grunt_throw`, { cooldownMs: 300 });
      return;
    }
    if (category === 'normal' || category === 'string') {
      // Not every swing grunts — keeps it from turning into a wall of noise.
      if (this.rng() < 0.55) {
        const heavy = damage >= 70;
        this.playPick(`${id}_grunt_${heavy ? 'heavy' : 'light'}`, { cooldownMs: 450, interrupt: false });
      }
    }
  }

  private onStateChange(id: FighterId, from: FighterState, to: FighterState): void {
    switch (to) {
      case 'jump':
        if (this.rng() < 0.4) this.voices.play(`${id}_grunt_jump`, { cooldownMs: 600, interrupt: false });
        break;
      case 'launch':
        this.voices.play(`${id}_launch`, { cooldownMs: 400 });
        break;
      case 'knockdown':
        if (from !== 'launch') this.voices.play(`${id}_knockdown`, { cooldownMs: 400 });
        break;
      case 'dizzy':
        this.voices.play(`${id}_dizzy`);
        break;
      default:
        break;
    }
  }

  private onEvent(engine: CombatEngine, ev: SimEvent): void {
    const idx = ev.playerIndex;
    const fighter = idx !== undefined ? engine.fighters[idx] : undefined;
    const other = idx !== undefined ? engine.fighters[1 - idx] : undefined;
    switch (ev.type) {
      case 'hit':
        // playerIndex is the attacker; the defender voices the pain.
        if (other && other.health > 0) {
          this.playPick(`${other.id}_pain_${ev.heavy ? 'heavy' : 'light'}`, { cooldownMs: ev.heavy ? 250 : 550, interrupt: false });
        }
        break;
      case 'block':
        if (other && this.rng() < 0.3) this.voices.play(`${other.id}_block`, { cooldownMs: 1200, interrupt: false });
        break;
      case 'taunt':
        if (ev.fighterId) this.playPick(`${ev.fighterId}_taunt_`);
        break;
      case 'combo_breaker':
        if (fighter) this.voices.play(`${fighter.id}_combo_breaker`);
        this.voices.play('ann_combo_breaker', { delayMs: 150 });
        break;
      case 'flawless_block':
        this.voices.play('ann_flawless_block', { cooldownMs: 3000 });
        break;
      case 'parry':
        this.voices.play('ann_counter', { cooldownMs: 2000 });
        break;
      case 'fatal_blow_start':
        if (ev.fighterId) {
          this.voices.play('ann_fatal_blow');
          this.voices.play(`${ev.fighterId}_fb_1`, { delayMs: 200 });
          this.voices.play(`${ev.fighterId}_fb_2`, { delayMs: 1500 });
          this.voices.play(`${ev.fighterId}_fb_3`, { delayMs: 2700 });
          this.voices.play(ev.fighterId === 'bob' ? 'ann_system_purge' : 'ann_showstopper', { delayMs: 3800 });
        }
        break;
      case 'fatality_start':
        if (ev.fighterId) {
          this.voices.play(`${ev.fighterId}_fatality_1`, { delayMs: 300 });
          this.voices.play(`${ev.fighterId}_fatality_2`, { delayMs: 1900 });
          this.voices.play(`${ev.fighterId}_fatality_3`, { delayMs: 3700 });
        }
        break;
      case 'brutality_start':
        if (ev.fighterId) {
          this.voices.play(`${ev.fighterId}_brutality`, { delayMs: 300 });
          this.voices.play(ev.fighterId === 'bob' ? 'ann_parmesan_override' : 'ann_eggplant_splat', { delayMs: 1500 });
        }
        break;
      case 'round_win':
        if (ev.fighterId && fighter) {
          const flawless = fighter.health >= fighter.maxHealth;
          if (flawless) this.voices.play('ann_flawless', { delayMs: 1700 });
          this.voices.play(`${ev.fighterId}_round_win`, { delayMs: flawless ? 3300 : 2000 });
          if (other && this.rng() < 0.5) this.playPick(`${other.id}_lose_`, { delayMs: flawless ? 4600 : 3300 });
        }
        break;
      case 'match_win':
        if (fighter && fighter.health >= fighter.maxHealth) this.voices.play('ann_flawless', { delayMs: 1700 });
        break;
      default:
        break;
    }
  }

  /** Called by the UI with the exact victory quote shown on the result card. */
  public speakVictoryQuote(fighter: FighterId, quote: string): void {
    const l = findLineByText(fighter, quote);
    if (l) this.voices.play(l.id, { delayMs: 2200 });
  }
}
