export type FighterId = 'bob' | 'cory';

export type StageId =
  | 'matrix-subway'
  | 'disco-penthouse'
  | 'eggplant-colosseum'
  | 'scottsdale-lounge';

export type GameMode =
  | 'vs-cpu'
  | 'vs-p2'
  | 'arcade'
  | 'training'
  | 'cpu-vs-cpu';

export type AIDifficulty = 'easy' | 'normal' | 'hard' | 'very-hard';

export type FighterState =
  | 'idle'
  | 'walk_fwd'
  | 'walk_back'
  | 'dash_fwd'
  | 'dash_back'
  | 'crouch'
  | 'jump'
  | 'attack'
  | 'block_stand'
  | 'block_crouch'
  | 'up_block'
  | 'flawless_block'
  | 'hitstun'
  | 'launch'
  | 'knockdown'
  | 'wakeup'
  | 'dizzy'
  | 'taunt'
  | 'parry'
  | 'throw_start'
  | 'thrown'
  | 'fatal_blow'
  | 'fatality_perform'
  | 'fatality_victim'
  | 'victory'
  | 'defeat';

export type AttackHeight = 'high' | 'mid' | 'low' | 'overhead' | 'unblockable';

export type MoveCategory =
  | 'normal'
  | 'string'
  | 'special'
  | 'ex'
  | 'throw'
  | 'wakeup'
  | 'taunt'
  | 'fatal_blow'
  | 'fatality';

export type PoseName =
  | 'idle'
  | 'punch'
  | 'kick'
  | 'special'
  | 'crouch'
  | 'block'
  | 'hurt';

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MoveHitbox {
  /** Offset from fighter x (flipped by facing) */
  ox: number;
  /** Offset from fighter feet y (negative = up) */
  oy: number;
  w: number;
  h: number;
}

export interface MoveData {
  id: string;
  name: string;
  category: MoveCategory;
  inputNotation: string;
  pose: PoseName;
  height: AttackHeight;
  startup: number;
  active: number;
  recovery: number;
  damage: number;
  chip: number;
  hitstun: number;
  blockstun: number;
  knockbackX: number;
  knockbackY: number;
  launch?: boolean;
  hardKnockdown?: boolean;
  multiHit?: number;
  cancellable?: boolean;
  airOnly?: boolean;
  airOk?: boolean;
  armor?: boolean;
  invincibleFrames?: number;
  meterCost?: number;
  meterGainHit?: number;
  meterGainBlock?: number;
  hitbox?: MoveHitbox;
  /** Special behavior tag */
  specialEffect?:
    | 'projectile_eggplant'
    | 'projectile_eggplant_ex'
    | 'teleport'
    | 'teleport_ex'
    | 'clone_grapple'
    | 'parry_matrix'
    | 'aerial_dive'
    | 'taunt_meter'
    | 'projectile_glitter'
    | 'projectile_glitter_ex'
    | 'runway_dash'
    | 'runway_dash_ex'
    | 'disco_drop'
    | 'parry_vogue'
    | 'boa_whip'
    | 'air_twirl'
    | 'throw'
    | 'wakeup_roll'
    | 'wakeup_kick'
    | 'fatal_blow_bob'
    | 'fatal_blow_cory'
    | 'fatality_bob'
    | 'fatality_cory';
  /** Dial-a-combo follow-ups keyed by button ('1'|'2'|'3'|'4') */
  followUps?: Record<string, string>;
  /** Next string move ID if chained */
  stringName?: string;
}

export interface PaletteConfig {
  id: string;
  name: string;
  hueRotate: number;
  saturate: number;
  brightness: number;
  accentHex: string;
}

export interface FatalityConfig {
  id: string;
  name: string;
  inputSequence: string[]; // e.g. ['F', 'D', 'F', '2']
  inputDisplay: string;
  range: 'close' | 'mid' | 'sweep';
  minDist: number;
  maxDist: number;
  description: string;
}

export interface FighterDefinition {
  id: FighterId;
  name: string;
  title: string;
  archetype: string;
  bio: string;
  accentColor: string;
  secondaryColor: string;
  walkFwdSpeed: number;
  walkBackSpeed: number;
  dashSpeed: number;
  jumpVelY: number;
  jumpVelX: number;
  maxHealth: number;
  palettes: PaletteConfig[];
  fatality: FatalityConfig;
  brutalityMoveId: string;
  brutalityName: string;
  moves: Record<string, MoveData>;
  comboStrings: { name: string; input: string; moveIds: string[] }[];
}

export interface InputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  p1: boolean; // Front Punch (1)
  p2: boolean; // Back Punch (2)
  k1: boolean; // Front Kick (3)
  k2: boolean; // Back Kick (4)
  block: boolean;
  ex: boolean; // Enhance / Flip Stance / Throw shortcut
  fatalBlow: boolean;
  taunt: boolean;
}

export interface BufferedInputFrame {
  frame: number;
  /** Relative direction: 1-9 numpad notation (5 = neutral, 6 = forward, 4 = back, 2 = down, 8 = up) */
  dir: number;
  pressed: {
    p1: boolean;
    p2: boolean;
    k1: boolean;
    k2: boolean;
    block: boolean;
    ex: boolean;
    fatalBlow: boolean;
    taunt: boolean;
  };
  held: InputState;
}

export interface Projectile {
  id: number;
  ownerIndex: 0 | 1;
  fighterId: FighterId;
  kind: 'eggplant' | 'glitter' | 'glitter_cloud' | 'disco_ball' | 'boa_whip' | 'clone';
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  damage: number;
  chip: number;
  hitstun: number;
  blockstun: number;
  height: AttackHeight;
  ttl: number;
  maxTtl: number;
  hitsRemaining: number;
  hitCooldown: number;
  ex: boolean;
  active: boolean;
}

export type RoundPhase =
  | 'intro_banter'
  | 'round_announce'
  | 'fighting'
  | 'round_over'
  | 'finish_him'
  | 'fatality_cinematic'
  | 'brutality_finish'
  | 'match_over';

export interface CalloutEvent {
  id: number;
  playerIndex: 0 | 1;
  text: string;
  color: string;
  frame: number;
}

export interface AnnouncerEvent {
  id: number;
  text: string;
  subtext?: string;
  style: 'normal' | 'fight' | 'finish' | 'fatality' | 'brutality' | 'win';
  frame: number;
}

export interface CinematicState {
  type: 'none' | 'fatal_blow' | 'fatality' | 'brutality';
  performerIndex: 0 | 1;
  fighterId: FighterId;
  frame: number;
  duration: number;
  beat: number;
  cameraZoom: number;
  cameraTargetX: number;
  cameraTargetY: number;
  dimAmount: number;
}

export interface MatchConfig {
  mode: GameMode;
  p1Fighter: FighterId;
  p2Fighter: FighterId;
  p1Palette: number;
  p2Palette: number;
  stage: StageId;
  aiDifficulty: AIDifficulty;
  roundTimeSeconds: number;
  roundsToWin: number;
  easyFatality: boolean;
  arcadeStageIndex?: number;
}

export interface TrainingConfig {
  showHitboxes: boolean;
  showInputHistory: boolean;
  showFrameData: boolean;
  autoRegenHealth: boolean;
  autoRegenMeter: boolean;
  dummyBlock: 'none' | 'all' | 'after_first';
}

export interface GameSettings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  voiceVolume: number;
  screenShake: boolean;
  easyFatality: boolean;
  showDebugOverlay: boolean;
}

export interface SaveDataState {
  wins: Record<FighterId, number>;
  losses: Record<FighterId, number>;
  fatalitiesPerformed: number;
  brutalitiesPerformed: number;
  maxComboHits: number;
  maxComboDamage: number;
  arcadeClears: number;
  settings: GameSettings;
}
