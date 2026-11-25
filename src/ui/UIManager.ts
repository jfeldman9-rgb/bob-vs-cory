import { VICTORY_QUOTES } from '../data/banter';
import { idsWithPrefix } from '../audio/VoiceBank';
import { STAGES } from '../data/stages';
import { CombatEngine } from '../engine/CombatEngine';
import { FIGHTER_DEFS } from '../engine/Fighter';
import { InputRouter } from '../engine/InputBuffer';
import { TICK_RATE } from '../engine/constants';
import {
  AIDifficulty,
  FighterId,
  GameMode,
  GameSettings,
  MatchConfig,
  SaveDataState,
  StageId,
} from '../types/game';

export type ScreenName =
  | 'title'
  | 'select'
  | 'match'
  | 'moves'
  | 'settings';

const STAGE_CALLS: Record<string, string> = {
  'matrix-subway': 'ann_stage_subway',
  'disco-penthouse': 'ann_stage_penthouse',
  'eggplant-colosseum': 'ann_stage_colosseum',
  'scottsdale-lounge': 'ann_stage_lounge',
};

export interface UICallbacks {
  onStartMatch: (config: MatchConfig) => void;
  onRematch: () => void;
  onNextArcadeStage: () => void;
  onReturnTitle: () => void;
  onReturnSelect: () => void;
  onSettingsChanged: (settings: GameSettings) => void;
  onPauseToggle: (paused: boolean) => void;
  onClickSound: () => void;
  /** Sample UI sounds (ElevenLabs); onClickSound stays as the generic fallback. */
  onUISound?: (kind: UISoundKind) => void;
  /** Play a recorded voice clip by id (announcer menu calls, select lines). */
  onVoice?: (clipId: string, delayMs?: number) => void;
  /** The exact victory quote shown on the result card, so it can be voiced. */
  onVictoryQuote?: (fighter: FighterId, quote: string) => void;
}

export class UIManager {
  private root: HTMLElement;
  private callbacks: UICallbacks;
  private inputRouter: InputRouter;
  private save: SaveDataState;

  public screen: ScreenName = 'title';
  public paused: boolean = false;
  public showMovesInPause: boolean = false;
  public showTouchControls: boolean = false;

  // Draft match config for select screen
  public draft: MatchConfig = {
    mode: 'vs-cpu',
    p1Fighter: 'bob',
    p2Fighter: 'cory',
    p1Palette: 0,
    p2Palette: 0,
    stage: 'matrix-subway',
    aiDifficulty: 'normal',
    roundTimeSeconds: 99,
    roundsToWin: 2,
    easyFatality: true,
    arcadeStageIndex: 0,
  };

  private movesTabFighter: FighterId = 'bob';
  private hudRefs: Record<string, HTMLElement | null> = {};
  private lastAnnouncerId = -1;
  private victoryShown = false;

  constructor(
    root: HTMLElement,
    callbacks: UICallbacks,
    inputRouter: InputRouter,
    save: SaveDataState
  ) {
    this.root = root;
    this.callbacks = callbacks;
    this.inputRouter = inputRouter;
    this.save = save;
    this.draft.easyFatality = save.settings.easyFatality;
    this.showTouchControls =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }

  public setSave(save: SaveDataState): void {
    this.save = save;
  }

  public showTitle(): void {
    this.screen = 'title';
    this.paused = false;
    this.victoryShown = false;
    this.root.innerHTML = `
      <div class="title-screen interactive">
        <div class="title-fighters">
          <img class="title-portrait left" src="./assets/fighters/bob-idle.png" alt="Agent Bob" />
          <img class="title-portrait right" src="./assets/fighters/cory-idle.png" alt="Flamboyant Cory" />
        </div>
        <div class="title-center">
          <h1 class="game-logo">BOB vs CORY</h1>
          <div class="game-subtitle">INEVITABLE vs FABULOUS • EGGPLANT KOMBAT</div>
          <div class="menu-stack">
            <button class="mk-btn primary" data-action="mode-vs-cpu">1P vs CPU</button>
            <button class="mk-btn" data-action="mode-vs-p2">2P Local Versus (1 Keyboard / Gamepads)</button>
            <button class="mk-btn" data-action="mode-arcade">Klassic Arcade Tower</button>
            <button class="mk-btn" data-action="mode-training">Training Mode</button>
            <button class="mk-btn" data-action="mode-cpu-vs-cpu">CPU vs CPU Spectate</button>
            <button class="mk-btn" data-action="open-moves">Moves List &amp; Fatalities</button>
            <button class="mk-btn" data-action="open-settings">Settings &amp; Kombat Stats</button>
          </div>
        </div>
      </div>
    `;

    this.bindButtons({
      'mode-vs-cpu': () => { this.voice('ann_menu_versus'); this.openSelect('vs-cpu'); },
      'mode-vs-p2': () => { this.voice('ann_menu_versus'); this.openSelect('vs-p2'); },
      'mode-arcade': () => { this.voice('ann_menu_arcade'); this.openSelect('arcade'); },
      'mode-training': () => { this.voice('ann_menu_training'); this.openSelect('training'); },
      'mode-cpu-vs-cpu': () => { this.voice('ann_menu_versus'); this.openSelect('cpu-vs-cpu'); },
      'open-moves': () => this.showMovesScreen(),
      'open-settings': () => this.showSettingsScreen(),
    });
  }

  private voice(clipId: string, delayMs?: number): void {
    this.callbacks.onVoice?.(clipId, delayMs);
  }

  private selectLineToggle = 0;
  private announceFighter(id: FighterId): void {
    this.voice(id === 'bob' ? 'ann_select_bob' : 'ann_select_cory');
    // The fighter answers: alternate lock-in lines and solo intros.
    const pool = [...idsWithPrefix(`${id}_select_`), ...idsWithPrefix(`${id}_intro_`)];
    if (pool.length === 0) return;
    this.voice(pool[this.selectLineToggle++ % pool.length], 1500);
  }

  public openSelect(mode: GameMode): void {
    if (this.screen !== 'select') this.voice('ann_select_prompt', 900);
    this.draft.mode = mode;
    if (mode === 'arcade') {
      this.draft.arcadeStageIndex = 0;
      this.draft.stage = STAGES[0].id;
    }
    this.screen = 'select';
    this.renderSelectScreen();
  }

  private renderSelectScreen(): void {
    const p1Def = FIGHTER_DEFS[this.draft.p1Fighter];
    const p2Def = FIGHTER_DEFS[this.draft.p2Fighter];

    const modeLabel: Record<GameMode, string> = {
      'vs-cpu': '1P vs CPU',
      'vs-p2': '2P Local Versus',
      arcade: 'Klassic Arcade Tower',
      training: 'Training Mode',
      'cpu-vs-cpu': 'CPU vs CPU Spectate',
    };

    const renderFighterCard = (slot: 'p1' | 'p2') => {
      const fid = slot === 'p1' ? this.draft.p1Fighter : this.draft.p2Fighter;
      const palIdx = slot === 'p1' ? this.draft.p1Palette : this.draft.p2Palette;
      const def = FIGHTER_DEFS[fid];
      const portrait = fid === 'bob' ? './assets/fighters/bob-face.webp' : './assets/fighters/cory-face.webp';
      return `
        <div class="fighter-card">
          <div class="fighter-card-top">
            <img src="${portrait}" alt="${def.name}" />
            <div>
              <div style="font-size:0.75rem;color:#94a3b8;font-weight:800;letter-spacing:0.12em;">
                ${slot === 'p1' ? 'PLAYER 1' : this.draft.mode === 'vs-p2' ? 'PLAYER 2' : 'OPPONENT'}
              </div>
              <div style="font-size:1.25rem;font-weight:900;color:${def.accentColor};">${def.name}</div>
              <div style="font-size:0.8rem;color:#cbd5e1;">${def.title} • ${def.archetype}</div>
            </div>
          </div>
          <div class="choice-row">
            <button class="pill-btn ${fid === 'bob' ? 'active' : ''}" data-action="${slot}-bob">Agent Bob</button>
            <button class="pill-btn ${fid === 'cory' ? 'active' : ''}" data-action="${slot}-cory">Flamboyant Cory</button>
          </div>
          <div style="font-size:0.75rem;color:#94a3b8;font-weight:700;">PALETTE: ${def.palettes[palIdx].name}</div>
          <div class="choice-row">
            ${def.palettes
              .map(
                (pal, idx) => `
              <button class="pill-btn ${palIdx === idx ? 'active' : ''}" data-action="${slot}-pal-${idx}" style="border-left:4px solid ${pal.accentHex};">
                ${pal.name}
              </button>
            `
              )
              .join('')}
          </div>
        </div>
      `;
    };

    this.root.innerHTML = `
      <div class="select-screen interactive">
        <div class="select-header">
          <h2 class="select-title">SELECT KOMBATANTS — ${modeLabel[this.draft.mode]}</h2>
          <button class="mk-btn small" data-action="back-title">← Main Menu</button>
        </div>

        <div class="select-grid">
          ${renderFighterCard('p1')}
          ${renderFighterCard('p2')}
        </div>

        <div style="font-size:0.82rem;font-weight:800;letter-spacing:0.12em;color:var(--gold);margin-bottom:6px;">
          SELECT ARENA
        </div>
        <div class="stage-carousel">
          ${STAGES.map(
            (st) => `
            <div class="stage-tile ${this.draft.stage === st.id ? 'active' : ''}" data-action="stage-${st.id}">
              ${st.imagePath ? `<img src="${st.imagePath}" alt="${st.name}" />` : ''}
              <div class="stage-tile-label" style="color:${st.accentHex};">${st.name}</div>
              <div class="stage-tile-label" style="font-size:0.7rem;color:#e2e8f0;font-weight:600;">${st.subtitle}</div>
            </div>
          `
          ).join('')}
        </div>

        <div class="select-footer">
          <div class="choice-row" style="align-items:center;">
            <span style="font-size:0.8rem;font-weight:800;color:#cbd5e1;margin-right:4px;">CPU AI:</span>
            ${(['easy', 'normal', 'hard', 'very-hard'] as AIDifficulty[])
              .map(
                (d) => `
              <button class="pill-btn ${this.draft.aiDifficulty === d ? 'active' : ''}" data-action="ai-${d}">
                ${d.toUpperCase()}
              </button>
            `
              )
              .join('')}
            <button class="pill-btn ${this.draft.easyFatality ? 'active' : ''}" data-action="toggle-easy-fatality" style="margin-left:8px;">
              Easy Fatality: ${this.draft.easyFatality ? 'ON' : 'OFF'}
            </button>
          </div>

          <button class="mk-btn primary" data-action="start-fight" style="padding:13px 34px;font-size:1.1rem;">
            FIGHT! (${p1Def.name} vs ${p2Def.name})
          </button>
        </div>
      </div>
    `;

    const handlers: Record<string, () => void> = {
      'back-title': () => this.showTitle(),
      'p1-bob': () => { this.draft.p1Fighter = 'bob'; this.draft.p1Palette = 0; this.announceFighter('bob'); this.renderSelectScreen(); },
      'p1-cory': () => { this.draft.p1Fighter = 'cory'; this.draft.p1Palette = 0; this.announceFighter('cory'); this.renderSelectScreen(); },
      'p2-bob': () => { this.draft.p2Fighter = 'bob'; this.draft.p2Palette = 0; this.announceFighter('bob'); this.renderSelectScreen(); },
      'p2-cory': () => { this.draft.p2Fighter = 'cory'; this.draft.p2Palette = 0; this.announceFighter('cory'); this.renderSelectScreen(); },
      'toggle-easy-fatality': () => { this.draft.easyFatality = !this.draft.easyFatality; this.renderSelectScreen(); },
      'start-fight': () => {
        this.voice(this.draft.mode === 'arcade' ? 'ann_tower_start' : 'ann_versus');
        this.callbacks.onStartMatch({ ...this.draft });
      },
    };

    for (let i = 0; i < 4; i++) {
      handlers[`p1-pal-${i}`] = () => { this.draft.p1Palette = i; this.renderSelectScreen(); };
      handlers[`p2-pal-${i}`] = () => { this.draft.p2Palette = i; this.renderSelectScreen(); };
    }
    STAGES.forEach((st) => {
      handlers[`stage-${st.id}`] = () => { this.draft.stage = st.id as StageId; this.voice(STAGE_CALLS[st.id] ?? 'ann_stage_prompt'); this.renderSelectScreen(); };
    });
    (['easy', 'normal', 'hard', 'very-hard'] as AIDifficulty[]).forEach((d) => {
      handlers[`ai-${d}`] = () => { this.draft.aiDifficulty = d; this.renderSelectScreen(); };
    });

    this.bindButtons(handlers);
  }

  public showMovesScreen(inPause: boolean = false): void {
    const def = FIGHTER_DEFS[this.movesTabFighter];
    const specials = Object.values(def.moves).filter((m) => m.category === 'special' || m.category === 'ex');
    const normals = Object.values(def.moves).filter((m) => m.category === 'normal' || m.category === 'throw' || m.category === 'taunt' || m.category === 'wakeup');
    const fb = def.moves['fatal_blow'];

    const html = `
      <div class="modal-backdrop interactive">
        <div class="modal-card">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
            <h2 style="margin:0;color:var(--gold);letter-spacing:0.1em;">MOVES LIST &amp; FRAME DATA</h2>
            <div class="choice-row">
              <button class="pill-btn ${this.movesTabFighter === 'bob' ? 'active' : ''}" data-action="tab-bob">Agent Bob</button>
              <button class="pill-btn ${this.movesTabFighter === 'cory' ? 'active' : ''}" data-action="tab-cory">Flamboyant Cory</button>
              <button class="mk-btn small" data-action="close-moves">Close</button>
            </div>
          </div>

          <div style="margin-top:12px;padding:10px 14px;border-radius:8px;background:rgba(168,85,247,0.16);border:1px solid #c084fc;">
            <div style="font-weight:900;color:#e879f9;letter-spacing:0.08em;">
              🍆 EGGPLANT FATALITY: ${def.fatality.name.toUpperCase()} — ${def.fatality.inputDisplay}
            </div>
            <div style="font-size:0.84rem;color:#e2e8f0;margin-top:3px;">${def.fatality.description}</div>
            <div style="font-size:0.78rem;color:#fde047;margin-top:4px;">
              <strong>FATAL BLOW (HP ≤ 30%):</strong> ${fb.name} (${fb.inputNotation}) •
              <strong>SECRET BRUTALITY:</strong> End final round with ${def.moves[def.brutalityMoveId].name} (${def.brutalityName})
            </div>
          </div>

          <h3 style="margin:14px 0 4px;color:${def.accentColor};font-size:0.95rem;">DIAL-A-COMBO STRINGS</h3>
          <table class="moves-table">
            <thead><tr><th>String</th><th>Input</th><th>Cancelable</th></tr></thead>
            <tbody>
              ${def.comboStrings
                .map((s) => `<tr><td><strong>${s.name}</strong></td><td><code>${s.input}</code></td><td>Special Cancelable</td></tr>`)
                .join('')}
            </tbody>
          </table>

          <h3 style="margin:14px 0 4px;color:${def.accentColor};font-size:0.95rem;">SPECIAL &amp; EX MOVES</h3>
          <table class="moves-table">
            <thead><tr><th>Move</th><th>Input</th><th>Height</th><th>Start / Act / Rec</th><th>Dmg</th></tr></thead>
            <tbody>
              ${specials
                .map(
                  (m) => `<tr>
                    <td><strong>${m.name}</strong></td>
                    <td><code>${m.inputNotation}</code></td>
                    <td>${m.height.toUpperCase()}</td>
                    <td>${m.startup} / ${m.active} / ${m.recovery}</td>
                    <td>${m.damage}</td>
                  </tr>`
                )
                .join('')}
            </tbody>
          </table>

          <h3 style="margin:14px 0 4px;color:#cbd5e1;font-size:0.95rem;">NORMALS, THROWS &amp; WAKEUPS</h3>
          <table class="moves-table">
            <thead><tr><th>Move</th><th>Input</th><th>Height</th><th>Start</th><th>Dmg</th></tr></thead>
            <tbody>
              ${normals
                .map(
                  (m) => `<tr>
                    <td>${m.name}</td>
                    <td><code>${m.inputNotation}</code></td>
                    <td>${m.height.toUpperCase()}</td>
                    <td>${m.startup}f</td>
                    <td>${m.damage}</td>
                  </tr>`
                )
                .join('')}
            </tbody>
          </table>

          <div style="margin-top:12px;font-size:0.78rem;color:#94a3b8;line-height:1.5;">
            <strong>P1 Keyboard:</strong> WASD Move • U(1) I(2) J(3) K(4) • Space/L Block • O/E EX &amp; Throw • F Fatal Blow • T Taunt • Esc Pause<br/>
            <strong>P2 Keyboard:</strong> Arrows Move • Numpad 4/5/1/2 (or [ ] ; ') • Numpad 0 / RShift Block • Numpad 6 EX • Numpad 3 / Enter Fatal Blow<br/>
            <strong>Defense:</strong> Flawless Block (tap Block within 3f) • Up-Block (Up+Block vs Overheads) • Combo Breaker (3 Bars: Fwd+Block in hitstun)
          </div>
        </div>
      </div>
    `;

    if (inPause) {
      this.showMovesInPause = true;
      const existing = this.root.querySelector('#pause-modal-slot');
      if (existing) existing.innerHTML = html;
    } else {
      this.screen = 'moves';
      this.root.innerHTML = html;
    }

    this.bindButtons({
      'tab-bob': () => { this.movesTabFighter = 'bob'; this.showMovesScreen(inPause); },
      'tab-cory': () => { this.movesTabFighter = 'cory'; this.showMovesScreen(inPause); },
      'close-moves': () => {
        if (inPause) {
          this.showMovesInPause = false;
          this.renderPauseModal(null);
        } else {
          this.showTitle();
        }
      },
    });
  }

  public showSettingsScreen(): void {
    this.screen = 'settings';
    const s = this.save.settings;
    this.root.innerHTML = `
      <div class="modal-backdrop interactive">
        <div class="modal-card" style="max-width:620px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <h2 style="margin:0;color:var(--gold);">SETTINGS &amp; KOMBAT STATS</h2>
            <button class="mk-btn small" data-action="close-settings">Back</button>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0;padding:12px;background:rgba(255,255,255,0.04);border-radius:8px;font-size:0.86rem;">
            <div><strong>Agent Bob Wins:</strong> ${this.save.wins.bob}</div>
            <div><strong>Flamboyant Cory Wins:</strong> ${this.save.wins.cory}</div>
            <div><strong>Fatalities Performed:</strong> ${this.save.fatalitiesPerformed}</div>
            <div><strong>Brutalities Performed:</strong> ${this.save.brutalitiesPerformed}</div>
            <div><strong>Max Combo:</strong> ${this.save.maxComboHits} Hits (${this.save.maxComboDamage} dmg)</div>
            <div><strong>Arcade Clears:</strong> ${this.save.arcadeClears}</div>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px;font-size:0.9rem;">
            <label>Master Volume: <input type="range" id="vol-master" min="0" max="1" step="0.05" value="${s.masterVolume}" /></label>
            <label>Music Volume: <input type="range" id="vol-music" min="0" max="1" step="0.05" value="${s.musicVolume}" /></label>
            <label>SFX Volume: <input type="range" id="vol-sfx" min="0" max="1" step="0.05" value="${s.sfxVolume}" /></label>
            <label>Announcer Volume: <input type="range" id="vol-voice" min="0" max="1" step="0.05" value="${s.voiceVolume}" /></label>
            <label><input type="checkbox" id="opt-shake" ${s.screenShake ? 'checked' : ''} /> Screen Shake</label>
            <label><input type="checkbox" id="opt-easy-fat" ${s.easyFatality ? 'checked' : ''} /> Easy Fatality Enabled</label>
            <label><input type="checkbox" id="opt-debug" ${s.showDebugOverlay ? 'checked' : ''} /> Frame-by-Frame Debug Overlay</label>
            <label><input type="checkbox" id="opt-touch" ${this.showTouchControls ? 'checked' : ''} /> Show On-Screen Touch Controls</label>
          </div>
        </div>
      </div>
    `;

    const sync = () => {
      const updated: GameSettings = {
        masterVolume: parseFloat((document.getElementById('vol-master') as HTMLInputElement).value),
        musicVolume: parseFloat((document.getElementById('vol-music') as HTMLInputElement).value),
        sfxVolume: parseFloat((document.getElementById('vol-sfx') as HTMLInputElement).value),
        voiceVolume: parseFloat((document.getElementById('vol-voice') as HTMLInputElement).value),
        screenShake: (document.getElementById('opt-shake') as HTMLInputElement).checked,
        easyFatality: (document.getElementById('opt-easy-fat') as HTMLInputElement).checked,
        showDebugOverlay: (document.getElementById('opt-debug') as HTMLInputElement).checked,
      };
      this.showTouchControls = (document.getElementById('opt-touch') as HTMLInputElement).checked;
      this.draft.easyFatality = updated.easyFatality;
      this.callbacks.onSettingsChanged(updated);
    };

    ['vol-master', 'vol-music', 'vol-sfx', 'vol-voice', 'opt-shake', 'opt-easy-fat', 'opt-debug', 'opt-touch'].forEach((id) => {
      document.getElementById(id)?.addEventListener('change', sync);
    });

    this.bindButtons({
      'close-settings': () => this.showTitle(),
    });
  }

  public mountMatchHUD(engine: CombatEngine): void {
    this.screen = 'match';
    this.paused = false;
    this.showMovesInPause = false;
    this.victoryShown = false;
    this.lastAnnouncerId = -1;

    const f0 = engine.fighters[0];
    const f1 = engine.fighters[1];
    const p0 = f0.id === 'bob' ? './assets/fighters/bob-face.webp' : './assets/fighters/cory-face.webp';
    const p1 = f1.id === 'bob' ? './assets/fighters/bob-face.webp' : './assets/fighters/cory-face.webp';

    const pips = (n: number) =>
      Array.from({ length: engine.config.roundsToWin }, (_, i) => `<span class="round-pip" data-pip="${n}-${i}"></span>`).join('');

    this.root.innerHTML = `
      <div class="hud-layer">
        <div class="hud-top">
          <div class="hud-fighter p1">
            <div class="hud-name-row">
              <img class="hud-portrait" src="${p0}" alt="${f0.def.name}" />
              <span class="hud-name" style="color:${f0.def.accentColor};">${f0.def.name}</span>
              <div class="round-pips">${pips(0)}</div>
            </div>
            <div class="health-bar-shell">
              <div class="health-trail" id="hp-trail-0" style="width:100%;"></div>
              <div class="health-fill" id="hp-fill-0" style="width:100%;"></div>
            </div>
          </div>

          <div class="hud-timer">
            <div class="timer-val" id="hud-timer-val">99</div>
            <div class="round-tag" id="hud-round-tag">ROUND 1</div>
          </div>

          <div class="hud-fighter p2">
            <div class="hud-name-row">
              <img class="hud-portrait" src="${p1}" alt="${f1.def.name}" />
              <span class="hud-name" style="color:${f1.def.accentColor};">${f1.def.name}</span>
              <div class="round-pips">${pips(1)}</div>
            </div>
            <div class="health-bar-shell">
              <div class="health-trail" id="hp-trail-1" style="width:100%;"></div>
              <div class="health-fill" id="hp-fill-1" style="width:100%;"></div>
            </div>
          </div>
        </div>

        <div class="hud-mid">
          <div class="combo-box p1" id="combo-0"></div>
          <div class="combo-box p2" id="combo-1"></div>
        </div>

        <div class="hud-bottom">
          <div class="meter-wrap p1">
            <div id="fatal-badge-0"></div>
            <div class="meter-segments">
              <div class="meter-seg"><div class="meter-seg-fill" id="m-0-0" style="width:0%"></div></div>
              <div class="meter-seg"><div class="meter-seg-fill" id="m-0-1" style="width:0%"></div></div>
              <div class="meter-seg"><div class="meter-seg-fill" id="m-0-2" style="width:0%"></div></div>
            </div>
          </div>

          <div class="interactive" style="display:flex;gap:8px;">
            <button class="mk-btn small" id="btn-pause-hud">Pause / Moves (Esc)</button>
          </div>

          <div class="meter-wrap p2">
            <div id="fatal-badge-1"></div>
            <div class="meter-segments">
              <div class="meter-seg"><div class="meter-seg-fill" id="m-1-0" style="width:0%"></div></div>
              <div class="meter-seg"><div class="meter-seg-fill" id="m-1-1" style="width:0%"></div></div>
              <div class="meter-seg"><div class="meter-seg-fill" id="m-1-2" style="width:0%"></div></div>
            </div>
          </div>
        </div>
      </div>

      <div class="announcer-banner" id="announcer-slot"></div>
      <div id="banter-slot"></div>
      <div id="fatality-guide-slot"></div>
      <div id="debug-slot"></div>
      <div id="pause-modal-slot"></div>
      <div id="victory-modal-slot"></div>
      <div id="touch-slot"></div>
    `;

    this.hudRefs = {
      hpFill0: document.getElementById('hp-fill-0'),
      hpTrail0: document.getElementById('hp-trail-0'),
      hpFill1: document.getElementById('hp-fill-1'),
      hpTrail1: document.getElementById('hp-trail-1'),
      timer: document.getElementById('hud-timer-val'),
      roundTag: document.getElementById('hud-round-tag'),
      combo0: document.getElementById('combo-0'),
      combo1: document.getElementById('combo-1'),
      fatal0: document.getElementById('fatal-badge-0'),
      fatal1: document.getElementById('fatal-badge-1'),
      announcer: document.getElementById('announcer-slot'),
      banter: document.getElementById('banter-slot'),
      fatGuide: document.getElementById('fatality-guide-slot'),
      debug: document.getElementById('debug-slot'),
      pauseSlot: document.getElementById('pause-modal-slot'),
      victorySlot: document.getElementById('victory-modal-slot'),
      touchSlot: document.getElementById('touch-slot'),
    };

    document.getElementById('btn-pause-hud')?.addEventListener('click', () => {
      this.togglePause(engine);
    });

    if (this.showTouchControls) {
      this.mountTouchControls();
    }
  }

  private mountTouchControls(): void {
    const slot = this.hudRefs.touchSlot;
    if (!slot) return;
    slot.innerHTML = `
      <div class="touch-controls">
        <div class="touch-pad">
          <div></div><button class="touch-btn" data-t="up">↑</button><div></div>
          <button class="touch-btn" data-t="left">←</button>
          <button class="touch-btn" data-t="down">↓</button>
          <button class="touch-btn" data-t="right">→</button>
        </div>
        <div class="touch-pad">
          <button class="touch-btn" data-t="p1">1</button>
          <button class="touch-btn" data-t="p2">2</button>
          <button class="touch-btn" data-t="block" style="border-color:#38bdf8;">BLK</button>
          <button class="touch-btn" data-t="k1">3</button>
          <button class="touch-btn" data-t="k2">4</button>
          <button class="touch-btn" data-t="fatalBlow" style="border-color:#ff2a55;">FB</button>
        </div>
      </div>
    `;
    slot.querySelectorAll<HTMLElement>('[data-t]').forEach((btn) => {
      const key = btn.dataset.t as keyof typeof this.inputRouter.touchState;
      const down = (e: Event) => { e.preventDefault(); this.inputRouter.touchState[key] = true; };
      const up = (e: Event) => { e.preventDefault(); this.inputRouter.touchState[key] = false; };
      btn.addEventListener('pointerdown', down);
      btn.addEventListener('pointerup', up);
      btn.addEventListener('pointerleave', up);
      btn.addEventListener('pointercancel', up);
    });
  }

  public togglePause(engine: CombatEngine): void {
    if (this.screen !== 'match' || engine.phase === 'match_over') return;
    this.paused = !this.paused;
    this.showMovesInPause = false;
    this.callbacks.onPauseToggle(this.paused);
    if (this.paused) {
      this.renderPauseModal(engine);
    } else if (this.hudRefs.pauseSlot) {
      this.hudRefs.pauseSlot.innerHTML = '';
    }
  }

  private renderPauseModal(engine: CombatEngine | null): void {
    const slot = this.hudRefs.pauseSlot;
    if (!slot) return;
    const isTraining = engine?.config.mode === 'training';
    slot.innerHTML = `
      <div class="modal-backdrop interactive">
        <div class="modal-card" style="max-width:460px;text-align:center;">
          <h2 style="margin:0 0 14px;color:var(--gold);letter-spacing:0.12em;">PAUSED</h2>
          <div class="menu-stack">
            <button class="mk-btn primary" data-action="resume">Resume Fight</button>
            <button class="mk-btn" data-action="pause-moves">Moves List &amp; Fatalities</button>
            ${
              isTraining && engine
                ? `
              <button class="mk-btn" data-action="toggle-hitboxes">Hitboxes: ${engine.training.showHitboxes ? 'ON' : 'OFF'}</button>
              <button class="mk-btn" data-action="cycle-dummy-block">Dummy Block: ${engine.training.dummyBlock.toUpperCase()}</button>
            `
                : ''
            }
            <button class="mk-btn" data-action="toggle-debug-pause">Debug Overlay: ${this.save.settings.showDebugOverlay ? 'ON' : 'OFF'}</button>
            <button class="mk-btn" data-action="rematch-pause">Restart Match</button>
            <button class="mk-btn" data-action="select-pause">Character Select</button>
            <button class="mk-btn" data-action="title-pause">Main Menu</button>
          </div>
        </div>
      </div>
    `;

    this.bindButtons({
      resume: () => { if (engine) this.togglePause(engine); },
      'pause-moves': () => this.showMovesScreen(true),
      'toggle-hitboxes': () => {
        if (engine) {
          engine.training.showHitboxes = !engine.training.showHitboxes;
          this.renderPauseModal(engine);
        }
      },
      'cycle-dummy-block': () => {
        if (engine) {
          const order: ('none' | 'all' | 'after_first')[] = ['none', 'all', 'after_first'];
          const next = order[(order.indexOf(engine.training.dummyBlock) + 1) % order.length];
          engine.training.dummyBlock = next;
          this.renderPauseModal(engine);
        }
      },
      'toggle-debug-pause': () => {
        this.save.settings.showDebugOverlay = !this.save.settings.showDebugOverlay;
        this.callbacks.onSettingsChanged({ ...this.save.settings });
        this.renderPauseModal(engine);
      },
      'rematch-pause': () => this.callbacks.onRematch(),
      'select-pause': () => this.callbacks.onReturnSelect(),
      'title-pause': () => this.callbacks.onReturnTitle(),
    });
  }

  public updateMatchHUD(engine: CombatEngine, fps: number): void {
    if (this.screen !== 'match') return;

    // Health bars & round pips
    for (let i = 0; i < 2; i++) {
      const f = engine.fighters[i];
      const pct = Math.max(0, (f.health / f.maxHealth) * 100);
      const trailPct = Math.max(0, (f.trailHealth / f.maxHealth) * 100);
      const fillEl = this.hudRefs[`hpFill${i}`];
      const trailEl = this.hudRefs[`hpTrail${i}`];
      if (fillEl) {
        fillEl.style.width = `${pct}%`;
        fillEl.classList.toggle('low', pct <= 30);
      }
      if (trailEl) trailEl.style.width = `${trailPct}%`;

      for (let r = 0; r < engine.config.roundsToWin; r++) {
        const pip = this.root.querySelector(`[data-pip="${i}-${r}"]`);
        if (pip) pip.classList.toggle('won', r < engine.roundWins[i]);
      }

      // 3-segment super meter
      for (let seg = 0; seg < 3; seg++) {
        const segEl = document.getElementById(`m-${i}-${seg}`);
        if (segEl) {
          const val = Math.max(0, Math.min(100, f.superMeter - seg * 100));
          segEl.style.width = `${val}%`;
        }
      }

      // Pulsing FATAL BLOW READY badge
      const fbEl = this.hudRefs[`fatal${i}`];
      if (fbEl) {
        fbEl.innerHTML = f.canUseFatalBlow()
          ? `<span class="fatal-badge">FATAL BLOW READY (F)</span>`
          : '';
      }

      // Combo counter + callouts
      const cEl = this.hudRefs[`combo${i}`];
      if (cEl) {
        const hits = engine.comboCounts[i];
        const dmgPct = Math.round((engine.comboDamage[i] / 1000) * 100);
        const pCallouts = engine.callouts.filter((c) => c.playerIndex === i);
        cEl.innerHTML = `
          ${hits >= 2 ? `<div class="combo-hits">${hits} HITS</div><div class="combo-dmg">${dmgPct}% DAMAGE</div>` : ''}
          ${pCallouts.map((c) => `<div class="callout-badge" style="color:${c.color};">${c.text}</div>`).join('<br/>')}
        `;
      }
    }

    // Timer & Round Tag
    if (this.hudRefs.timer) {
      this.hudRefs.timer.textContent =
        engine.config.mode === 'training'
          ? '∞'
          : String(Math.ceil(engine.timerFrames / TICK_RATE)).padStart(2, '0');
    }
    if (this.hudRefs.roundTag) {
      this.hudRefs.roundTag.textContent =
        engine.config.mode === 'training' ? 'TRAINING' : `ROUND ${engine.roundNumber}`;
    }

    // Pre-Match Intro Banter
    if (this.hudRefs.banter) {
      if (engine.phase === 'intro_banter') {
        const lineIdx = engine.phaseFrame < 115 ? 0 : 1;
        const line = engine.activeBanter.lines[lineIdx];
        const speakerDef = FIGHTER_DEFS[line.speaker];
        this.hudRefs.banter.innerHTML = `
          <div class="banter-box interactive">
            <div style="font-size:0.82rem;font-weight:900;color:${speakerDef.accentColor};letter-spacing:0.12em;">
              ${speakerDef.name.toUpperCase()}
            </div>
            <div style="font-size:1.1rem;font-weight:700;margin:6px 0;">"${line.text}"</div>
            <button class="pill-btn" id="btn-skip-banter">Skip Intro (Press Attack)</button>
          </div>
        `;
        document.getElementById('btn-skip-banter')?.addEventListener('click', () => engine.skipIntro());
      } else {
        this.hudRefs.banter.innerHTML = '';
      }
    }

    // Announcer banner
    if (this.hudRefs.announcer) {
      const ann = engine.announcer;
      const showAnn =
        ann &&
        (engine.frame - ann.frame < 95 ||
          engine.phase === 'finish_him' ||
          engine.phase === 'fatality_cinematic' ||
          engine.phase === 'match_over');
      if (showAnn && ann) {
        if (this.lastAnnouncerId !== ann.id) {
          this.lastAnnouncerId = ann.id;
          this.hudRefs.announcer.innerHTML = `
            <div class="announcer-main ${ann.style}">${ann.text}</div>
            ${ann.subtext ? `<div class="announcer-sub">${ann.subtext}</div>` : ''}
          `;
        }
      } else {
        this.hudRefs.announcer.innerHTML = '';
        this.lastAnnouncerId = -1;
      }
    }

    // Fatality distance validator guide during FINISH HIM!
    if (this.hudRefs.fatGuide) {
      if (engine.phase === 'finish_him' && engine.winnerIndex !== null) {
        const w = engine.fighters[engine.winnerIndex];
        const l = engine.fighters[1 - engine.winnerIndex];
        const dist = Math.round(Math.abs(w.x - l.x));
        const ok = engine.isFatalityRangeValid(w, l);
        const hint = ok
          ? 'IN RANGE ✓ — EXECUTE FATALITY!'
          : dist < w.def.fatality.minDist
          ? 'STEP BACK FOR FATALITY RANGE'
          : 'STEP CLOSER FOR FATALITY RANGE';
        this.hudRefs.fatGuide.innerHTML = `
          <div class="banter-box" style="bottom:80px;border-color:${ok ? '#00ff7f' : '#ff2a55'};">
            <div style="font-weight:900;color:${ok ? '#00ff7f' : '#fbbf24'};">${hint}</div>
            <div style="font-size:0.86rem;margin-top:4px;">
              🍆 <strong>${w.def.fatality.name}</strong>: <code>${w.def.fatality.inputDisplay}</code>
              ${engine.config.easyFatality ? ' or press <code>F</code> / <code>Block+2</code>' : ''}
            </div>
          </div>
        `;
      } else {
        this.hudRefs.fatGuide.innerHTML = '';
      }
    }

    // Debug overlay
    if (this.hudRefs.debug) {
      if (this.save.settings.showDebugOverlay || engine.config.mode === 'training') {
        const f0 = engine.fighters[0];
        const f1 = engine.fighters[1];
        this.hudRefs.debug.innerHTML = `
          <div class="debug-overlay">
            FPS: ${fps} | Sim Frame: ${engine.frame} | Dist: ${Math.round(Math.abs(f0.x - f1.x))}px<br/>
            P1 [${f0.id}]: ${f0.state} | Move: ${f0.currentMove?.id ?? '-'} (f${f0.moveFrame}) | Adv: ${f0.lastFrameAdvantage >= 0 ? '+' : ''}${f0.lastFrameAdvantage}f<br/>
            P2 [${f1.id}]: ${f1.state} | Move: ${f1.currentMove?.id ?? '-'} (f${f1.moveFrame}) | Adv: ${f1.lastFrameAdvantage >= 0 ? '+' : ''}${f1.lastFrameAdvantage}f
          </div>
        `;
      } else {
        this.hudRefs.debug.innerHTML = '';
      }
    }

    // Match Over Victory Card
    if (engine.phase === 'match_over' && !this.victoryShown && engine.phaseFrame >= 45) {
      this.victoryShown = true;
      this.renderVictoryCard(engine);
    }
  }

  private renderVictoryCard(engine: CombatEngine): void {
    const slot = this.hudRefs.victorySlot;
    if (!slot || engine.winnerIndex === null) return;
    const winner = engine.fighters[engine.winnerIndex];
    const quotes = VICTORY_QUOTES[winner.id];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    this.callbacks.onVictoryQuote?.(winner.id, quote);
    const isArcadeContinue =
      engine.config.mode === 'arcade' &&
      engine.winnerIndex === 0 &&
      (engine.config.arcadeStageIndex ?? 0) < STAGES.length - 1;

    slot.innerHTML = `
      <div class="modal-backdrop interactive" style="background:rgba(5,4,12,0.52);">
        <div class="modal-card" style="max-width:480px;text-align:center;">
          <div style="font-size:0.85rem;font-weight:900;letter-spacing:0.16em;color:var(--gold);">MATCH RESULT</div>
          <h2 style="margin:6px 0;font-size:2rem;color:${winner.def.accentColor};">${winner.def.name.toUpperCase()} WINS!</h2>
          <p style="font-style:italic;color:#e2e8f0;margin:4px 0 18px;">"${quote}"</p>
          <div class="menu-stack">
            ${
              isArcadeContinue
                ? `<button class="mk-btn primary" data-action="arcade-next">Next Arcade Stage →</button>`
                : ''
            }
            <button class="mk-btn ${isArcadeContinue ? '' : 'primary'}" data-action="vic-rematch">Rematch</button>
            <button class="mk-btn" data-action="vic-select">Character &amp; Stage Select</button>
            <button class="mk-btn" data-action="vic-title">Main Menu</button>
          </div>
        </div>
      </div>
    `;

    this.bindButtons({
      'arcade-next': () => this.callbacks.onNextArcadeStage(),
      'vic-rematch': () => { this.voice('ann_rematch'); this.callbacks.onRematch(); },
      'vic-select': () => this.callbacks.onReturnSelect(),
      'vic-title': () => this.callbacks.onReturnTitle(),
    });
  }

  private lastHoverAt = 0;

  private bindButtons(handlers: Record<string, () => void>): void {
    this.root.querySelectorAll<HTMLElement>('[data-action]').forEach((el) => {
      const action = el.dataset.action;
      if (action && handlers[action]) {
        el.addEventListener('click', () => {
          if (this.callbacks.onUISound) this.callbacks.onUISound(uiSoundForAction(action));
          else this.callbacks.onClickSound();
          handlers[action]();
        });
        el.addEventListener('mouseenter', () => {
          const now = performance.now();
          if (now - this.lastHoverAt < 70) return;
          this.lastHoverAt = now;
          this.callbacks.onUISound?.('hover');
        });
      }
    });
  }
}

export type UISoundKind = 'hover' | 'confirm' | 'back' | 'lockin';

/** Which UI sample a menu action plays (PLAN.md §7 UI set). */
export function uiSoundForAction(action: string): UISoundKind {
  if (/^(back-|close-|resume$|vic-title$|vic-select$|title-pause$|select-pause$)/.test(action)) return 'back';
  if (/^p[12]-(bob|cory)$/.test(action) || action === 'start-fight') return 'lockin';
  return 'confirm';
}
