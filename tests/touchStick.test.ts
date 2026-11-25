import { describe, expect, it } from 'vitest';
import { emptyInput } from '../src/engine/InputBuffer';
import {
  STICK_DEADZONE,
  STICK_KNOB_TRAVEL,
  applyDirectionsToInput,
  axisFromPointer,
  axisToDirections,
  clampToUnit,
} from '../src/ui/TouchStick';

describe('TouchStick (Riley Wheel Brawl circle joystick)', () => {
  it('keeps the RWB dead zone and knob travel constants', () => {
    expect(STICK_DEADZONE).toBe(0.23);
    expect(STICK_KNOB_TRAVEL).toBe(0.55);
  });

  it('clamps deflections to the unit circle but leaves inner positions alone', () => {
    expect(clampToUnit(0.5, 0)).toEqual({ x: 0.5, y: 0 });
    const edge = clampToUnit(3, 0);
    expect(edge.x).toBeCloseTo(1);
    expect(edge.y).toBe(0);
    const diag = clampToUnit(4, 4);
    expect(Math.hypot(diag.x, diag.y)).toBeCloseTo(1);
    expect(diag.x).toBeCloseTo(Math.SQRT1_2);
    expect(diag.y).toBeCloseTo(Math.SQRT1_2);
  });

  it('maps analog axes to 8-way directions with a dead zone', () => {
    expect(axisToDirections({ x: 0, y: 0 })).toEqual({ left: false, right: false, up: false, down: false });
    expect(axisToDirections({ x: 0.22, y: 0 })).toEqual({ left: false, right: false, up: false, down: false });
    expect(axisToDirections({ x: 0.24, y: 0 })).toEqual({ left: false, right: true, up: false, down: false });
    expect(axisToDirections({ x: -0.5, y: 0 })).toEqual({ left: true, right: false, up: false, down: false });
    expect(axisToDirections({ x: 0, y: -0.5 })).toEqual({ left: false, right: false, up: true, down: false });
    expect(axisToDirections({ x: 0, y: 0.5 })).toEqual({ left: false, right: false, up: false, down: true });
    // Diagonals needed for specials (QCF = down then down-forward then forward)
    expect(axisToDirections({ x: 0.6, y: 0.6 })).toEqual({ left: false, right: true, up: false, down: true });
    expect(axisToDirections({ x: -0.6, y: 0.6 })).toEqual({ left: true, right: false, up: false, down: true });
    expect(axisToDirections({ x: 0.6, y: -0.6 })).toEqual({ left: false, right: true, up: true, down: false });
    expect(axisToDirections({ x: -0.6, y: -0.6 })).toEqual({ left: true, right: false, up: true, down: false });
  });

  it('converts a pointer on the stick into axis + knob offset', () => {
    const rect = { left: 0, top: 0, width: 100 }; // center at (50, 50), radius 50
    const center = axisFromPointer(50, 50, rect);
    expect(center.axis).toEqual({ x: 0, y: 0 });
    expect(center.knobX).toBe(0);
    expect(center.knobY).toBe(0);

    const right = axisFromPointer(100, 50, rect);
    expect(right.axis.x).toBeCloseTo(1);
    expect(right.axis.y).toBeCloseTo(0);
    expect(right.knobX).toBeCloseTo(50 * STICK_KNOB_TRAVEL);
    expect(right.knobY).toBeCloseTo(0);

    // Past the rim is still clamped to the unit circle
    const past = axisFromPointer(200, 50, rect);
    expect(past.axis.x).toBeCloseTo(1);
    expect(past.knobX).toBeCloseTo(50 * STICK_KNOB_TRAVEL);
  });

  it('writes only movement flags onto the shared touch input state', () => {
    const input = emptyInput();
    input.p1 = true;
    applyDirectionsToInput(input, axisToDirections({ x: 1, y: 0.7 }));
    expect(input.right).toBe(true);
    expect(input.down).toBe(true);
    expect(input.left).toBe(false);
    expect(input.up).toBe(false);
    expect(input.p1).toBe(true);
  });
});
