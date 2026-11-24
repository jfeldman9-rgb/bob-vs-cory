import { describe, expect, it } from 'vitest';
import { computeRelativeDir, emptyInput, InputBuffer } from '../src/engine/InputBuffer';

describe('InputBuffer & Motion Parser', () => {
  it('computes relative numpad direction for both left and right facing', () => {
    const rightInput = { ...emptyInput(), right: true };
    expect(computeRelativeDir(rightInput, 1)).toBe(6); // Forward when facing right
    expect(computeRelativeDir(rightInput, -1)).toBe(4); // Back when facing left

    const downRight = { ...emptyInput(), down: true, right: true };
    expect(computeRelativeDir(downRight, 1)).toBe(3);
    expect(computeRelativeDir(downRight, -1)).toBe(1);
  });

  it('parses QCF, QCB, and Back-Forward motions within buffer window', () => {
    const buf = new InputBuffer();
    buf.push(1, { ...emptyInput(), down: true }, 1);
    buf.push(2, { ...emptyInput(), down: true, right: true }, 1);
    buf.push(3, { ...emptyInput(), right: true, p2: true }, 1);
    expect(buf.hasMotion('qcf')).toBe(true);
    expect(buf.wasPressed('p2')).toBe(true);

    buf.reset();
    buf.push(1, { ...emptyInput(), left: true }, 1);
    buf.push(2, { ...emptyInput(), right: true, p1: true }, 1);
    expect(buf.hasMotion('bf')).toBe(true);
  });

  it('parses Eggplant Fatality sequence F, D, F, 2', () => {
    const buf = new InputBuffer();
    buf.push(1, { ...emptyInput(), right: true }, 1);
    buf.push(2, emptyInput(), 1);
    buf.push(3, { ...emptyInput(), down: true }, 1);
    buf.push(4, emptyInput(), 1);
    buf.push(5, { ...emptyInput(), right: true }, 1);
    buf.push(6, { ...emptyInput(), p2: true }, 1);
    expect(buf.hasFatalitySequence(['F', 'D', 'F', '2'])).toBe(true);
  });
});
