import { BANTER_EXCHANGES, BanterExchange, MIRROR_BANTER } from '../data/banter';
import {
  AnnouncerEvent,
  CalloutEvent,
  CinematicState,
  FighterId,
  InputState,
  MatchConfig,
  MoveData,
  Projectile,
  RoundPhase,
  TrainingConfig,
} from '../types/game';
import {
  FINISH_HIM_DURATION_FRAMES,
  GROUND_Y,
  INTRO_BANTER_FRAMES,
  MAX_SUPER_METER,
  ROUND_ANNOUNCE_FRAMES,
  ROUND_OVER_FRAMES,
  STAGE_LEFT,
  STAGE_RIGHT,
  THROW_RANGE,
  TICK_RATE,
  getComboScaling,
} from './constants';
import { Fighter } from './Fighter';
import { boxesOverlap, evaluateDefense } from './HitboxSystem';

export interface SimEvent {
  type:
    | 'hit'
    | 'block'
    | 'flawless_block'
    | 'up_block'
    | 'parry'
    | 'throw'
    | 'throw_tech'
    | 'teleport'
    | 'projectile_spawn'
    | 'combo_breaker'
    | 'fatal_blow_start'
    | 'fatality_start'
    | 'brutality_start'
    | 'announcer'
    | 'wall_bounce'
    | 'taunt'
    | 'round_win'
    | 'match_win';
  x?: number;
  y?: number;
  playerIndex?: 0 | 1;
  fighterId?: FighterId;
  heavy?: boolean;
  text?: string;
  color?: string;
}

export class CombatEngine {
  public readonly config: MatchConfig;
  public readonly fighters: [Fighter, Fighter];
  public projectiles: Projectile[] = [];
  public training: TrainingConfig = {
    showHitboxes: false,
    showInputHistory: true,
    showFrameData: true,
    autoRegenHealth: true,
    autoRegenMeter: true,
    dummyBlock: 'none',
  };

  // Match & Round state
  public frame: number = 0;
  public roundNumber: number = 1;
  public roundWins: [number, number] = [0, 0];
  public phase: RoundPhase = 'intro_banter';
  public phaseFrame: number = 0;
  public timerFrames: number;
  public winnerIndex: 0 | 1 | null = null;
  public firstHitAwarded: boolean = false;
  public activeBanter: BanterExchange;

  // Hitstop, Slow-mo, Screen-shake
  public hitstopFrames: number = 0;
  public slowMoFrames: number = 0;
  public shakeIntensity: number = 0;
  public chromaticFrames: number = 0;

  // Combos & HUD Callouts
  public comboCounts: [number, number] = [0, 0];
  public comboDamage: [number, number] = [0, 0];
  public callouts: CalloutEvent[] = [];
  public announcer: AnnouncerEvent | null = null;
  public cinematic: CinematicState = {
    type: 'none',
    performerIndex: 0,
    fighterId: 'bob',
    frame: 0,
    duration: 0,
    beat: 0,
    cameraZoom: 1,
    cameraTargetX: 1000,
    cameraTargetY: 460,
    dimAmount: 0,
  };

  // Events emitted during current tick for Audio & VFX layers
  public events: SimEvent[] = [];
  private nextId = 1;

  constructor(config: MatchConfig) {
    this.config = { ...config };
    this.fighters = [
      new Fighter(0, config.p1Fighter, config.p1Palette),
      new Fighter(1, config.p2Fighter, config.p2Palette),
    ];
    this.timerFrames = config.roundTimeSeconds * TICK_RATE;
    this.activeBanter = this.pickBanter();

    if (config.mode === 'training') {
      this.phase = 'fighting';
      this.phaseFrame = 0;
      this.fighters[0].superMeter = MAX_SUPER_METER;
      this.fighters[1].superMeter = MAX_SUPER_METER;
    } else {
      this.phase = 'intro_banter';
      this.phaseFrame = 0;
    }
  }

  private pickBanter(): BanterExchange {
    if (this.config.p1Fighter === this.config.p2Fighter) {
      return MIRROR_BANTER[this.config.p1Fighter];
    }
    const idx = Math.floor(Math.random() * BANTER_EXCHANGES.length);
    return BANTER_EXCHANGES[idx];
  }

  public emit(ev: SimEvent): void {
    this.events.push(ev);
  }

  public pushCallout(playerIndex: 0 | 1, text: string, color: string = '#ffd700'): void {
    this.callouts.push({
      id: this.nextId++,
      playerIndex,
      text,
      color,
      frame: this.frame,
    });
    if (this.callouts.length > 6) this.callouts.shift();
  }

  public setAnnouncer(
    text: string,
    style: AnnouncerEvent['style'] = 'normal',
    subtext?: string
  ): void {
    this.announcer = {
      id: this.nextId++,
      text,
      subtext,
      style,
      frame: this.frame,
    };
    this.emit({ type: 'announcer', text });
  }

  public skipIntro(): void {
    if (this.phase === 'intro_banter') {
      this.startRoundAnnounce();
    }
  }

  private startRoundAnnounce(): void {
    this.phase = 'round_announce';
    this.phaseFrame = 0;
    const isFinal =
      this.roundWins[0] === this.config.roundsToWin - 1 &&
      this.roundWins[1] === this.config.roundsToWin - 1;
    const label = isFinal ? 'FINAL ROUND' : `ROUND ${this.roundNumber}`;
    this.setAnnouncer(label, 'normal');
  }

  /**
   * Check whether `performer` is within valid Fatality range of `victim`.
   */
  public isFatalityRangeValid(performer: Fighter, victim: Fighter): boolean {
    const dist = Math.abs(performer.x - victim.x);
    const cfg = performer.def.fatality;
    return dist >= cfg.minDist && dist <= cfg.maxDist;
  }

  /**
   * Deterministic 60 Hz simulation step.
   */
  public step(p1Input: InputState, p2Input: InputState): void {
    this.events.length = 0;
    this.frame++;

    // Decay screen shake & chromatic aberration
    if (this.shakeIntensity > 0) {
      this.shakeIntensity = Math.max(0, this.shakeIntensity * 0.84 - 0.25);
    }
    if (this.chromaticFrames > 0) this.chromaticFrames--;

    // Expire old callouts
    this.callouts = this.callouts.filter((c) => this.frame - c.frame < 95);

    // Hitstop freeze
    if (this.hitstopFrames > 0) {
      this.hitstopFrames--;
      return;
    }

    // Slow-motion (bullet time / parry)
    if (this.slowMoFrames > 0) {
      this.slowMoFrames--;
      if (this.slowMoFrames % 2 === 1) return;
    }

    // Active scripted cinematics (Fatal Blow, Fatality, Brutality)
    if (this.cinematic.type !== 'none') {
      this.stepCinematic();
      return;
    }

    this.phaseFrame++;

    // Phase state machine
    if (this.phase === 'intro_banter') {
      if (
        this.phaseFrame >= INTRO_BANTER_FRAMES ||
        (this.phaseFrame > 25 && (p1Input.p1 || p1Input.p2 || p2Input.p1))
      ) {
        this.startRoundAnnounce();
      }
      return;
    }

    if (this.phase === 'round_announce') {
      if (this.phaseFrame === 55) {
        this.setAnnouncer('FIGHT!', 'fight');
      }
      if (this.phaseFrame >= ROUND_ANNOUNCE_FRAMES) {
        this.phase = 'fighting';
        this.phaseFrame = 0;
      }
      // Allow subtle idle animation updates
      this.fighters[0].stateFrame++;
      this.fighters[1].stateFrame++;
      return;
    }

    if (this.phase === 'round_over') {
      this.fighters[0].updatePhysicsAndTimers(this.frame, p1Input, this.fighters[1].x, false);
      this.fighters[1].updatePhysicsAndTimers(this.frame, p2Input, this.fighters[0].x, false);
      if (this.phaseFrame >= ROUND_OVER_FRAMES) {
        this.advanceToNextRound();
      }
      return;
    }

    if (this.phase === 'match_over') {
      this.fighters[0].stateFrame++;
      this.fighters[1].stateFrame++;
      return;
    }

    // Training mode overrides (regen health/meter & dummy block)
    let effP2Input = p2Input;
    if (this.config.mode === 'training') {
      const dummy = this.fighters[1];
      if (this.training.autoRegenHealth && dummy.comboHitsTaken === 0 && dummy.state === 'idle') {
        dummy.health = Math.min(dummy.maxHealth, dummy.health + 15);
      }
      if (this.training.autoRegenMeter) {
        this.fighters[0].superMeter = Math.min(MAX_SUPER_METER, this.fighters[0].superMeter + 3);
      }
      if (this.training.dummyBlock === 'all') {
        effP2Input = { ...p2Input, block: true };
      } else if (this.training.dummyBlock === 'after_first' && dummy.comboHitsTaken > 0) {
        effP2Input = { ...p2Input, block: true };
      }
    }

    // FINISH HIM! phase: winner can move & input Fatality, loser is dizzy for 6 seconds
    if (this.phase === 'finish_him') {
      const winnerIdx = this.winnerIndex ?? 0;
      const loserIdx: 0 | 1 = winnerIdx === 0 ? 1 : 0;
      const winner = this.fighters[winnerIdx];
      const loser = this.fighters[loserIdx];
      loser.state = 'dizzy';
      loser.vx *= 0.8;

      const winInput = winnerIdx === 0 ? p1Input : effP2Input;
      winner.updatePhysicsAndTimers(this.frame, winInput, loser.x, true);
      loser.updatePhysicsAndTimers(this.frame, p2Input, winner.x, false);
      this.resolvePushboxes();

      // Check Fatality input (sequence or Easy Fatality button when in range!)
      const inRange = this.isFatalityRangeValid(winner, loser);
      const seqTriggered = winner.inputBuffer.hasFatalitySequence(winner.def.fatality.inputSequence);
      const easyTriggered =
        this.config.easyFatality &&
        (winner.inputBuffer.wasPressed('fatalBlow', 4) ||
          (winInput.block && winner.inputBuffer.wasPressed('p2', 4)));

      if ((seqTriggered && inRange) || (easyTriggered && inRange)) {
        this.startFatalityCinematic(winnerIdx);
        return;
      }

      // If winner hits dizzy opponent normally (after brief transition grace), finish the match
      if (this.phaseFrame > 18) {
        const hb = winner.getActiveHitbox();
        if (hb && boxesOverlap(hb, loser.getHurtbox())) {
          loser.state = 'defeat';
          loser.health = 0;
          this.shakeIntensity = 12;
          this.emit({ type: 'hit', x: loser.x, y: loser.y - 120, heavy: true, playerIndex: winnerIdx });
          this.concludeMatch(winnerIdx, false, false);
          return;
        }
      }

      if (this.phaseFrame >= FINISH_HIM_DURATION_FRAMES) {
        loser.state = 'defeat';
        this.concludeMatch(winnerIdx, false, false);
      }
      return;
    }

    // === MAIN FIGHTING PHASE ===
    // Countdown timer (disabled in training)
    if (this.config.mode !== 'training') {
      if (this.timerFrames > 0) {
        this.timerFrames--;
      }
      if (this.timerFrames === 0) {
        this.handleTimeout();
        return;
      }
    }

    // Combo Breaker check (3 bars: Forward + Block while in hitstun/launch!)
    this.checkComboBreaker(0, p1Input);
    this.checkComboBreaker(1, effP2Input);

    // Update fighters
    this.fighters[0].updatePhysicsAndTimers(this.frame, p1Input, this.fighters[1].x, true);
    this.fighters[1].updatePhysicsAndTimers(this.frame, effP2Input, this.fighters[0].x, true);

    // Trigger special move spawns (projectiles, teleports, traps, clones, taunts)
    this.processSpecialEffects(0);
    this.processSpecialEffects(1);

    // Pushbox separation
    this.resolvePushboxes();

    // Melee combat hit detection
    this.resolveMeleeAttack(0, 1);
    this.resolveMeleeAttack(1, 0);

    // Update & resolve projectiles / traps
    this.updateProjectiles();

    // Reset combo counter when opponent returns to neutral/blocking
    for (let i = 0; i < 2; i++) {
      const opp = this.fighters[1 - i];
      if (opp.comboHitsTaken === 0 && opp.state !== 'hitstun' && opp.state !== 'launch') {
        this.comboCounts[i] = 0;
        this.comboDamage[i] = 0;
      }
    }

    // Check round end (health <= 0)
    if (this.config.mode !== 'training') {
      const p1Dead = this.fighters[0].health <= 0;
      const p2Dead = this.fighters[1].health <= 0;
      if (p1Dead || p2Dead) {
        this.handleRoundDefeat(p1Dead, p2Dead);
      }
    } else {
      // Never die in training mode
      if (this.fighters[0].health < 1) this.fighters[0].health = 1;
      if (this.fighters[1].health < 1) this.fighters[1].health = 1;
    }
  }

  private checkComboBreaker(playerIndex: 0 | 1, input: InputState): void {
    const f = this.fighters[playerIndex];
    const opp = this.fighters[1 - playerIndex];
    if (
      (f.state === 'hitstun' || f.state === 'launch') &&
      f.comboHitsTaken >= 2 &&
      f.superMeter >= MAX_SUPER_METER &&
      input.block &&
      ((f.facing === 1 && input.right) || (f.facing === -1 && input.left))
    ) {
      f.spendMeter(MAX_SUPER_METER);
      f.state = 'idle';
      f.stunFrames = 0;
      f.restrainedFrames = 0;
      f.comboHitsTaken = 0;
      f.juggleHitsTaken = 0;
      f.invincibleFrames = 18;
      opp.vx = -opp.facing * 18;
      opp.stunFrames = 14;
      this.hitstopFrames = 10;
      this.shakeIntensity = 14;
      this.pushCallout(playerIndex, 'COMBO BREAKER!', '#00e5ff');
      this.emit({ type: 'combo_breaker', x: f.x, y: f.y - 110, playerIndex });
    }
  }

  private processSpecialEffects(playerIndex: 0 | 1): void {
    const f = this.fighters[playerIndex];
    const opp = this.fighters[1 - playerIndex];
    const move = f.currentMove;
    if (!move || f.moveSpecialFired || f.moveFrame !== move.startup) return;

    f.moveSpecialFired = true;

    switch (move.specialEffect) {
      case 'projectile_eggplant':
        this.spawnProjectile({
          ownerIndex: playerIndex,
          fighterId: f.id,
          kind: 'eggplant',
          x: f.x + f.facing * 72,
          y: f.y - 130,
          vx: f.facing * 13.5,
          vy: 0,
          w: 58,
          h: 42,
          damage: move.damage,
          chip: move.chip,
          hitstun: move.hitstun,
          blockstun: move.blockstun,
          height: move.height,
          ttl: 95,
          hitsRemaining: 1,
          ex: false,
        });
        break;

      case 'projectile_eggplant_ex':
        // Dual spread digital eggplants!
        [-1.6, 1.4].forEach((vyOffset) => {
          this.spawnProjectile({
            ownerIndex: playerIndex,
            fighterId: f.id,
            kind: 'eggplant',
            x: f.x + f.facing * 72,
            y: f.y - 135 + vyOffset * 12,
            vx: f.facing * 15,
            vy: vyOffset * 0.45,
            w: 64,
            h: 48,
            damage: Math.round(move.damage * 0.6),
            chip: Math.round(move.chip * 0.6),
            hitstun: move.hitstun,
            blockstun: move.blockstun,
            height: 'mid',
            ttl: 95,
            hitsRemaining: 1,
            ex: true,
          });
        });
        break;

      case 'teleport':
      case 'teleport_ex': {
        this.emit({ type: 'teleport', x: f.x, y: f.y - 110, playerIndex, fighterId: f.id });
        const targetX = Math.max(
          STAGE_LEFT + 20,
          Math.min(STAGE_RIGHT - 20, opp.x - opp.facing * 92)
        );
        f.x = targetX;
        f.facing = opp.x >= f.x ? 1 : -1;
        this.emit({ type: 'teleport', x: f.x, y: f.y - 110, playerIndex, fighterId: f.id });
        break;
      }

      case 'clone_grapple':
        this.spawnProjectile({
          ownerIndex: playerIndex,
          fighterId: f.id,
          kind: 'clone',
          x: f.x + f.facing * 60,
          y: GROUND_Y - 110,
          vx: f.facing * 11,
          vy: 0,
          w: 76,
          h: 185,
          damage: move.damage,
          chip: move.chip,
          hitstun: move.hitstun,
          blockstun: move.blockstun,
          height: 'mid',
          ttl: 52,
          hitsRemaining: 1,
          ex: false,
        });
        break;

      case 'projectile_glitter':
        this.spawnProjectile({
          ownerIndex: playerIndex,
          fighterId: f.id,
          kind: 'glitter',
          x: f.x + f.facing * 74,
          y: f.y - 132,
          vx: f.facing * 12.5,
          vy: 0,
          w: 60,
          h: 56,
          damage: move.damage,
          chip: move.chip,
          hitstun: move.hitstun,
          blockstun: move.blockstun,
          height: 'mid',
          ttl: 95,
          hitsRemaining: 1,
          ex: false,
        });
        break;

      case 'projectile_glitter_ex':
        this.spawnProjectile({
          ownerIndex: playerIndex,
          fighterId: f.id,
          kind: 'glitter_cloud',
          x: f.x + f.facing * 80,
          y: f.y - 132,
          vx: f.facing * 9.5,
          vy: 0,
          w: 96,
          h: 96,
          damage: Math.round(move.damage * 0.45),
          chip: 8,
          hitstun: 28,
          blockstun: 16,
          height: 'mid',
          ttl: 115,
          hitsRemaining: 3,
          ex: true,
        });
        break;

      case 'disco_drop':
        // Overhead mirror disco ball spawns above opponent!
        this.spawnProjectile({
          ownerIndex: playerIndex,
          fighterId: f.id,
          kind: 'disco_ball',
          x: opp.x,
          y: 120,
          vx: 0,
          vy: 9.5,
          w: 84,
          h: 84,
          damage: move.damage,
          chip: move.chip,
          hitstun: move.hitstun,
          blockstun: move.blockstun,
          height: 'overhead',
          ttl: 65,
          hitsRemaining: 1,
          ex: false,
        });
        break;

      case 'taunt_meter':
        f.addMeter(38);
        this.pushCallout(
          playerIndex,
          f.id === 'bob' ? 'GLASSES ADJUSTED +METER' : 'SPOTLIGHT BONUS +METER',
          f.def.accentColor
        );
        this.emit({ type: 'taunt', x: f.x, y: f.y - 160, playerIndex, fighterId: f.id });
        break;

      default:
        break;
    }
  }

  private spawnProjectile(p: Omit<Projectile, 'id' | 'maxTtl' | 'hitCooldown' | 'active'>): void {
    this.projectiles.push({
      ...p,
      id: this.nextId++,
      maxTtl: p.ttl,
      hitCooldown: 0,
      active: true,
    });
    this.emit({
      type: 'projectile_spawn',
      x: p.x,
      y: p.y,
      playerIndex: p.ownerIndex,
      fighterId: p.fighterId,
    });
  }

  private resolvePushboxes(): void {
    const a = this.fighters[0];
    const b = this.fighters[1];
    const pbA = a.getPushbox();
    const pbB = b.getPushbox();
    if (!boxesOverlap(pbA, pbB)) return;

    const overlapX = Math.min(pbA.x + pbA.w, pbB.x + pbB.w) - Math.max(pbA.x, pbB.x);
    if (overlapX <= 0) return;

    const push = overlapX / 2 + 0.5;
    if (a.x <= b.x) {
      a.x -= push;
      b.x += push;
    } else {
      a.x += push;
      b.x -= push;
    }

    // Clamp cleanly against stage boundaries (prevent corner clipping)
    if (a.x < STAGE_LEFT) {
      const diff = STAGE_LEFT - a.x;
      a.x = STAGE_LEFT;
      b.x = Math.min(STAGE_RIGHT, b.x + diff);
    } else if (a.x > STAGE_RIGHT) {
      const diff = a.x - STAGE_RIGHT;
      a.x = STAGE_RIGHT;
      b.x = Math.max(STAGE_LEFT, b.x - diff);
    }
    if (b.x < STAGE_LEFT) {
      const diff = STAGE_LEFT - b.x;
      b.x = STAGE_LEFT;
      a.x = Math.min(STAGE_RIGHT, a.x + diff);
    } else if (b.x > STAGE_RIGHT) {
      const diff = b.x - STAGE_RIGHT;
      b.x = STAGE_RIGHT;
      a.x = Math.max(STAGE_LEFT, a.x - diff);
    }
  }

  private resolveMeleeAttack(atkIdx: 0 | 1, defIdx: 0 | 1): void {
    const atk = this.fighters[atkIdx];
    const def = this.fighters[defIdx];
    const move = atk.currentMove;
    if (!move) return;

    const hb = atk.getActiveHitbox();
    if (!hb) return;

    // Multi-hit gating
    const maxHits = move.multiHit ?? 1;
    if (atk.moveHitCount >= maxHits) return;
    if (atk.moveMultiHitTimer > 0) {
      atk.moveMultiHitTimer--;
      return;
    }

    if (def.invincibleFrames > 0) return;

    // Throw distance check + Throw Tech
    if (move.category === 'throw') {
      if (!def.isGrounded() || Math.abs(atk.x - def.x) > THROW_RANGE) return;
      // Check throw tech (defender also pressed throw or p1+k1 recently)
      if (
        (def.state === 'attack' && def.currentMove?.category === 'throw') ||
        (def.inputBuffer.wasPressed('ex', 8) && def.canAct())
      ) {
        atk.moveHitCount = maxHits;
        atk.vx = -atk.facing * 12;
        def.vx = -def.facing * 12;
        atk.currentMove = null;
        atk.state = 'idle';
        def.state = 'idle';
        this.hitstopFrames = 8;
        this.pushCallout(defIdx, 'THROW ESCAPE!', '#00e5ff');
        this.emit({ type: 'throw_tech', x: (atk.x + def.x) / 2, y: def.y - 130 });
        return;
      }
      if (!boxesOverlap(hb, def.getHurtbox())) return;
      atk.moveHitCount = maxHits;
      atk.moveHasHit = true;
      // Wall swap if attacker holds back during throw!
      const latest = atk.inputBuffer.latest();
      if (latest && latest.dir === 4) {
        const tmp = atk.x;
        atk.x = def.x;
        def.x = Math.max(STAGE_LEFT, Math.min(STAGE_RIGHT, tmp));
        atk.facing = def.x >= atk.x ? 1 : -1;
      }
      this.applyHit(atkIdx, defIdx, move, (atk.x + def.x) / 2, def.y - 130, false);
      this.emit({ type: 'throw', x: def.x, y: def.y - 120, playerIndex: atkIdx });
      return;
    }

    if (!boxesOverlap(hb, def.getHurtbox())) return;

    // Check Parry (Bullet-Time Lean / Vogue Pose Parry)
    if (def.state === 'parry' && def.currentMove) {
      const pm = def.currentMove;
      if (def.moveFrame >= pm.startup && def.moveFrame < pm.startup + pm.active) {
        atk.moveHitCount = maxHits;
        def.state = 'idle';
        def.currentMove = null;
        def.addMeter(pm.meterGainHit ?? 35);
        this.slowMoFrames = 26;
        this.hitstopFrames = 10;
        this.shakeIntensity = 12;
        this.chromaticFrames = 16;
        const label = def.id === 'bob' ? 'BULLET-TIME COUNTER!' : 'VOGUE PARRY!';
        this.pushCallout(defIdx, label, def.def.accentColor);
        this.emit({ type: 'parry', x: def.x, y: def.y - 135, playerIndex: defIdx, fighterId: def.id });
        // Counter-launch attacker!
        this.applyHit(defIdx, atkIdx, pm, atk.x, atk.y - 130, false);
        return;
      }
    }

    // Fatal Blow cinematic trigger on unblocked hit!
    if (move.category === 'fatal_blow') {
      const outcome = evaluateDefense({
        height: move.height,
        defenderCrouching: def.isCrouching(),
        defenderBlocking: def.isBlocking(),
        defenderUpBlocking: def.state === 'up_block',
        defenderFlawlessWindow: def.isInFlawlessWindow(),
      });
      if (outcome === 'whiff_high_crouch') return;
      atk.moveHitCount = maxHits;
      atk.moveHasHit = true;
      if (outcome === 'hit') {
        atk.fatalBlowUsed = true;
        this.startFatalBlowCinematic(atkIdx, move);
        return;
      } else {
        // Blocked Fatal Blow goes on brief cooldown (MK11/MK1 style)
        atk.fatalBlowCooldown = 8 * TICK_RATE;
        this.applyBlock(atkIdx, defIdx, move, outcome, (atk.x + def.x) / 2, def.y - 130);
        return;
      }
    }

    // Standard hit vs block evaluation
    const outcome = evaluateDefense({
      height: move.height,
      defenderCrouching: def.isCrouching(),
      defenderBlocking: def.isBlocking(),
      defenderUpBlocking: def.state === 'up_block',
      defenderFlawlessWindow: def.isInFlawlessWindow(),
    });

    if (outcome === 'whiff_high_crouch') {
      return; // High attack whiffs cleanly over crouching defender!
    }

    atk.moveHitCount++;
    atk.moveHasHit = true;
    atk.moveMultiHitTimer = maxHits > 1 ? 4 : 0;

    const hitX = (hb.x + hb.w / 2 + def.x) / 2;
    const hitY = hb.y + hb.h / 2;

    if (outcome === 'hit') {
      const perHitMove: MoveData =
        maxHits > 1
          ? {
              ...move,
              damage: Math.round(move.damage / maxHits),
              launch: move.launch && atk.moveHitCount === maxHits,
            }
          : move;
      this.applyHit(atkIdx, defIdx, perHitMove, hitX, hitY, false);
    } else {
      this.applyBlock(atkIdx, defIdx, move, outcome, hitX, hitY);
    }
  }

  private applyHit(
    atkIdx: 0 | 1,
    defIdx: 0 | 1,
    move: MoveData,
    hitX: number,
    hitY: number,
    isProjectile: boolean
  ): void {
    const atk = this.fighters[atkIdx];
    const def = this.fighters[defIdx];

    // Check armor on defender (e.g. EX armored kick or Fatal Blow startup)
    const defHasArmor =
      def.currentMove?.armor &&
      def.moveFrame < def.currentMove.startup + def.currentMove.active;

    // Counter / Punish callouts
    const isPunish = def.state === 'attack' && def.currentMove && def.moveFrame >= def.currentMove.startup + def.currentMove.active;
    const isCounter = def.state === 'attack' && def.currentMove && def.moveFrame < def.currentMove.startup;

    if (!this.firstHitAwarded) {
      this.firstHitAwarded = true;
      atk.addMeter(25);
      this.pushCallout(atkIdx, 'FIRST HIT!', '#ffd700');
    } else if (isPunish && def.comboHitsTaken === 0) {
      this.pushCallout(atkIdx, 'PUNISH!', '#ff6b35');
    } else if (isCounter && def.comboHitsTaken === 0) {
      this.pushCallout(atkIdx, 'COUNTER!', '#ff3b5c');
    }

    // Combo damage scaling
    const scale = getComboScaling(def.comboHitsTaken);
    const dmg = Math.max(5, Math.round(move.damage * scale));
    def.health = Math.max(0, def.health - dmg);
    def.hitFlashFrames = 6;

    // Meter gain
    atk.addMeter(move.meterGainHit ?? 16);
    def.addMeter(Math.round((move.meterGainHit ?? 16) * 0.55));

    // Combo tracking
    def.comboHitsTaken++;
    this.comboCounts[atkIdx] = def.comboHitsTaken;
    this.comboDamage[atkIdx] += dmg;

    // Frame advantage calculation
    if (!isProjectile && atk.currentMove) {
      const remAtk = Math.max(
        0,
        atk.currentMove.startup + atk.currentMove.active + atk.currentMove.recovery - atk.moveFrame
      );
      atk.lastFrameAdvantage = move.hitstun - remAtk;
    }

    const heavy = move.damage >= 70 || Boolean(move.launch) || Boolean(move.hardKnockdown);
    this.hitstopFrames = heavy ? 7 : 4;
    this.shakeIntensity = heavy ? 10 : 4.5;
    if (heavy) this.chromaticFrames = 7;

    this.emit({
      type: 'hit',
      x: hitX,
      y: hitY,
      playerIndex: atkIdx,
      fighterId: atk.id,
      heavy,
    });

    if (defHasArmor && def.health > 0) {
      this.pushCallout(defIdx, 'ARMOR!', '#f59e0b');
      return; // Defender powers through hit!
    }

    // Presentation only (v2 hit-reaction frames): where the hit landed and whether the defender was low.
    def.lastHitHeight = move.height;
    def.lastHitCrouching = def.state === 'crouch' || def.state === 'block_crouch' || def.currentMove?.pose === 'crouch';

    // Cancel defender's active move
    def.currentMove = null;

    // Apply knockback & state
    const kbDir = atk.x <= def.x ? 1 : -1;
    def.vx = kbDir * move.knockbackX;

    if (move.specialEffect === 'clone_grapple') {
      def.state = 'hitstun';
      def.stunFrames = 42;
      def.restrainedFrames = 42;
      def.vx = 0;
      this.pushCallout(atkIdx, 'CLONE RESTRAIN!', '#00ff7f');
    } else if (move.hardKnockdown) {
      def.state = 'launch';
      def.vy = move.knockbackY || -9;
      def.juggleHitsTaken++;
    } else if (move.launch || !def.isGrounded()) {
      def.state = 'launch';
      def.vy = move.knockbackY < 0 ? move.knockbackY : -12;
      def.juggleHitsTaken++;
    } else {
      def.state = 'hitstun';
      def.stunFrames = move.hitstun;
    }

    // Wall bounce cue if heavy hit slams defender into corner!
    if (heavy && (def.x <= STAGE_LEFT + 35 || def.x >= STAGE_RIGHT - 35)) {
      def.vx = -kbDir * 7;
      def.vy = -12;
      def.state = 'launch';
      this.shakeIntensity = 13;
      this.emit({ type: 'wall_bounce', x: def.x, y: def.y - 120 });
    }
  }

  private applyBlock(
    atkIdx: 0 | 1,
    defIdx: 0 | 1,
    move: MoveData,
    outcome: 'blocked' | 'flawless_block' | 'up_block',
    hitX: number,
    hitY: number
  ): void {
    const atk = this.fighters[atkIdx];
    const def = this.fighters[defIdx];

    const isFlawless = outcome === 'flawless_block';
    const isUpBlock = outcome === 'up_block';

    // Chip damage (reduced to 0 on Flawless Block or Up-Block!)
    const chip = isFlawless || isUpBlock ? 0 : move.chip;
    if (chip > 0 && def.health > 1) {
      def.health = Math.max(1, def.health - chip); // Chip never kills in casual/standard until final hit? Actually allow chip kill only on specials if desired, keep >= 1 for fairness except EX
      if (move.category === 'ex' && def.health <= chip) {
        def.health = 0;
      }
    }

    const blockstun = isFlawless
      ? Math.max(4, Math.floor(move.blockstun * 0.45))
      : isUpBlock
      ? Math.max(3, Math.floor(move.blockstun * 0.35))
      : move.blockstun;

    def.stunFrames = blockstun;
    def.vx = (atk.x <= def.x ? 1 : -1) * (move.knockbackX * 0.55);

    if (isFlawless) {
      def.state = 'flawless_block';
      def.addMeter(32);
      this.pushCallout(defIdx, 'FLAWLESS BLOCK!', '#38bdf8');
      this.emit({ type: 'flawless_block', x: hitX, y: hitY, playerIndex: defIdx });
    } else if (isUpBlock) {
      def.state = 'up_block';
      def.addMeter(28);
      // Extra recovery punish on attacker!
      if (atk.currentMove) {
        atk.moveFrame = Math.max(0, atk.moveFrame - 6);
      }
      this.pushCallout(defIdx, 'UP-BLOCK PUNISH!', '#a855f7');
      this.emit({ type: 'up_block', x: hitX, y: hitY, playerIndex: defIdx });
    } else {
      atk.addMeter(move.meterGainBlock ?? 8);
      def.addMeter(10);
      this.emit({ type: 'block', x: hitX, y: hitY, playerIndex: defIdx });
    }

    if (atk.currentMove) {
      const remAtk = Math.max(
        0,
        atk.currentMove.startup + atk.currentMove.active + atk.currentMove.recovery - atk.moveFrame
      );
      atk.lastFrameAdvantage = blockstun - remAtk;
    }

    this.hitstopFrames = isFlawless || isUpBlock ? 6 : 3;
    this.shakeIntensity = 2.5;
  }

  private updateProjectiles(): void {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.ttl--;
      if (p.hitCooldown > 0) p.hitCooldown--;

      // Movement
      p.x += p.vx;
      p.y += p.vy;
      if (p.kind === 'glitter_cloud') {
        p.vx *= 0.94; // Lingers as a stun cloud!
      }
      if (p.kind === 'disco_ball' && p.y >= GROUND_Y - 40) {
        p.active = false;
      }

      if (p.ttl <= 0 || p.x < STAGE_LEFT - 120 || p.x > STAGE_RIGHT + 120 || !p.active) {
        this.projectiles.splice(i, 1);
        continue;
      }

      // Check collision with opponent
      const defIdx: 0 | 1 = p.ownerIndex === 0 ? 1 : 0;
      const def = this.fighters[defIdx];
      if (p.hitCooldown > 0 || def.invincibleFrames > 0) continue;

      const pBox = { x: p.x - p.w / 2, y: p.y - p.h / 2, w: p.w, h: p.h };
      if (!boxesOverlap(pBox, def.getHurtbox())) continue;

      const outcome = evaluateDefense({
        height: p.height,
        defenderCrouching: def.isCrouching(),
        defenderBlocking: def.isBlocking(),
        defenderUpBlocking: def.state === 'up_block',
        defenderFlawlessWindow: def.isInFlawlessWindow(),
      });

      if (outcome === 'whiff_high_crouch') continue;

      const syntheticMove: MoveData = {
        id: p.kind,
        name: p.kind,
        category: p.ex ? 'ex' : 'special',
        inputNotation: '',
        pose: 'special',
        height: p.height,
        startup: 0,
        active: 1,
        recovery: 0,
        damage: p.damage,
        chip: p.chip,
        hitstun: p.hitstun,
        blockstun: p.blockstun,
        knockbackX: p.kind === 'clone' ? 0 : 8,
        knockbackY: p.ex || p.kind === 'disco_ball' ? -11 : 0,
        launch: p.ex || p.kind === 'disco_ball',
        specialEffect: p.kind === 'clone' ? 'clone_grapple' : undefined,
      };

      if (outcome === 'hit') {
        this.applyHit(p.ownerIndex, defIdx, syntheticMove, p.x, p.y, true);
      } else {
        this.applyBlock(p.ownerIndex, defIdx, syntheticMove, outcome, p.x, p.y);
      }

      p.hitsRemaining--;
      p.hitCooldown = 10;
      if (p.hitsRemaining <= 0) {
        this.projectiles.splice(i, 1);
      }
    }
  }

  private startFatalBlowCinematic(performerIdx: 0 | 1, move: MoveData): void {
    const perf = this.fighters[performerIdx];
    const victim = this.fighters[1 - performerIdx];
    perf.state = 'fatal_blow';
    victim.state = 'hitstun';
    victim.stunFrames = 140;
    this.projectiles.length = 0;

    this.cinematic = {
      type: 'fatal_blow',
      performerIndex: performerIdx,
      fighterId: perf.id,
      frame: 0,
      duration: 135, // 2.25s high-impact comic-style Fatal Blow sequence
      beat: 0,
      cameraZoom: 1.32,
      cameraTargetX: (perf.x + victim.x) / 2,
      cameraTargetY: GROUND_Y - 120,
      dimAmount: 0.6,
    };

    this.pushCallout(performerIdx, `FATAL BLOW: ${move.name.toUpperCase()}!`, '#ff2a55');
    this.emit({ type: 'fatal_blow_start', x: perf.x, y: perf.y - 120, playerIndex: performerIdx, fighterId: perf.id });
  }

  private startFatalityCinematic(performerIdx: 0 | 1): void {
    const perf = this.fighters[performerIdx];
    const victim = this.fighters[1 - performerIdx];
    this.phase = 'fatality_cinematic';
    this.phaseFrame = 0;
    perf.state = 'fatality_perform';
    victim.state = 'fatality_victim';
    this.projectiles.length = 0;

    this.cinematic = {
      type: 'fatality',
      performerIndex: performerIdx,
      fighterId: perf.id,
      frame: 0,
      duration: 210, // 3.5s scripted multi-beat Eggplant Fatality!
      beat: 0,
      cameraZoom: 1.25,
      cameraTargetX: (perf.x + victim.x) / 2,
      cameraTargetY: GROUND_Y - 130,
      dimAmount: 0.72,
    };

    this.setAnnouncer(perf.def.fatality.name.toUpperCase(), 'fatality', 'EGGPLANT FATALITY');
    this.emit({ type: 'fatality_start', x: victim.x, y: victim.y - 120, playerIndex: performerIdx, fighterId: perf.id });
  }

  private startBrutalityCinematic(performerIdx: 0 | 1): void {
    const perf = this.fighters[performerIdx];
    const victim = this.fighters[1 - performerIdx];
    this.phase = 'brutality_finish';
    this.phaseFrame = 0;
    perf.state = 'victory';
    victim.state = 'fatality_victim';
    this.projectiles.length = 0;

    this.cinematic = {
      type: 'brutality',
      performerIndex: performerIdx,
      fighterId: perf.id,
      frame: 0,
      duration: 120,
      beat: 0,
      cameraZoom: 1.35,
      cameraTargetX: victim.x,
      cameraTargetY: GROUND_Y - 120,
      dimAmount: 0.55,
    };

    this.setAnnouncer('BRUTALITY!', 'brutality', perf.def.brutalityName.toUpperCase());
    this.emit({ type: 'brutality_start', x: victim.x, y: victim.y - 120, playerIndex: performerIdx, fighterId: perf.id });
  }

  private stepCinematic(): void {
    const c = this.cinematic;
    c.frame++;
    const perf = this.fighters[c.performerIndex];
    const victim = this.fighters[1 - c.performerIndex];

    if (c.type === 'fatal_blow') {
      // 3 dramatic impact beats!
      if (c.frame === 30 || c.frame === 72 || c.frame === 110) {
        c.beat++;
        const beatDmg = c.frame === 110 ? 130 : 90;
        victim.health = Math.max(0, victim.health - beatDmg);
        victim.hitFlashFrames = 8;
        this.shakeIntensity = c.frame === 110 ? 18 : 11;
        this.chromaticFrames = 10;
        this.comboCounts[c.performerIndex]++;
        this.comboDamage[c.performerIndex] += beatDmg;
        this.emit({ type: 'hit', x: victim.x, y: victim.y - 130, heavy: true, playerIndex: c.performerIndex, fighterId: perf.id });
      }
      if (c.frame >= c.duration) {
        c.type = 'none';
        c.dimAmount = 0;
        c.cameraZoom = 1;
        perf.state = 'idle';
        perf.currentMove = null;
        victim.state = 'launch';
        victim.vx = (perf.x <= victim.x ? 1 : -1) * 14;
        victim.vy = -13;
        if (victim.health <= 0 && this.config.mode !== 'training') {
          this.handleRoundDefeat(c.performerIndex === 1, c.performerIndex === 0);
        }
      }
      return;
    }

    if (c.type === 'fatality') {
      // Multi-beat eggplant finale!
      if (c.frame === 45) {
        c.beat = 1; // Clones / Runway lights
        this.shakeIntensity = 6;
      } else if (c.frame === 105) {
        c.beat = 2; // Colossal Eggplant descends!
        this.shakeIntensity = 10;
      } else if (c.frame === 150) {
        c.beat = 3; // Comic Eggplant Splat / Confetti launch!
        victim.health = 0;
        victim.hitFlashFrames = 12;
        this.shakeIntensity = 22;
        this.chromaticFrames = 18;
        this.emit({ type: 'hit', x: victim.x, y: victim.y - 120, heavy: true, playerIndex: c.performerIndex, fighterId: perf.id });
      }
      if (c.frame >= c.duration) {
        c.type = 'none';
        c.dimAmount = 0;
        c.cameraZoom = 1;
        this.concludeMatch(c.performerIndex, true, false);
      }
      return;
    }

    if (c.type === 'brutality') {
      if (c.frame === 30) {
        c.beat = 1;
        this.shakeIntensity = 18;
        this.emit({ type: 'hit', x: victim.x, y: victim.y - 120, heavy: true, playerIndex: c.performerIndex, fighterId: perf.id });
      }
      if (c.frame >= c.duration) {
        c.type = 'none';
        c.dimAmount = 0;
        c.cameraZoom = 1;
        this.concludeMatch(c.performerIndex, false, true);
      }
    }
  }

  private handleTimeout(): void {
    const p1Ratio = this.fighters[0].health / this.fighters[0].maxHealth;
    const p2Ratio = this.fighters[1].health / this.fighters[1].maxHealth;
    if (Math.abs(p1Ratio - p2Ratio) < 0.0001) {
      // Draw round
      this.phase = 'round_over';
      this.phaseFrame = 0;
      this.setAnnouncer('TIME OVER', 'normal', 'DRAW ROUND');
    } else if (p1Ratio > p2Ratio) {
      this.awardRoundWin(0, 'TIME OVER');
    } else {
      this.awardRoundWin(1, 'TIME OVER');
    }
  }

  private handleRoundDefeat(p1Dead: boolean, p2Dead: boolean): void {
    if (p1Dead && p2Dead) {
      // Double defeat — draw round, never soft-lock!
      this.phase = 'round_over';
      this.phaseFrame = 0;
      this.setAnnouncer('DOUBLE DEFEAT', 'normal', 'DRAW ROUND');
      return;
    }

    const winnerIdx: 0 | 1 = p2Dead ? 0 : 1;
    const winner = this.fighters[winnerIdx];
    const loser = this.fighters[1 - winnerIdx];

    // Check Secret Brutality! (Final deciding round ended with fighter's EX brutality move!)
    const isMatchPoint = this.roundWins[winnerIdx] + 1 >= this.config.roundsToWin;
    const lastMoveId = winner.currentMove?.id ?? '';
    const brutalityProjectile = this.projectiles.some(
      (p) => p.ownerIndex === winnerIdx && p.ex
    );
    if (
      isMatchPoint &&
      (lastMoveId === winner.def.brutalityMoveId || brutalityProjectile)
    ) {
      this.roundWins[winnerIdx]++;
      this.winnerIndex = winnerIdx;
      this.startBrutalityCinematic(winnerIdx);
      return;
    }

    // If match point reached -> trigger FINISH HIM! (6s dizzy state)
    if (isMatchPoint) {
      this.roundWins[winnerIdx]++;
      this.winnerIndex = winnerIdx;
      this.phase = 'finish_him';
      this.phaseFrame = 0;
      winner.currentMove = null;
      winner.state = 'idle';
      loser.health = 1;
      loser.state = 'dizzy';
      loser.y = GROUND_Y;
      loser.vx = 0;
      loser.vy = 0;
      this.projectiles.length = 0;
      this.setAnnouncer(
        'FINISH HIM!',
        'finish',
        `Fatality: ${winner.def.fatality.inputDisplay}${this.config.easyFatality ? '  (or press F)' : ''}`
      );
      return;
    }

    this.awardRoundWin(winnerIdx);
  }

  private awardRoundWin(winnerIdx: 0 | 1, reasonSubtext?: string): void {
    this.roundWins[winnerIdx]++;
    const winner = this.fighters[winnerIdx];
    const loser = this.fighters[1 - winnerIdx];
    const flawless = winner.health >= winner.maxHealth;

    if (this.roundWins[winnerIdx] >= this.config.roundsToWin) {
      this.concludeMatch(winnerIdx, false, false);
      return;
    }

    this.phase = 'round_over';
    this.phaseFrame = 0;
    winner.state = 'victory';
    loser.state = 'defeat';
    this.projectiles.length = 0;

    // Note: Announcer NEVER says "K.O."!
    const sub = flawless ? 'FLAWLESS VICTORY!' : reasonSubtext;
    this.setAnnouncer(`${winner.def.name.toUpperCase()} WINS`, 'win', sub);
    this.emit({ type: 'round_win', playerIndex: winnerIdx, fighterId: winner.id });
  }

  private advanceToNextRound(): void {
    this.roundNumber++;
    this.timerFrames = this.config.roundTimeSeconds * TICK_RATE;
    this.firstHitAwarded = false;
    this.projectiles.length = 0;
    this.fighters[0].resetForRound(true);
    this.fighters[1].resetForRound(true);
    this.startRoundAnnounce();
  }

  private concludeMatch(winnerIdx: 0 | 1, fatality: boolean, brutality: boolean): void {
    this.winnerIndex = winnerIdx;
    this.phase = 'match_over';
    this.phaseFrame = 0;
    const winner = this.fighters[winnerIdx];
    const loser = this.fighters[1 - winnerIdx];
    winner.state = 'victory';
    loser.state = 'defeat';
    const flawless = winner.health >= winner.maxHealth;

    if (fatality) {
      this.setAnnouncer(
        'FATALITY!',
        'fatality',
        `${winner.def.name.toUpperCase()} WINS — ${winner.def.fatality.name.toUpperCase()}${flawless ? ' • FLAWLESS VICTORY!' : ''}`
      );
    } else if (brutality) {
      this.setAnnouncer(
        'BRUTALITY!',
        'brutality',
        `${winner.def.name.toUpperCase()} WINS — ${winner.def.brutalityName.toUpperCase()}`
      );
    } else {
      this.setAnnouncer(
        `${winner.def.name.toUpperCase()} WINS`,
        'win',
        flawless ? 'FLAWLESS VICTORY!' : 'MATCH COMPLETE'
      );
    }

    this.emit({ type: 'match_win', playerIndex: winnerIdx, fighterId: winner.id });
  }
}
