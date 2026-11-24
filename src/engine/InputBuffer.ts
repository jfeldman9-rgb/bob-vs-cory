import { BufferedInputFrame, InputState } from '../types/game';
import { INPUT_BUFFER_FRAMES } from './constants';

export function emptyInput(): InputState {
  return {
    left: false,
    right: false,
    up: false,
    down: false,
    p1: false,
    p2: false,
    k1: false,
    k2: false,
    block: false,
    ex: false,
    fatalBlow: false,
    taunt: false,
  };
}

/**
 * Compute numpad notation direction (1-9) relative to fighter facing (1 = right, -1 = left).
 * 6 = forward, 4 = back, 2 = down, 8 = up, 5 = neutral.
 */
export function computeRelativeDir(input: InputState, facing: 1 | -1): number {
  const rawX = (input.right ? 1 : 0) - (input.left ? 1 : 0);
  const relX = rawX * facing; // +1 = forward, -1 = back
  const rawY = (input.up ? 1 : 0) - (input.down ? 1 : 0); // +1 = up, -1 = down

  if (rawY < 0) {
    if (relX < 0) return 1;
    if (relX > 0) return 3;
    return 2;
  }
  if (rawY > 0) {
    if (relX < 0) return 7;
    if (relX > 0) return 9;
    return 8;
  }
  if (relX < 0) return 4;
  if (relX > 0) return 6;
  return 5;
}

export class InputBuffer {
  public readonly history: BufferedInputFrame[] = [];
  private readonly maxHistory = 45; // 45 frames for Fatality sequences, 8 frames for combat buffer
  private prevHeld: InputState = emptyInput();

  public reset(): void {
    this.history.length = 0;
    this.prevHeld = emptyInput();
  }

  public push(frame: number, current: InputState, facing: 1 | -1): BufferedInputFrame {
    const dir = computeRelativeDir(current, facing);
    const pressed = {
      p1: current.p1 && !this.prevHeld.p1,
      p2: current.p2 && !this.prevHeld.p2,
      k1: current.k1 && !this.prevHeld.k1,
      k2: current.k2 && !this.prevHeld.k2,
      block: current.block && !this.prevHeld.block,
      ex: current.ex && !this.prevHeld.ex,
      fatalBlow: current.fatalBlow && !this.prevHeld.fatalBlow,
      taunt: current.taunt && !this.prevHeld.taunt,
    };

    const entry: BufferedInputFrame = {
      frame,
      dir,
      pressed,
      held: { ...current },
    };

    this.history.push(entry);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
    this.prevHeld = { ...current };
    return entry;
  }

  public latest(): BufferedInputFrame | null {
    return this.history.length > 0 ? this.history[this.history.length - 1] : null;
  }

  /**
   * Was a button pressed within the last `windowFrames` (default 8-frame input buffer)?
   */
  public wasPressed(
    button: keyof BufferedInputFrame['pressed'],
    windowFrames: number = INPUT_BUFFER_FRAMES
  ): boolean {
    const start = Math.max(0, this.history.length - windowFrames);
    for (let i = this.history.length - 1; i >= start; i--) {
      if (this.history[i].pressed[button]) return true;
    }
    return false;
  }

  /**
   * Check if a directional motion sequence was entered within `windowFrames`.
   * Supports forgiving MK-style motion checks (e.g., QCF = Down then Forward, QCB = Down then Back, BF = Back then Forward).
   */
  public hasMotion(
    motion: 'qcf' | 'qcb' | 'bf' | 'dash_fwd' | 'dash_back',
    windowFrames: number = 14
  ): boolean {
    const start = Math.max(0, this.history.length - windowFrames);
    if (this.history.length === 0) return false;

    const dirs: number[] = [];
    for (let i = start; i < this.history.length; i++) {
      dirs.push(this.history[i].dir);
    }

    if (motion === 'qcf') {
      // Down (1,2,3) followed by Forward (3,6,9)
      let sawDown = false;
      for (const d of dirs) {
        if (d === 2 || d === 1 || d === 3) sawDown = true;
        if (sawDown && (d === 6 || d === 3 || d === 9)) {
          // Ensure actual forward 6 or diagonal 3 after pure 2
          if (d === 6 || d === 9) return true;
        }
      }
      return false;
    }

    if (motion === 'qcb') {
      // Down (1,2,3) followed by Back (4,7)
      let sawDown = false;
      for (const d of dirs) {
        if (d === 2 || d === 1 || d === 3) sawDown = true;
        if (sawDown && (d === 4 || d === 7)) return true;
      }
      return false;
    }

    if (motion === 'bf') {
      // Back (1,4,7) followed by Forward (3,6,9)
      let sawBack = false;
      for (const d of dirs) {
        if (d === 4 || d === 1 || d === 7) sawBack = true;
        if (sawBack && (d === 6 || d === 3 || d === 9)) return true;
      }
      return false;
    }

    if (motion === 'dash_fwd') {
      // 6 -> neutral(5/2/8) -> 6 within window, ending on fresh press of 6
      const last = dirs[dirs.length - 1];
      const prev = dirs.length >= 2 ? dirs[dirs.length - 2] : 5;
      if (last !== 6 || prev === 6) return false;
      let stage = 0; // 0: need first 6, 1: need non-6
      for (let i = 0; i < dirs.length - 1; i++) {
        if (stage === 0 && dirs[i] === 6) stage = 1;
        else if (stage === 1 && dirs[i] !== 6) return true;
      }
      return false;
    }

    if (motion === 'dash_back') {
      const last = dirs[dirs.length - 1];
      const prev = dirs.length >= 2 ? dirs[dirs.length - 2] : 5;
      if (last !== 4 || prev === 4) return false;
      let stage = 0;
      for (let i = 0; i < dirs.length - 1; i++) {
        if (stage === 0 && dirs[i] === 4) stage = 1;
        else if (stage === 1 && dirs[i] !== 4) return true;
      }
      return false;
    }

    return false;
  }

  /**
   * Check a Fatality input sequence like ['F', 'D', 'F', '2'] or ['B', 'D', 'B', '4']
   * within a generous 42-frame window.
   */
  public hasFatalitySequence(sequence: string[], windowFrames: number = 42): boolean {
    if (sequence.length === 0 || this.history.length === 0) return false;
    const start = Math.max(0, this.history.length - windowFrames);

    // Final token is the button ('1','2','3','4') — must be freshly pressed in last 6 frames
    const lastToken = sequence[sequence.length - 1];
    const btnMap: Record<string, keyof BufferedInputFrame['pressed']> = {
      '1': 'p1',
      '2': 'p2',
      '3': 'k1',
      '4': 'k2',
    };
    const finalBtn = btnMap[lastToken];
    if (!finalBtn || !this.wasPressed(finalBtn, 6)) return false;

    const dirTokens = sequence.slice(0, -1);
    let tokenIdx = 0;
    let lastMatchedDir = -1;

    for (let i = start; i < this.history.length; i++) {
      const d = this.history[i].dir;
      const needed = dirTokens[tokenIdx];
      let matched = false;
      if (needed === 'F' && (d === 6 || d === 3 || d === 9)) matched = true;
      else if (needed === 'B' && (d === 4 || d === 1 || d === 7)) matched = true;
      else if (needed === 'D' && (d === 2 || d === 1 || d === 3)) matched = true;
      else if (needed === 'U' && (d === 8 || d === 7 || d === 9)) matched = true;

      if (matched && d !== lastMatchedDir) {
        tokenIdx++;
        lastMatchedDir = d;
        if (tokenIdx >= dirTokens.length) return true;
      } else if (!matched && d === 5) {
        lastMatchedDir = 5;
      }
    }

    return false;
  }
}

/**
 * Local keyboard + dual Gamepad + mobile Touch input router for P1 and P2.
 */
export class InputRouter {
  private keysDown = new Set<string>();
  public touchState: InputState = emptyInput();
  private boundKeyDown: (e: KeyboardEvent) => void;
  private boundKeyUp: (e: KeyboardEvent) => void;
  private boundBlur: () => void;

  constructor() {
    this.boundKeyDown = (e: KeyboardEvent) => {
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)
      ) {
        e.preventDefault();
      }
      this.keysDown.add(e.code);
    };
    this.boundKeyUp = (e: KeyboardEvent) => {
      this.keysDown.delete(e.code);
    };
    this.boundBlur = () => {
      this.keysDown.clear();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.boundKeyDown);
      window.addEventListener('keyup', this.boundKeyUp);
      window.addEventListener('blur', this.boundBlur);
    }
  }

  public destroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.boundKeyDown);
      window.removeEventListener('keyup', this.boundKeyUp);
      window.removeEventListener('blur', this.boundBlur);
    }
  }

  public pollPlayer(playerIndex: 0 | 1, singlePlayerMode: boolean): InputState {
    const state = emptyInput();
    const k = this.keysDown;

    if (playerIndex === 0) {
      // P1 Keyboard: WASD + U/I/J/K (or Z/X/C/V), Space/L = Block, O/E = EX/Throw, F = Fatal Blow, T = Taunt
      state.left = k.has('KeyA') || (singlePlayerMode && k.has('ArrowLeft'));
      state.right = k.has('KeyD') || (singlePlayerMode && k.has('ArrowRight'));
      state.up = k.has('KeyW') || (singlePlayerMode && k.has('ArrowUp'));
      state.down = k.has('KeyS') || (singlePlayerMode && k.has('ArrowDown'));

      state.p1 = k.has('KeyU') || k.has('KeyZ');
      state.p2 = k.has('KeyI') || k.has('KeyX');
      state.k1 = k.has('KeyJ') || k.has('KeyC');
      state.k2 = k.has('KeyK') || k.has('KeyV');
      state.block = k.has('Space') || k.has('KeyL') || k.has('ShiftLeft');
      state.ex = k.has('KeyO') || k.has('KeyE');
      state.fatalBlow = k.has('KeyF') || k.has('KeyH');
      state.taunt = k.has('KeyT');

      // Merge touch controls for P1
      state.left ||= this.touchState.left;
      state.right ||= this.touchState.right;
      state.up ||= this.touchState.up;
      state.down ||= this.touchState.down;
      state.p1 ||= this.touchState.p1;
      state.p2 ||= this.touchState.p2;
      state.k1 ||= this.touchState.k1;
      state.k2 ||= this.touchState.k2;
      state.block ||= this.touchState.block;
      state.ex ||= this.touchState.ex;
      state.fatalBlow ||= this.touchState.fatalBlow;
      state.taunt ||= this.touchState.taunt;
    } else {
      // P2 Keyboard: Arrow keys + Numpad 4/5/1/2 (or Numpad 7/8/4/5) or , . / ;
      state.left = k.has('ArrowLeft');
      state.right = k.has('ArrowRight');
      state.up = k.has('ArrowUp');
      state.down = k.has('ArrowDown');

      state.p1 = k.has('Numpad4') || k.has('Numpad7') || k.has('BracketLeft');
      state.p2 = k.has('Numpad5') || k.has('Numpad8') || k.has('BracketRight');
      state.k1 = k.has('Numpad1') || k.has('Semicolon');
      state.k2 = k.has('Numpad2') || k.has('Quote');
      state.block = k.has('Numpad0') || k.has('ShiftRight') || k.has('Slash');
      state.ex = k.has('Numpad6') || k.has('Numpad9') || k.has('Backslash');
      state.fatalBlow = k.has('Numpad3') || k.has('Enter');
      state.taunt = k.has('NumpadMultiply') || k.has('Minus');
    }

    // Dual Gamepad support (Standard mapping: Xbox/PS/Steam Deck)
    if (typeof navigator !== 'undefined' && navigator.getGamepads) {
      const pads = navigator.getGamepads();
      const pad = pads[playerIndex];
      if (pad && pad.connected) {
        const axX = pad.axes[0] ?? 0;
        const axY = pad.axes[1] ?? 0;
        const b = (idx: number) => Boolean(pad.buttons[idx]?.pressed);
        state.left ||= axX < -0.35 || b(14);
        state.right ||= axX > 0.35 || b(15);
        state.up ||= axY < -0.45 || b(12);
        state.down ||= axY > 0.35 || b(13);

        // MK Standard layout: X/Square = 1, Y/Triangle = 2, A/Cross = 3, B/Circle = 4
        state.p1 ||= b(2);
        state.p2 ||= b(3);
        state.k1 ||= b(0);
        state.k2 ||= b(1);
        state.block ||= b(5) || b(7); // RB / RT
        state.ex ||= b(4); // LB
        state.fatalBlow ||= (b(6) && b(7)) || b(8); // L2+R2 or Select
        state.taunt ||= b(10) || b(11);
      }
    }

    return state;
  }
}
