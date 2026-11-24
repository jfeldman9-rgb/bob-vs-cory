import { FighterId, GameSettings, SaveDataState } from '../types/game';

const STORAGE_KEY = 'bob_vs_cory_mk_save_v1';

export const DEFAULT_SETTINGS: GameSettings = {
  masterVolume: 0.75,
  musicVolume: 0.55,
  sfxVolume: 0.85,
  voiceVolume: 0.9,
  screenShake: true,
  easyFatality: true,
  showDebugOverlay: false,
};

export function createDefaultSave(): SaveDataState {
  return {
    wins: { bob: 0, cory: 0 },
    losses: { bob: 0, cory: 0 },
    fatalitiesPerformed: 0,
    brutalitiesPerformed: 0,
    maxComboHits: 0,
    maxComboDamage: 0,
    arcadeClears: 0,
    settings: { ...DEFAULT_SETTINGS },
  };
}

export function loadSaveData(): SaveDataState {
  if (typeof window === 'undefined' || !window.localStorage) {
    return createDefaultSave();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultSave();
    const parsed = JSON.parse(raw) as Partial<SaveDataState>;
    const def = createDefaultSave();
    return {
      ...def,
      ...parsed,
      wins: { ...def.wins, ...(parsed.wins ?? {}) },
      losses: { ...def.losses, ...(parsed.losses ?? {}) },
      settings: { ...def.settings, ...(parsed.settings ?? {}) },
    };
  } catch {
    return createDefaultSave();
  }
}

export function persistSaveData(data: SaveDataState): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore quota errors
  }
}

export function recordMatchResult(
  save: SaveDataState,
  winner: FighterId,
  loser: FighterId,
  fatality: boolean,
  brutality: boolean,
  maxComboHits: number,
  maxComboDamage: number
): SaveDataState {
  save.wins[winner] = (save.wins[winner] ?? 0) + 1;
  save.losses[loser] = (save.losses[loser] ?? 0) + 1;
  if (fatality) save.fatalitiesPerformed++;
  if (brutality) save.brutalitiesPerformed++;
  if (maxComboHits > save.maxComboHits) save.maxComboHits = maxComboHits;
  if (maxComboDamage > save.maxComboDamage) save.maxComboDamage = maxComboDamage;
  persistSaveData(save);
  return save;
}
