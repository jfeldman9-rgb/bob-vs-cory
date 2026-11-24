import { AIDifficulty, InputState } from '../types/game';
import { CombatEngine } from './CombatEngine';
import { emptyInput } from './InputBuffer';

interface AIProfile {
  reactionInterval: number;
  blockChance: number;
  comboChance: number;
  specialChance: number;
  antiAirChance: number;
  fatalBlowChance: number;
  aggression: number;
}

const PROFILES: Record<AIDifficulty, AIProfile> = {
  easy: {
    reactionInterval: 20,
    blockChance: 0.22,
    comboChance: 0.25,
    specialChance: 0.14,
    antiAirChance: 0.15,
    fatalBlowChance: 0.35,
    aggression: 0.38,
  },
  normal: {
    reactionInterval: 11,
    blockChance: 0.48,
    comboChance: 0.55,
    specialChance: 0.32,
    antiAirChance: 0.42,
    fatalBlowChance: 0.65,
    aggression: 0.58,
  },
  hard: {
    reactionInterval: 6,
    blockChance: 0.72,
    comboChance: 0.8,
    specialChance: 0.52,
    antiAirChance: 0.72,
    fatalBlowChance: 0.85,
    aggression: 0.76,
  },
  'very-hard': {
    reactionInterval: 3,
    blockChance: 0.88,
    comboChance: 0.92,
    specialChance: 0.68,
    antiAirChance: 0.88,
    fatalBlowChance: 0.95,
    aggression: 0.88,
  },
};

export class AIController {
  private difficulty: AIDifficulty;
  private decisionCooldown = 0;
  private currentPlan: 'idle' | 'approach' | 'retreat' | 'block' | 'crouch_block' | 'jump_in' = 'idle';
  private macroQueue: InputState[] = [];

  constructor(difficulty: AIDifficulty) {
    this.difficulty = difficulty;
  }

  public setDifficulty(difficulty: AIDifficulty): void {
    this.difficulty = difficulty;
  }

  public computeInput(engine: CombatEngine, playerIndex: 0 | 1): InputState {
    if (this.macroQueue.length > 0) {
      return this.macroQueue.shift()!;
    }

    const me = engine.fighters[playerIndex];
    const opp = engine.fighters[1 - playerIndex];
    const profile = PROFILES[this.difficulty];
    const input = emptyInput();

    const dx = opp.x - me.x;
    const dist = Math.abs(dx);
    const dirToOpp: 'left' | 'right' = dx >= 0 ? 'right' : 'left';
    const dirAway: 'left' | 'right' = dx >= 0 ? 'left' : 'right';

    // FINISH HIM! -> walk into fatality range and execute fatality or finisher
    if (engine.phase === 'finish_him' && engine.winnerIndex === playerIndex) {
      const cfg = me.def.fatality;
      if (dist < cfg.minDist + 20) {
        input[dirAway] = true;
      } else if (dist > cfg.maxDist - 20) {
        input[dirToOpp] = true;
      } else if (Math.random() < 0.15) {
        // Trigger fatality sequence macro!
        this.queueFatalityMacro(me.id, me.facing);
      }
      return input;
    }

    if (engine.phase !== 'fighting') {
      return input;
    }

    // Immediate defensive reaction to opponent attack or nearby projectile
    const incomingThreat =
      (opp.state === 'attack' && dist < 210) ||
      engine.projectiles.some((p) => p.ownerIndex !== playerIndex && Math.abs(p.x - me.x) < 190);

    if (incomingThreat && this.decisionCooldown <= 2) {
      if (Math.random() < profile.blockChance) {
        input.block = true;
        if (opp.currentMove?.height === 'low') {
          input.down = true;
        }
        return input;
      }
    }

    // Anti-air reaction when opponent jumps close
    if (!opp.isGrounded() && dist < 175 && me.isGrounded() && this.decisionCooldown <= 2) {
      if (Math.random() < profile.antiAirChance) {
        input.down = true;
        input.p2 = true; // Uppercut!
        this.decisionCooldown = profile.reactionInterval + 8;
        return input;
      }
    }

    // Fatal Blow opportunity when HP <= 30%
    if (me.canUseFatalBlow() && dist < 195 && me.isGrounded() && Math.random() < profile.fatalBlowChance * 0.08) {
      input.fatalBlow = true;
      this.decisionCooldown = 25;
      return input;
    }

    this.decisionCooldown--;
    if (this.decisionCooldown <= 0) {
      this.decisionCooldown = profile.reactionInterval + Math.floor(Math.random() * 6);
      this.chooseAction(dist, dirToOpp, dirAway, me.id, me.facing, me.superMeter >= 100, profile);
    }

    if (this.macroQueue.length > 0) {
      return this.macroQueue.shift()!;
    }

    if (this.currentPlan === 'approach') {
      input[dirToOpp] = true;
    } else if (this.currentPlan === 'retreat') {
      input[dirAway] = true;
    } else if (this.currentPlan === 'block') {
      input.block = true;
    } else if (this.currentPlan === 'crouch_block') {
      input.block = true;
      input.down = true;
    } else if (this.currentPlan === 'jump_in') {
      input.up = true;
      input[dirToOpp] = true;
      this.currentPlan = 'approach';
    }

    return input;
  }

  private chooseAction(
    dist: number,
    dirToOpp: 'left' | 'right',
    dirAway: 'left' | 'right',
    fighterId: 'bob' | 'cory',
    facing: 1 | -1,
    hasMeter: boolean,
    profile: AIProfile
  ): void {
    const r = Math.random();

    if (dist > 340) {
      // Far range: approach or throw projectile / teleport
      if (r < profile.specialChance) {
        this.queueMotionMacro('qcf', fighterId === 'bob' ? 'p2' : 'p1', facing, hasMeter && Math.random() < 0.4);
      } else if (r < profile.specialChance + 0.14 && fighterId === 'bob') {
        this.queueMotionMacro('qcb', 'k1', facing, hasMeter && Math.random() < 0.3); // Teleport
      } else if (r < profile.specialChance + 0.14 && fighterId === 'cory') {
        this.queueMotionMacro('qcb', 'p2', facing, false); // Disco Ball Drop
      } else {
        this.currentPlan = 'approach';
      }
      return;
    }

    if (dist > 165) {
      // Mid range: approach, lunge special, jump-in, or poke
      if (r < profile.specialChance * 0.85) {
        if (fighterId === 'bob') {
          this.queueMotionMacro('bf', 'p1', facing, hasMeter && Math.random() < 0.35);
        } else {
          this.queueMotionMacro('bf', 'k1', facing, hasMeter && Math.random() < 0.35);
        }
      } else if (r < profile.aggression) {
        this.currentPlan = Math.random() < 0.22 ? 'jump_in' : 'approach';
      } else {
        this.currentPlan = Math.random() < 0.5 ? 'block' : 'retreat';
      }
      return;
    }

    // Close range: dial-a-combo string, throw, sweep, or defensive block
    if (r < profile.comboChance * 0.65) {
      this.queueComboMacro();
    } else if (r < profile.comboChance * 0.85) {
      // Low sweep or overhead mixup
      const mix = emptyInput();
      if (Math.random() < 0.5) {
        mix.down = true;
        mix.k2 = true;
      } else {
        mix[dirAway] = true;
        mix.p2 = true;
      }
      this.macroQueue.push(mix);
    } else if (r < profile.aggression) {
      // Throw!
      const thr = emptyInput();
      thr.p1 = true;
      thr.k1 = true;
      this.macroQueue.push(thr);
    } else {
      this.currentPlan = Math.random() < 0.5 ? 'block' : 'retreat';
    }
  }

  private queueComboMacro(): void {
    const f1 = emptyInput(); f1.p1 = true;
    const f2 = emptyInput(); f2.p1 = true;
    const f3 = emptyInput(); f3.p2 = true;
    this.macroQueue.push(f1, emptyInput(), emptyInput(), emptyInput(), f2, emptyInput(), emptyInput(), emptyInput(), f3);
  }

  private queueMotionMacro(
    motion: 'qcf' | 'qcb' | 'bf',
    btn: 'p1' | 'p2' | 'k1' | 'k2',
    facing: 1 | -1,
    ex: boolean
  ): void {
    const fwd: 'right' | 'left' = facing === 1 ? 'right' : 'left';
    const back: 'right' | 'left' = facing === 1 ? 'left' : 'right';

    const s1 = emptyInput();
    const s2 = emptyInput();
    const s3 = emptyInput();

    if (motion === 'qcf') {
      s1.down = true;
      s2.down = true; s2[fwd] = true;
      s3[fwd] = true; s3[btn] = true; s3.ex = ex;
    } else if (motion === 'qcb') {
      s1.down = true;
      s2.down = true; s2[back] = true;
      s3[back] = true; s3[btn] = true; s3.ex = ex;
    } else {
      s1[back] = true;
      s2[fwd] = true;
      s3[fwd] = true; s3[btn] = true; s3.ex = ex;
    }

    this.macroQueue.push(s1, s2, s3);
  }

  private queueFatalityMacro(fighterId: 'bob' | 'cory', facing: 1 | -1): void {
    const fwd: 'right' | 'left' = facing === 1 ? 'right' : 'left';
    const back: 'right' | 'left' = facing === 1 ? 'left' : 'right';
    const dir = fighterId === 'bob' ? fwd : back;
    const btn: 'p2' | 'k2' = fighterId === 'bob' ? 'p2' : 'k2';

    const a = emptyInput(); a[dir] = true;
    const b = emptyInput(); b.down = true;
    const c = emptyInput(); c[dir] = true;
    const d = emptyInput(); d[btn] = true;

    this.macroQueue.push(a, emptyInput(), b, emptyInput(), c, emptyInput(), d);
  }
}
