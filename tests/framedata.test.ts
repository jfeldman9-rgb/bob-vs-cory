import { describe, expect, it } from 'vitest';
import { FIGHTER_DEFS } from '../src/engine/Fighter';
import { FighterId } from '../src/types/game';

describe('Fighter Frame Data Schema (fighters.json)', () => {
  const ids: FighterId[] = ['bob', 'cory'];

  it('defines both Agent Bob and Flamboyant Cory with >= 3 alternate palettes', () => {
    for (const id of ids) {
      const def = FIGHTER_DEFS[id];
      expect(def).toBeDefined();
      expect(def.palettes.length).toBeGreaterThanOrEqual(3);
      expect(def.comboStrings.length).toBe(5);
      expect(def.maxHealth).toBe(1000);
    }
  });

  it('has valid startup, active, and recovery frames for every move', () => {
    for (const id of ids) {
      const def = FIGHTER_DEFS[id];
      for (const [moveId, move] of Object.entries(def.moves)) {
        expect(move.id).toBe(moveId);
        expect(move.startup).toBeGreaterThan(0);
        expect(move.active).toBeGreaterThan(0);
        expect(move.recovery).toBeGreaterThan(0);
        expect(move.damage).toBeGreaterThanOrEqual(0);
        if (move.followUps) {
          for (const nextId of Object.values(move.followUps)) {
            expect(def.moves[nextId]).toBeDefined();
          }
        }
      }
    }
  });

  it('includes signature Eggplant Fatalities, Fatal Blows, and Secret Brutalities', () => {
    expect(FIGHTER_DEFS.bob.fatality.name).toBe('Inevitable Parm');
    expect(FIGHTER_DEFS.cory.fatality.name).toBe('Runway Aubergine');
    expect(FIGHTER_DEFS.bob.moves['fatal_blow'].name).toBe('System Purge');
    expect(FIGHTER_DEFS.cory.moves['fatal_blow'].name).toBe('Showstopper');
    expect(FIGHTER_DEFS.bob.moves[FIGHTER_DEFS.bob.brutalityMoveId]).toBeDefined();
    expect(FIGHTER_DEFS.cory.moves[FIGHTER_DEFS.cory.brutalityMoveId]).toBeDefined();
  });
});
