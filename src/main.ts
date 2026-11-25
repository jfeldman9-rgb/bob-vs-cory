import './style.css';
import { Application, Container } from 'pixi.js';
import { AudioEngine } from './audio/AudioEngine';
import { VoiceDirector } from './audio/VoiceDirector';
import { SfxDirector } from './audio/SfxDirector';
import { getStageById, STAGES } from './data/stages';
import { AIController } from './engine/AIController';
import { CombatEngine } from './engine/CombatEngine';
import { FIXED_DT, VIEW_HEIGHT, VIEW_WIDTH } from './engine/constants';
import { InputRouter } from './engine/InputBuffer';
import { loadSaveData, persistSaveData, recordMatchResult } from './engine/SaveData';
import { CameraRig } from './render/CameraRig';
import { FighterRenderer } from './render/FighterRenderer';
import { StageRenderer } from './render/StageRenderer';
import { VFXRenderer } from './render/VFXRenderer';
import { AIDifficulty, GameSettings, MatchConfig } from './types/game';
import { UIManager } from './ui/UIManager';

class BobVsCoryApp {
  private pixi!: Application;
  private world = new Container();
  private stageRenderer = new StageRenderer();
  private fighterRenderer = new FighterRenderer();
  private vfxRenderer = new VFXRenderer();
  private camera = new CameraRig();

  private inputRouter = new InputRouter();
  private save = loadSaveData();
  private audio = new AudioEngine(this.save.settings);
  private voiceDirector = new VoiceDirector(this.audio.voices);
  private sfxDirector = new SfxDirector(this.audio);
  private ui!: UIManager;

  private engine: CombatEngine | null = null;
  private currentConfig: MatchConfig | null = null;
  private aiP1 = new AIController('normal');
  private aiP2 = new AIController('normal');
  private matchRecorded = false;

  private accumulator = 0;
  private lastTime = 0;
  private fpsFrames = 0;
  private fpsTimer = 0;
  private currentFps = 60;
  private renderTick = 0;
  private paused = false;

  public async init(): Promise<void> {
    const canvasHost = document.getElementById('canvas-container')!;
    const uiRoot = document.getElementById('ui-root')!;

    this.pixi = new Application();
    await this.pixi.init({
      width: VIEW_WIDTH,
      height: VIEW_HEIGHT,
      backgroundColor: 0x07060d,
      antialias: true,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      autoDensity: true,
    });
    canvasHost.appendChild(this.pixi.canvas);

    this.world.addChild(this.stageRenderer.container);
    this.world.addChild(this.fighterRenderer.container);
    this.world.addChild(this.vfxRenderer.container);
    this.pixi.stage.addChild(this.world);

    // Preload all fighter sprites & default stage backdrop behind title screen
    await Promise.all([
      this.fighterRenderer.preloadAll(),
      this.stageRenderer.loadStage(STAGES[0]),
    ]);

    this.ui = new UIManager(
      uiRoot,
      {
        onStartMatch: (cfg) => void this.startMatch(cfg),
        onRematch: () => {
          if (this.currentConfig) void this.startMatch(this.currentConfig);
        },
        onNextArcadeStage: () => void this.startNextArcadeStage(),
        onReturnTitle: () => this.returnToTitle(),
        onReturnSelect: () => {
          const mode = this.currentConfig?.mode ?? 'vs-cpu';
          this.stopMatch();
          this.ui.openSelect(mode);
        },
        onSettingsChanged: (s) => this.applySettings(s),
        onPauseToggle: (p) => { this.paused = p; },
        onClickSound: () => this.audio.playUIClick(),
        onUISound: (kind) => this.audio.playUI(kind),
        onVoice: (clipId, delayMs) => {
          this.audio.unlock();
          this.audio.voices.play(clipId, { delayMs });
        },
        onVictoryQuote: (fighter, quote) => this.voiceDirector.speakVictoryQuote(fighter, quote),
      },
      this.inputRouter,
      this.save
    );

    this.ui.showTitle();

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && this.engine && this.ui.screen === 'match') {
        this.ui.togglePause(this.engine);
      }
    });

    window.addEventListener('pointerdown', () => this.audio.unlock(), { once: true });
    window.addEventListener('keydown', () => this.audio.unlock(), { once: true });

    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  private applySettings(settings: GameSettings): void {
    this.save.settings = { ...settings };
    persistSaveData(this.save);
    this.audio.applySettings(settings);
    this.ui.setSave(this.save);
  }

  private returnToTitle(): void {
    this.stopMatch();
    this.audio.setMusic('menu', false);
    this.ui.showTitle();
  }

  private stopMatch(): void {
    this.engine = null;
    this.voiceDirector.detach();
    this.sfxDirector.detach();
    this.audio.voices.stopAll();
    this.audio.stopMatchAudio();
    this.paused = false;
    this.vfxRenderer.clear();
    this.camera.reset();
  }

  private async startMatch(config: MatchConfig): Promise<void> {
    this.audio.unlock();
    this.currentConfig = { ...config };
    this.paused = false;
    this.matchRecorded = false;
    this.vfxRenderer.clear();
    this.camera.reset();

    const stageDef = getStageById(config.stage);
    this.audio.stopMatchAudio();
    await Promise.all([
      this.stageRenderer.loadStage(stageDef),
      this.audio.preloadMatchAudio(config.stage, [config.p1Fighter, config.p2Fighter]),
    ]);

    this.engine = new CombatEngine(config);
    this.aiP1.setDifficulty(config.aiDifficulty);
    this.aiP2.setDifficulty(config.aiDifficulty);

    this.fighterRenderer.applyPalette(0, this.engine.fighters[0]);
    this.fighterRenderer.applyPalette(1, this.engine.fighters[1]);

    this.ui.mountMatchHUD(this.engine);
    this.audio.setMusic(stageDef.musicStyle, false);
    this.audio.setAmbience(config.stage);
  }

  private async startNextArcadeStage(): Promise<void> {
    if (!this.currentConfig) return;
    const nextIdx = (this.currentConfig.arcadeStageIndex ?? 0) + 1;
    const difficulties: AIDifficulty[] = ['easy', 'normal', 'hard', 'very-hard'];
    const nextStage = STAGES[nextIdx % STAGES.length];
    if (nextIdx === STAGES.length - 1) this.audio.voices.play('ann_tower_rival');
    const nextOpp = nextIdx % 2 === 1 ? this.currentConfig.p1Fighter : this.currentConfig.p1Fighter === 'bob' ? 'cory' : 'bob';

    await this.startMatch({
      ...this.currentConfig,
      stage: nextStage.id,
      p2Fighter: nextOpp,
      p2Palette: nextIdx % 4,
      aiDifficulty: difficulties[Math.min(nextIdx, difficulties.length - 1)],
      arcadeStageIndex: nextIdx,
    });
  }

  private processEngineAudio(engine: CombatEngine): void {
    const stageDef = getStageById(engine.config.stage);
    const isFinalRound =
      engine.roundWins[0] === engine.config.roundsToWin - 1 &&
      engine.roundWins[1] === engine.config.roundsToWin - 1;

    if (engine.phase === 'finish_him') {
      this.audio.setMusic('finish_him', true);
    } else if (engine.phase === 'fighting') {
      this.audio.setMusic(stageDef.musicStyle, isFinalRound);
    }

    // ElevenLabs SFX + stings (procedural sounds are the fallback inside SfxDirector/AudioEngine).
    this.sfxDirector.update(engine, engine.events);
    for (const ev of engine.events) {
      if (ev.type === 'announcer' && ev.text) this.audio.speakAnnouncer(ev.text, isFinalRound);
    }

    this.voiceDirector.update(engine, engine.events);

    // Record persistent save stats once per completed match
    if (engine.phase === 'match_over' && !this.matchRecorded && engine.winnerIndex !== null) {
      this.matchRecorded = true;
      const w = engine.fighters[engine.winnerIndex];
      const l = engine.fighters[1 - engine.winnerIndex];
      const wasFatality = engine.announcer?.style === 'fatality';
      const wasBrutality = engine.announcer?.style === 'brutality';
      recordMatchResult(
        this.save,
        w.id,
        l.id,
        wasFatality,
        wasBrutality,
        Math.max(engine.comboCounts[0], engine.comboCounts[1]),
        Math.max(engine.comboDamage[0], engine.comboDamage[1])
      );
      if (
        engine.config.mode === 'arcade' &&
        engine.winnerIndex === 0 &&
        (engine.config.arcadeStageIndex ?? 0) >= STAGES.length - 1
      ) {
        this.save.arcadeClears++;
        this.audio.voices.play('ann_tower_complete', { delayMs: 5200 });
        persistSaveData(this.save);
      }
      this.ui.setSave(this.save);
    }
  }

  private loop(now: number): void {
    const dt = Math.min(0.1, (now - this.lastTime) / 1000);
    this.lastTime = now;
    this.renderTick++;

    // FPS measurement
    this.fpsFrames++;
    this.fpsTimer += dt;
    if (this.fpsTimer >= 0.5) {
      this.currentFps = Math.round(this.fpsFrames / this.fpsTimer);
      this.fpsFrames = 0;
      this.fpsTimer = 0;
    }

    if (this.engine && !this.paused) {
      this.accumulator += dt;
      let steps = 0;
      while (this.accumulator >= FIXED_DT && steps < 4) {
        const mode = this.engine.config.mode;
        const p1Input =
          mode === 'cpu-vs-cpu'
            ? this.aiP1.computeInput(this.engine, 0)
            : this.inputRouter.pollPlayer(0, mode !== 'vs-p2');

        const p2Input =
          mode === 'vs-p2'
            ? this.inputRouter.pollPlayer(1, false)
            : mode === 'training'
            ? {
                left: false, right: false, up: false, down: false,
                p1: false, p2: false, k1: false, k2: false,
                block: false, ex: false, fatalBlow: false, taunt: false,
              }
            : this.aiP2.computeInput(this.engine, 1);

        this.engine.step(p1Input, p2Input);
        this.vfxRenderer.ingestEvents(this.engine.events);
        this.processEngineAudio(this.engine);

        this.accumulator -= FIXED_DT;
        steps++;
      }

      // Render 2.5D scene
      this.camera.update(this.engine, this.save.settings.screenShake);
      this.camera.applyToContainer(this.world);

      const dimAmount =
        this.engine.cinematic.type !== 'none'
          ? this.engine.cinematic.dimAmount
          : this.engine.phase === 'finish_him'
          ? 0.65
          : 0;

      this.stageRenderer.update(this.camera.x, dimAmount);
      this.fighterRenderer.render(
        this.engine.fighters,
        this.engine.config.mode === 'training' && this.engine.training.showHitboxes,
        this.renderTick
      );
      this.vfxRenderer.render(this.engine);
      this.ui.updateMatchHUD(this.engine, this.currentFps);
    } else if (!this.engine) {
      // Animate background stage subtly behind menus
      this.camera.applyToContainer(this.world);
      this.stageRenderer.update(1000 + Math.sin(this.renderTick * 0.008) * 180, 0.35);
    }

    requestAnimationFrame((t) => this.loop(t));
  }
}

const app = new BobVsCoryApp();
void app.init();
