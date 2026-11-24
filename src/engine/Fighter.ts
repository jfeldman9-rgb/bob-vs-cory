import fightersJson from '../data/fighters.json';
import {
  Box,
  FighterDefinition,
  FighterId,
  FighterState,
  InputState,
  MoveData,
  PoseName,
} from '../types/game';
import {
  FATAL_BLOW_HP_RATIO,
  FLAWLESS_BLOCK_WINDOW,
  GRAVITY,
  GROUND_Y,
  MAX_FALL_SPEED,
  MAX_SUPER_METER,
  STAGE_LEFT,
  STAGE_RIGHT,
  UP_BLOCK_WINDOW,
  getJuggleGravityMultiplier,
} from './constants';
import { getHurtbox, getPushbox, getWorldHitbox } from './HitboxSystem';
import { InputBuffer } from './InputBuffer';

export const FIGHTER_DEFS = fightersJson as Record<FighterId, FighterDefinition>;

export class Fighter {
  public readonly playerIndex: 0 | 1;
  public readonly id: FighterId;
  public readonly def: FighterDefinition;
  public paletteIndex: number;

  // Spatial
  public x: number;
  public y: number = GROUND_Y;
  public vx: number = 0;
  public vy: number = 0;
  public facing: 1 | -1;

  // Vitals & Resources
  public health: number;
  public maxHealth: number;
  public trailHealth: number; // Red trailing drain bar
  public superMeter: number = 0;
  public fatalBlowUsed: boolean = false;
  public fatalBlowCooldown: number = 0;

  // FSM
  public state: FighterState = 'idle';
  public stateFrame: number = 0;
  public stunFrames: number = 0;
  public knockdownFrames: number = 0;
  public invincibleFrames: number = 0;
  public hitFlashFrames: number = 0;
  public blockPressAge: number = 99;
  public upBlockTimer: number = 0;
  public parryActiveFrames: number = 0;
  public restrainedFrames: number = 0; // Agent Clone Grapple hold!

  // Active move state
  public currentMove: MoveData | null = null;
  public moveFrame: number = 0;
  public moveHasHit: boolean = false;
  public moveHitCount: number = 0;
  public moveMultiHitTimer: number = 0;
  public moveSpecialFired: boolean = false;
  public queuedFollowUp: string | null = null;
  public comboHitsTaken: number = 0;
  public juggleHitsTaken: number = 0;
  public lastFrameAdvantage: number = 0;
  public battleDamage: number = 0; // 0..1 visual bruising

  // Input buffer
  public readonly inputBuffer = new InputBuffer();

  // Visual helpers
  public afterimages: { x: number; y: number; facing: 1 | -1; pose: PoseName; alpha: number; tint: number }[] = [];

  constructor(playerIndex: 0 | 1, id: FighterId, paletteIndex: number = 0) {
    this.playerIndex = playerIndex;
    this.id = id;
    this.def = FIGHTER_DEFS[id];
    this.paletteIndex = paletteIndex % this.def.palettes.length;
    this.maxHealth = this.def.maxHealth;
    this.health = this.maxHealth;
    this.trailHealth = this.maxHealth;
    this.x = playerIndex === 0 ? 720 : 1280;
    this.facing = playerIndex === 0 ? 1 : -1;
  }

  public resetForRound(keepMeter: boolean): void {
    this.x = this.playerIndex === 0 ? 720 : 1280;
    this.y = GROUND_Y;
    this.vx = 0;
    this.vy = 0;
    this.facing = this.playerIndex === 0 ? 1 : -1;
    this.health = this.maxHealth;
    this.trailHealth = this.maxHealth;
    if (!keepMeter) {
      this.superMeter = 0;
      this.fatalBlowUsed = false;
    }
    this.fatalBlowCooldown = 0;
    this.state = 'idle';
    this.stateFrame = 0;
    this.stunFrames = 0;
    this.knockdownFrames = 0;
    this.invincibleFrames = 0;
    this.hitFlashFrames = 0;
    this.blockPressAge = 99;
    this.upBlockTimer = 0;
    this.parryActiveFrames = 0;
    this.restrainedFrames = 0;
    this.currentMove = null;
    this.moveFrame = 0;
    this.moveHasHit = false;
    this.moveHitCount = 0;
    this.moveMultiHitTimer = 0;
    this.moveSpecialFired = false;
    this.queuedFollowUp = null;
    this.comboHitsTaken = 0;
    this.juggleHitsTaken = 0;
    this.afterimages.length = 0;
    this.inputBuffer.reset();
  }

  public isGrounded(): boolean {
    return this.y >= GROUND_Y - 0.5;
  }

  public isCrouching(): boolean {
    return (
      this.state === 'crouch' ||
      this.state === 'block_crouch' ||
      (this.state === 'attack' && this.currentMove?.pose === 'crouch')
    );
  }

  public isBlocking(): boolean {
    return (
      this.state === 'block_stand' ||
      this.state === 'block_crouch' ||
      this.state === 'up_block' ||
      this.state === 'flawless_block'
    );
  }

  public isInFlawlessWindow(): boolean {
    return this.blockPressAge <= FLAWLESS_BLOCK_WINDOW;
  }

  public canUseFatalBlow(): boolean {
    return (
      !this.fatalBlowUsed &&
      this.fatalBlowCooldown <= 0 &&
      this.health > 0 &&
      this.health / this.maxHealth <= FATAL_BLOW_HP_RATIO
    );
  }

  public addMeter(amount: number): void {
    this.superMeter = Math.max(0, Math.min(MAX_SUPER_METER, this.superMeter + amount));
  }

  public spendMeter(amount: number): boolean {
    if (this.superMeter < amount) return false;
    this.superMeter -= amount;
    return true;
  }

  public getPushbox(): Box {
    return getPushbox(this.x, this.y);
  }

  public getHurtbox(): Box {
    return getHurtbox(this.x, this.y, this.isCrouching());
  }

  public getActiveHitbox(): Box | null {
    if (
      (this.state !== 'attack' && this.state !== 'fatal_blow') ||
      !this.currentMove ||
      !this.currentMove.hitbox
    ) {
      return null;
    }
    const m = this.currentMove;
    const hb = m.hitbox;
    if (!hb) return null;
    if (this.moveFrame >= m.startup && this.moveFrame < m.startup + m.active) {
      return getWorldHitbox(this.x, this.y, this.facing, hb);
    }
    return null;
  }

  public getCurrentPose(): PoseName {
    if (this.state === 'attack' || this.state === 'fatal_blow' || this.state === 'taunt') {
      return this.currentMove?.pose ?? 'punch';
    }
    if (this.state === 'crouch' || this.state === 'knockdown' || this.state === 'wakeup') {
      return 'crouch';
    }
    if (
      this.state === 'block_stand' ||
      this.state === 'block_crouch' ||
      this.state === 'up_block' ||
      this.state === 'flawless_block' ||
      this.state === 'parry'
    ) {
      return 'block';
    }
    if (
      this.state === 'hitstun' ||
      this.state === 'launch' ||
      this.state === 'dizzy' ||
      this.state === 'thrown' ||
      this.state === 'fatality_victim' ||
      this.state === 'defeat'
    ) {
      return 'hurt';
    }
    if (this.state === 'victory' || this.state === 'fatality_perform') {
      return 'special';
    }
    return 'idle';
  }

  public startMove(move: MoveData): void {
    this.state = move.category === 'fatal_blow' ? 'fatal_blow' : move.category === 'taunt' ? 'taunt' : 'attack';
    this.stateFrame = 0;
    this.currentMove = move;
    this.moveFrame = 0;
    this.moveHasHit = false;
    this.moveHitCount = 0;
    this.moveMultiHitTimer = 0;
    this.moveSpecialFired = false;
    this.queuedFollowUp = null;
    if (move.invincibleFrames) {
      this.invincibleFrames = Math.max(this.invincibleFrames, move.invincibleFrames);
    }
    if (move.specialEffect === 'parry_matrix' || move.specialEffect === 'parry_vogue') {
      this.state = 'parry';
      this.parryActiveFrames = move.active;
    }
    if (this.isGrounded() && move.specialEffect !== 'runway_dash' && move.specialEffect !== 'runway_dash_ex') {
      this.vx *= 0.25;
    }
  }

  public canAct(): boolean {
    return (
      this.state === 'idle' ||
      this.state === 'walk_fwd' ||
      this.state === 'walk_back' ||
      this.state === 'crouch' ||
      this.state === 'dash_fwd' ||
      this.state === 'dash_back' ||
      this.state === 'block_stand' ||
      this.state === 'block_crouch'
    );
  }

  /**
   * Attempts to resolve a special move from the 8-frame input buffer.
   */
  public resolveSpecialMove(exHeld: boolean): MoveData | null {
    const buf = this.inputBuffer;
    const grounded = this.isGrounded();
    const canEx = exHeld && this.superMeter >= 100;

    if (this.id === 'bob') {
      if (!grounded && buf.hasMotion('qcf') && buf.wasPressed('k1')) {
        return this.def.moves['aerial_dive'];
      }
      if (!grounded) return null;

      if (buf.hasMotion('bf') && buf.wasPressed('p1')) {
        return canEx ? this.def.moves['palm_flurry_ex'] : this.def.moves['palm_flurry'];
      }
      if (buf.hasMotion('qcb') && buf.wasPressed('k1')) {
        return canEx ? this.def.moves['glitch_teleport_ex'] : this.def.moves['glitch_teleport'];
      }
      if (buf.hasMotion('qcf') && buf.wasPressed('p2')) {
        return canEx ? this.def.moves['eggplant_toss_ex'] : this.def.moves['eggplant_toss'];
      }
      if (buf.hasMotion('qcb') && buf.wasPressed('p2')) {
        return this.def.moves['clone_grapple'];
      }
      if (buf.hasMotion('qcb') && buf.wasPressed('k2')) {
        return this.def.moves['bullet_lean'];
      }
    } else {
      // Flamboyant Cory
      if (buf.hasMotion('qcf') && buf.wasPressed('k1')) {
        return this.def.moves['air_twirl'];
      }
      if (!grounded) return null;

      if (buf.hasMotion('qcf') && buf.wasPressed('p1')) {
        return canEx ? this.def.moves['glitter_bomb_ex'] : this.def.moves['glitter_bomb'];
      }
      if (buf.hasMotion('bf') && buf.wasPressed('k1')) {
        return canEx ? this.def.moves['runway_dash_ex'] : this.def.moves['runway_dash'];
      }
      if (buf.hasMotion('qcb') && buf.wasPressed('p2')) {
        return this.def.moves['disco_drop'];
      }
      if (buf.hasMotion('qcb') && buf.wasPressed('k2')) {
        return this.def.moves['vogue_parry'];
      }
      if (buf.hasMotion('bf') && buf.wasPressed('p2')) {
        return this.def.moves['boa_whip'];
      }
    }

    return null;
  }

  public updatePhysicsAndTimers(frame: number, input: InputState, opponentX: number, allowControl: boolean): void {
    // Trail health smoothly catches up
    if (this.trailHealth > this.health) {
      this.trailHealth = Math.max(this.health, this.trailHealth - 3.2);
    } else {
      this.trailHealth = this.health;
    }

    // Update battle damage ratio
    this.battleDamage = Math.max(0, Math.min(1, 1 - this.health / this.maxHealth));

    // Fade afterimages
    for (let i = this.afterimages.length - 1; i >= 0; i--) {
      this.afterimages[i].alpha -= 0.09;
      if (this.afterimages[i].alpha <= 0) {
        this.afterimages.splice(i, 1);
      }
    }

    if (this.invincibleFrames > 0) this.invincibleFrames--;
    if (this.hitFlashFrames > 0) this.hitFlashFrames--;
    if (this.fatalBlowCooldown > 0) this.fatalBlowCooldown--;
    if (this.upBlockTimer > 0) this.upBlockTimer--;
    if (this.restrainedFrames > 0) this.restrainedFrames--;

    // Push input into 8-frame buffer
    const buffered = this.inputBuffer.push(frame, allowControl ? input : {
      left: false, right: false, up: false, down: false,
      p1: false, p2: false, k1: false, k2: false,
      block: false, ex: false, fatalBlow: false, taunt: false,
    }, this.facing);

    if (buffered.pressed.block) {
      this.blockPressAge = 0;
    } else if (buffered.held.block) {
      this.blockPressAge = Math.min(99, this.blockPressAge + 1);
    } else {
      this.blockPressAge = 99;
    }

    this.stateFrame++;

    // Auto-facing when grounded and idle/walking/crouching/blocking
    if (
      this.isGrounded() &&
      (this.state === 'idle' ||
        this.state === 'walk_fwd' ||
        this.state === 'walk_back' ||
        this.state === 'crouch' ||
        this.state === 'block_stand' ||
        this.state === 'block_crouch')
    ) {
      if (Math.abs(opponentX - this.x) > 8) {
        this.facing = opponentX >= this.x ? 1 : -1;
      }
    }

    // State machine tick
    switch (this.state) {
      case 'hitstun':
      case 'flawless_block':
      case 'up_block':
        this.stunFrames--;
        this.vx *= 0.84;
        if (this.stunFrames <= 0 && this.restrainedFrames <= 0) {
          this.state = this.isGrounded() ? 'idle' : 'jump';
          this.stateFrame = 0;
          this.comboHitsTaken = 0;
          this.juggleHitsTaken = 0;
        }
        break;

      case 'launch':
        this.vy += GRAVITY * getJuggleGravityMultiplier(this.juggleHitsTaken);
        this.vy = Math.min(this.vy, MAX_FALL_SPEED);
        if (this.y + this.vy >= GROUND_Y && this.vy > 0) {
          this.y = GROUND_Y;
          this.vy = 0;
          this.vx *= 0.4;
          this.state = 'knockdown';
          this.stateFrame = 0;
          this.knockdownFrames = 26;
          this.comboHitsTaken = 0;
          this.juggleHitsTaken = 0;
        }
        break;

      case 'knockdown':
        this.vx *= 0.8;
        this.knockdownFrames--;
        if (allowControl && this.knockdownFrames <= 8 && this.knockdownFrames > 0) {
          // Wakeup Roll (1 bar) or Armored Get-Up Kick (1 bar)
          if (buffered.held.ex && (buffered.dir === 6 || buffered.dir === 4) && this.spendMeter(100)) {
            const rollDir = buffered.dir === 6 ? this.facing : -this.facing;
            this.startMove(this.def.moves['wakeup_roll']);
            this.vx = rollDir * 14;
            break;
          }
          if (buffered.held.up && buffered.pressed.k1 && this.spendMeter(100)) {
            this.startMove(this.def.moves['wakeup_kick']);
            break;
          }
        }
        if (this.knockdownFrames <= 0) {
          this.state = 'wakeup';
          this.stateFrame = 0;
          this.invincibleFrames = 10;
        }
        break;

      case 'wakeup':
        this.vx *= 0.8;
        if (this.stateFrame >= 10) {
          this.state = 'idle';
          this.stateFrame = 0;
        }
        break;

      case 'dash_fwd':
      case 'dash_back':
        if (this.stateFrame % 3 === 0) {
          this.afterimages.push({
            x: this.x,
            y: this.y,
            facing: this.facing,
            pose: 'idle',
            alpha: 0.45,
            tint: this.id === 'bob' ? 0x00ff7f : 0xff2ec4,
          });
        }
        if (this.stateFrame >= 11) {
          this.vx *= 0.3;
          this.state = 'idle';
          this.stateFrame = 0;
        }
        break;

      case 'parry':
        this.moveFrame++;
        this.vx *= 0.8;
        if (this.currentMove) {
          const total = this.currentMove.startup + this.currentMove.active + this.currentMove.recovery;
          if (this.moveFrame >= total) {
            this.currentMove = null;
            this.state = 'idle';
            this.stateFrame = 0;
          }
        }
        break;

      case 'attack':
      case 'fatal_blow':
      case 'taunt':
        this.tickActiveMove(buffered, allowControl);
        break;

      case 'dizzy':
      case 'victory':
      case 'defeat':
      case 'fatality_perform':
      case 'fatality_victim':
      case 'thrown':
        this.vx *= 0.82;
        if (!this.isGrounded()) {
          this.vy += GRAVITY;
        }
        break;

      default:
        // Neutral / Movement / Blocking / Jumping
        if (allowControl) {
          this.handleControlInput(buffered);
        } else {
          this.vx *= 0.78;
          if (this.isGrounded() && this.state !== 'idle') {
            this.state = 'idle';
          }
        }
        break;
    }

    // Apply velocity & gravity
    if (!this.isGrounded() && this.state !== 'launch') {
      this.vy += GRAVITY;
      this.vy = Math.min(this.vy, MAX_FALL_SPEED);
    }

    this.x += this.vx;
    this.y += this.vy;

    // Ground landing
    if (this.y >= GROUND_Y) {
      this.y = GROUND_Y;
      if (this.vy > 0) {
        this.vy = 0;
        if (this.state === 'jump' || (this.state === 'attack' && this.currentMove?.airOnly)) {
          this.state = 'idle';
          this.currentMove = null;
          this.vx *= 0.3;
        }
      }
    }

    // Stage wall clamp
    if (this.x < STAGE_LEFT) {
      this.x = STAGE_LEFT;
      if (this.vx < 0) this.vx = 0;
    } else if (this.x > STAGE_RIGHT) {
      this.x = STAGE_RIGHT;
      if (this.vx > 0) this.vx = 0;
    }
  }

  private tickActiveMove(buffered: { held: InputState; pressed: Record<string, boolean> }, allowControl: boolean): void {
    const move = this.currentMove;
    if (!move) {
      this.state = 'idle';
      return;
    }

    this.moveFrame++;

    // Special movement effects during moves
    if (move.specialEffect === 'runway_dash' || move.specialEffect === 'runway_dash_ex') {
      if (this.moveFrame >= move.startup - 2 && this.moveFrame < move.startup + move.active) {
        this.vx = this.facing * (move.specialEffect === 'runway_dash_ex' ? 17 : 14);
        if (this.moveFrame % 2 === 0) {
          this.afterimages.push({
            x: this.x,
            y: this.y,
            facing: this.facing,
            pose: move.pose,
            alpha: 0.55,
            tint: 0xff2ec4,
          });
        }
      } else {
        this.vx *= 0.78;
      }
    } else if (move.specialEffect === 'aerial_dive') {
      if (this.moveFrame >= move.startup) {
        this.vx = this.facing * 12;
        this.vy = 11;
      }
    } else if (move.specialEffect === 'air_twirl') {
      if (this.moveFrame === move.startup) {
        this.vy = -14.5;
        this.vx = this.facing * 6;
      }
    } else if (move.specialEffect === 'wakeup_roll') {
      this.vx *= 0.94;
    } else if (this.isGrounded()) {
      this.vx *= 0.8;
    }

    // Dial-a-combo queuing during active/hit window
    if (allowControl && move.followUps) {
      const checkBtn = (key: '1' | '2' | '3' | '4', pressedKey: 'p1' | 'p2' | 'k1' | 'k2') => {
        if (move.followUps?.[key] && this.inputBuffer.wasPressed(pressedKey, 6)) {
          this.queuedFollowUp = move.followUps[key];
        }
      };
      checkBtn('1', 'p1');
      checkBtn('2', 'p2');
      checkBtn('3', 'k1');
      checkBtn('4', 'k2');
    }

    // Execute queued dial-a-combo follow-up right after active frames (or on hit!)
    if (this.queuedFollowUp && this.moveFrame >= move.startup + move.active) {
      const nextMove = this.def.moves[this.queuedFollowUp];
      if (nextMove) {
        this.startMove(nextMove);
        return;
      }
    }

    // Special cancel window: if move is cancellable and has connected, allow special cancel
    if (allowControl && move.cancellable && this.moveHasHit && this.moveFrame >= move.startup) {
      const sp = this.resolveSpecialMove(buffered.held.ex);
      if (sp) {
        if (!sp.meterCost || this.spendMeter(sp.meterCost)) {
          this.startMove(sp);
          return;
        }
      }
    }

    const total = move.startup + move.active + move.recovery;
    if (this.moveFrame >= total) {
      this.currentMove = null;
      this.state = this.isGrounded() ? 'idle' : 'jump';
      this.stateFrame = 0;
    }
  }

  private handleControlInput(buffered: { dir: number; held: InputState; pressed: Record<string, boolean> }): void {
    const { dir, held, pressed } = buffered;
    const grounded = this.isGrounded();

    // 1. Fatal Blow (HP <= 30%, once per match)
    if (grounded && pressed.fatalBlow && this.canUseFatalBlow()) {
      this.startMove(this.def.moves['fatal_blow']);
      return;
    }

    // 2. Throw (1+3 or EX button alone when neutral)
    if (
      grounded &&
      ((pressed.p1 && held.k1) || (pressed.k1 && held.p1) || (pressed.ex && !held.p1 && !held.p2 && !held.k1 && !held.k2))
    ) {
      this.startMove(this.def.moves['throw']);
      return;
    }

    // 3. Special moves (check before normals!)
    const special = this.resolveSpecialMove(held.ex);
    if (special) {
      if (!special.meterCost || this.spendMeter(special.meterCost)) {
        this.startMove(special);
        return;
      }
    }

    // 4. Taunt
    if (grounded && pressed.taunt) {
      const tauntMove = this.id === 'bob' ? this.def.moves['glasses_taunt'] : this.def.moves['spotlight_taunt'];
      if (tauntMove) {
        this.startMove(tauntMove);
        return;
      }
    }

    // 5. Air attacks
    if (!grounded) {
      if (pressed.p1 || pressed.p2) {
        this.startMove(this.def.moves['j_1']);
        return;
      }
      if (pressed.k1 || pressed.k2) {
        this.startMove(this.def.moves['j_3']);
        return;
      }
      return;
    }

    // 6. Dedicated Block Button (+ Up-Block when Up + Block!)
    if (held.block) {
      this.vx *= 0.6;
      if (held.up && (pressed.block || this.upBlockTimer > 0)) {
        this.state = 'up_block';
        if (pressed.block) this.upBlockTimer = UP_BLOCK_WINDOW;
      } else if (held.down) {
        this.state = 'block_crouch';
      } else {
        this.state = 'block_stand';
      }
      return;
    }

    // 7. Grounded normals (standing, back+2 overhead, crouching)
    if (held.down) {
      if (pressed.p1) { this.startMove(this.def.moves['d_1']); return; }
      if (pressed.p2) { this.startMove(this.def.moves['d_2']); return; }
      if (pressed.k1) { this.startMove(this.def.moves['d_3']); return; }
      if (pressed.k2) { this.startMove(this.def.moves['d_4']); return; }
    } else {
      if (pressed.p2 && dir === 4 && this.def.moves['b_2']) {
        this.startMove(this.def.moves['b_2']);
        return;
      }
      if (pressed.p1) { this.startMove(this.def.moves['n_1']); return; }
      if (pressed.p2) { this.startMove(this.def.moves['n_2']); return; }
      if (pressed.k1) { this.startMove(this.def.moves['n_3']); return; }
      if (pressed.k2) { this.startMove(this.def.moves['n_4']); return; }
    }

    // 8. Dash double-taps
    if (this.inputBuffer.hasMotion('dash_fwd', 12)) {
      this.state = 'dash_fwd';
      this.stateFrame = 0;
      this.vx = this.facing * this.def.dashSpeed;
      return;
    }
    if (this.inputBuffer.hasMotion('dash_back', 12)) {
      this.state = 'dash_back';
      this.stateFrame = 0;
      this.vx = -this.facing * (this.def.dashSpeed * 0.9);
      return;
    }

    // 9. Jump
    if (held.up) {
      this.state = 'jump';
      this.stateFrame = 0;
      this.vy = this.def.jumpVelY;
      const moveX = (held.right ? 1 : 0) - (held.left ? 1 : 0);
      this.vx = moveX * this.def.jumpVelX;
      return;
    }

    // 10. Crouch
    if (held.down) {
      this.state = 'crouch';
      this.vx *= 0.65;
      return;
    }

    // 11. Walk Forward / Back / Idle
    if (dir === 6) {
      this.state = 'walk_fwd';
      this.vx = this.facing * this.def.walkFwdSpeed;
    } else if (dir === 4) {
      this.state = 'walk_back';
      this.vx = -this.facing * this.def.walkBackSpeed;
    } else {
      this.state = 'idle';
      this.vx *= 0.7;
    }
  }
}
