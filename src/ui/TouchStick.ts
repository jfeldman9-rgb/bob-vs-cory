/**
 * Virtual circle joystick ported from Riley Wheel Brawl
 * (The Legend of Claudia: BDB's Awakening).
 *
 * Source of the "circle thingy": Riley Wheel Brawl (The Legend of Claudia:
 * BDB's Awakening) — index.html (#stick / #knob CSS + markup) and
 * src/input.js bindTouch() (0.23 dead zone, unit clamp, knob travel 0.55).
 *
 * Fixed base (not floating). Analog deflection is clamped to the unit circle,
 * then mapped to 8-way digital directions for the fighting-game input router
 * so quarter-circles and fatality paths (down, down-forward, forward, etc.) work.
 */
import { emptyInput } from '../engine/InputBuffer';
import { InputState } from '../types/game';

/** RWB dead zone: axis must exceed this (in unit-circle space) to register. */
export const STICK_DEADZONE = 0.23;

/** Knob travel as a fraction of the base radius (RWB uses 0.55). */
export const STICK_KNOB_TRAVEL = 0.55;

export interface StickAxis {
  x: number;
  y: number;
}

export interface StickDirections {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
}

export const NEUTRAL_AXIS: StickAxis = { x: 0, y: 0 };

export function clampToUnit(dx: number, dy: number): StickAxis {
  const m = Math.max(1, Math.hypot(dx, dy));
  return { x: dx / m, y: dy / m };
}

export function axisFromPointer(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number }
): { axis: StickAxis; knobX: number; knobY: number } {
  const radius = rect.width / 2;
  const rawX = (clientX - rect.left - radius) / radius;
  const rawY = (clientY - rect.top - radius) / radius;
  const axis = clampToUnit(rawX, rawY);
  return {
    axis,
    knobX: axis.x * radius * STICK_KNOB_TRAVEL,
    knobY: axis.y * radius * STICK_KNOB_TRAVEL,
  };
}

export function axisToDirections(
  axis: StickAxis,
  deadzone: number = STICK_DEADZONE
): StickDirections {
  return {
    left: axis.x < -deadzone,
    right: axis.x > deadzone,
    up: axis.y < -deadzone,
    down: axis.y > deadzone,
  };
}

export function applyDirectionsToInput(input: InputState, dirs: StickDirections): void {
  input.left = dirs.left;
  input.right = dirs.right;
  input.up = dirs.up;
  input.down = dirs.down;
}

export function bindVirtualStick(opts: {
  stick: HTMLElement;
  knob: HTMLElement;
  onAxis: (axis: StickAxis) => void;
}): () => void {
  const { stick, knob, onAxis } = opts;
  let stickId: number | null = null;
  const cleanups: Array<() => void> = [];

  const on = (
    el: EventTarget,
    event: string,
    fn: EventListener,
    options?: AddEventListenerOptions
  ) => {
    el.addEventListener(event, fn, options);
    cleanups.push(() => el.removeEventListener(event, fn, options));
  };

  const apply = (clientX: number, clientY: number) => {
    const { axis, knobX, knobY } = axisFromPointer(clientX, clientY, stick.getBoundingClientRect());
    knob.style.transform = `translate(${knobX}px, ${knobY}px)`;
    onAxis(axis);
  };

  const reset = () => {
    stickId = null;
    knob.style.transform = '';
    onAxis(NEUTRAL_AXIS);
  };

  const move = (e: Event) => {
    const ev = e as PointerEvent;
    if (ev.pointerId !== stickId) return;
    ev.preventDefault();
    apply(ev.clientX, ev.clientY);
  };

  on(stick, 'pointerdown', (e) => {
    const ev = e as PointerEvent;
    if (stickId !== null) return;
    ev.preventDefault();
    stickId = ev.pointerId;
    try {
      stick.setPointerCapture(ev.pointerId);
    } catch {
      /* synthetic playtest events may not allow capture */
    }
    apply(ev.clientX, ev.clientY);
  });
  on(stick, 'pointermove', move);
  const end = (e: Event) => {
    const ev = e as PointerEvent;
    if (ev.pointerId !== stickId) return;
    reset();
  };
  for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    on(stick, event, end);
  }

  return () => {
    reset();
    for (const fn of cleanups) fn();
  };
}

export function bindTouchButtons(
  root: ParentNode,
  touchState: InputState
): () => void {
  const cleanups: Array<() => void> = [];
  const on = (el: EventTarget, event: string, fn: EventListener) => {
    el.addEventListener(event, fn);
    cleanups.push(() => el.removeEventListener(event, fn));
  };

  root.querySelectorAll<HTMLElement>('[data-t]').forEach((btn) => {
    const key = btn.dataset.t as keyof InputState;
    if (!key) return;

    const down = (e: Event) => {
      const ev = e as PointerEvent;
      ev.preventDefault();
      try {
        btn.setPointerCapture(ev.pointerId);
      } catch {
        /* ignore */
      }
      (touchState as unknown as Record<string, boolean>)[key] = true;
      btn.classList.add('on');
    };
    const up = (e: Event) => {
      e.preventDefault();
      (touchState as unknown as Record<string, boolean>)[key] = false;
      btn.classList.remove('on');
    };
    on(btn, 'pointerdown', down);
    on(btn, 'pointerup', up);
    on(btn, 'pointercancel', up);
    on(btn, 'lostpointercapture', up);
  });

  const clearButtons = () => {
    root.querySelectorAll<HTMLElement>('[data-t].on').forEach((btn) => btn.classList.remove('on'));
    const dirs = { left: touchState.left, right: touchState.right, up: touchState.up, down: touchState.down };
    Object.assign(touchState, emptyInput(), dirs);
  };
  if (typeof window !== 'undefined') {
    on(window, 'blur', clearButtons);
    on(document, 'visibilitychange', () => {
      if (document.hidden) clearButtons();
    });
  }

  return () => {
    for (const fn of cleanups) fn();
  };
}
