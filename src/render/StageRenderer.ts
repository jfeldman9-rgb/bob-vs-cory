import { Assets, Container, Graphics, Sprite, Texture } from 'pixi.js';
import { StageDefinition } from '../data/stages';
import { GROUND_Y, STAGE_LEFT, STAGE_RIGHT } from '../engine/constants';

interface WeatherParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: number;
}

export class StageRenderer {
  public readonly container = new Container();
  private bgLayer = new Container();
  private midLayer = new Container();
  private floorLayer = new Container();
  private weatherGfx = new Graphics();
  private dynamicPropsGfx = new Graphics();
  private dimOverlay = new Graphics();

  private currentStage: StageDefinition | null = null;
  private bgSprite: Sprite | null = null;
  private particles: WeatherParticle[] = [];
  private tick = 0;

  constructor() {
    this.container.addChild(this.bgLayer);
    this.container.addChild(this.midLayer);
    this.container.addChild(this.dynamicPropsGfx);
    this.container.addChild(this.floorLayer);
    this.container.addChild(this.weatherGfx);
    this.container.addChild(this.dimOverlay);
  }

  public async loadStage(stage: StageDefinition): Promise<void> {
    this.currentStage = stage;
    this.bgLayer.removeChildren();
    this.midLayer.removeChildren();
    this.floorLayer.removeChildren();
    this.bgSprite = null;

    const stageSpan = STAGE_RIGHT - STAGE_LEFT + 600;
    const startX = STAGE_LEFT - 300;

    // 1. Painted background image (or rich procedural Scottsdale courtyard!)
    if (stage.imagePath) {
      try {
        const tex = await Assets.load<Texture>(stage.imagePath);
        const sp = new Sprite(tex);
        sp.x = startX;
        sp.y = -110;
        sp.width = stageSpan;
        sp.height = 880;
        this.bgLayer.addChild(sp);
        this.bgSprite = sp;
      } catch {
        this.drawProceduralBackdrop(stage, startX, stageSpan);
      }
    } else {
      this.drawProceduralBackdrop(stage, startX, stageSpan);
    }

    // 2. Ground plane & stage boundary markers (subtle perspective floor polish)
    const floor = new Graphics();
    floor.rect(startX, GROUND_Y - 12, stageSpan, 240);
    floor.fill({ color: stage.floorColor, alpha: 0.48 });

    // Glowing floor horizon trim
    floor.rect(startX, GROUND_Y - 14, stageSpan, 3);
    floor.fill({ color: stage.floorGlowColor, alpha: 0.65 });

    // Perspective floor grid lines
    for (let x = startX; x <= startX + stageSpan; x += 140) {
      floor.moveTo(x, GROUND_Y - 12);
      floor.lineTo(x + (x - 1000) * 0.35, GROUND_Y + 210);
      floor.stroke({ width: 1.5, color: stage.floorGlowColor, alpha: 0.22 });
    }
    this.floorLayer.addChild(floor);

    // 3. Seed weather particles
    this.particles = [];
    const count = stage.weather === 'matrix_rain' ? 95 : 70;
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(stage, startX, stageSpan, true));
    }
  }

  private drawProceduralBackdrop(stage: StageDefinition, startX: number, span: number): void {
    const g = new Graphics();
    // Rich multi-layer Scottsdale Midnight VIP Lounge Courtyard!
    // Sky gradient bands (deep indigo to desert violet)
    const bands = [0x070a1c, 0x0d1230, 0x1a1540, 0x2d184a, 0x451f4c];
    const bandH = 140;
    bands.forEach((col, idx) => {
      g.rect(startX, -110 + idx * bandH, span, bandH + 2);
      g.fill(col);
    });

    // Stars & glowing crescent desert moon
    for (let i = 0; i < 85; i++) {
      const sx = startX + ((i * 271) % span);
      const sy = -80 + ((i * 113) % 340);
      g.circle(sx, sy, (i % 3 === 0 ? 2 : 1.2));
      g.fill({ color: 0xfff8e7, alpha: 0.45 + (i % 5) * 0.1 });
    }
    g.circle(startX + span * 0.72, 75, 48);
    g.fill({ color: 0xfef3c7, alpha: 0.85 });
    g.circle(startX + span * 0.72 + 16, 65, 42);
    g.fill(0x0d1230);

    // Distant Camelback desert mesas silhouette
    g.moveTo(startX, 460);
    g.lineTo(startX + 350, 340);
    g.lineTo(startX + 620, 390);
    g.lineTo(startX + 1050, 295);
    g.lineTo(startX + 1480, 370);
    g.lineTo(startX + 1850, 315);
    g.lineTo(startX + span, 440);
    g.lineTo(startX + span, 640);
    g.lineTo(startX, 640);
    g.closePath();
    g.fill(0x140f26);

    // Modern Scottsdale VIP Lounge courtyard architecture + neon signs
    g.rect(startX + 260, 270, span - 520, 350);
    g.fill({ color: 0x1a162b, alpha: 0.9 });

    // Glowing teal & magenta neon strips along courtyard awning
    g.rect(startX + 260, 270, span - 520, 6);
    g.fill(0x00e5ff);
    g.rect(startX + 320, 320, span - 640, 4);
    g.fill(0xff2ec4);

    // Silhouetted palm trees framing the courtyard
    const palmXs = [startX + 340, startX + 680, startX + span - 680, startX + span - 340];
    for (const px of palmXs) {
      g.moveTo(px - 10, 615);
      g.lineTo(px + 6, 210);
      g.lineTo(px + 20, 210);
      g.lineTo(px + 12, 615);
      g.closePath();
      g.fill(0x0b0816);
      // Fronds
      for (let a = 0; a < 7; a++) {
        const ang = -Math.PI + (a / 6) * Math.PI;
        const fx = px + 12 + Math.cos(ang) * 125;
        const fy = 215 + Math.sin(ang) * 65 + 25;
        g.moveTo(px + 12, 212);
        g.quadraticCurveTo(px + 12 + Math.cos(ang) * 65, 175, fx, fy);
        g.stroke({ width: 9, color: 0x0b0816 });
      }
    }

    // Warm string lights draped across courtyard
    for (let x = startX + 300; x <= startX + span - 300; x += 56) {
      const sag = Math.sin(((x - startX) / span) * Math.PI * 4) * 18;
      g.circle(x, 250 + sag, 4.5);
      g.fill({ color: 0xffd166, alpha: 0.92 });
    }

    // Stone patio floor
    g.rect(startX, GROUND_Y - 12, span, 240);
    g.fill(0x231d30);

    this.bgLayer.addChild(g);
    void stage;
  }

  private createParticle(
    stage: StageDefinition,
    startX: number,
    span: number,
    randomY: boolean
  ): WeatherParticle {
    const x = startX + Math.random() * span;
    const y = randomY ? -80 + Math.random() * 720 : -60;
    if (stage.weather === 'matrix_rain') {
      return {
        x,
        y,
        vx: -1.2,
        vy: 8 + Math.random() * 7,
        size: 14 + Math.random() * 18,
        alpha: 0.25 + Math.random() * 0.45,
        color: 0x00ff7f,
      };
    }
    if (stage.weather === 'disco_glitter') {
      const colors = [0xff2ec4, 0x00f0ff, 0xffd700, 0xffffff];
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 1.4,
        vy: 1.2 + Math.random() * 2.2,
        size: 3 + Math.random() * 3.5,
        alpha: 0.5 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    }
    if (stage.weather === 'embers') {
      return {
        x,
        y: randomY ? Math.random() * 680 : 650,
        vx: (Math.random() - 0.5) * 1.8,
        vy: -(1.5 + Math.random() * 2.8),
        size: 2.5 + Math.random() * 3,
        alpha: 0.45 + Math.random() * 0.5,
        color: Math.random() < 0.5 ? 0xff9f1c : 0xffd700,
      };
    }
    // desert_neon
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 0.8,
      vy: 0.6 + Math.random() * 1.4,
      size: 2.5 + Math.random() * 2.5,
      alpha: 0.35 + Math.random() * 0.45,
      color: Math.random() < 0.5 ? 0x00e5ff : 0xff2ec4,
    };
  }

  public update(cameraX: number, dimAmount: number): void {
    this.tick++;
    if (!this.currentStage) return;

    // Subtle parallax shift on background layer
    const parallaxOffset = (cameraX - 1000) * 0.16;
    this.bgLayer.x = parallaxOffset;

    // Stage-specific animated props!
    this.dynamicPropsGfx.clear();
    const g = this.dynamicPropsGfx;

    if (this.currentStage.id === 'matrix-subway') {
      // Passing subway train light streak every ~5 seconds
      const cycle = this.tick % 320;
      if (cycle < 55) {
        const tx = STAGE_LEFT - 400 + (cycle / 55) * 2800;
        g.rect(tx, 340, 420, 145);
        g.fill({ color: 0x00ff7f, alpha: 0.16 });
        for (let w = 0; w < 5; w++) {
          g.rect(tx + 30 + w * 78, 365, 52, 48);
          g.fill({ color: 0xb7ffd9, alpha: 0.35 });
        }
      }
      // Flickering fluorescent ceiling glow
      if (Math.sin(this.tick * 0.27) > -0.6) {
        g.rect(400, 35, 320, 8);
        g.fill({ color: 0x00ff7f, alpha: 0.35 });
        g.rect(1280, 35, 320, 8);
        g.fill({ color: 0x00ff7f, alpha: 0.35 });
      }
    } else if (this.currentStage.id === 'disco-penthouse') {
      // Volumetric sweeping spotlights!
      const s1 = 760 + Math.sin(this.tick * 0.03) * 320;
      const s2 = 1240 + Math.cos(this.tick * 0.035) * 320;
      g.moveTo(650, -60);
      g.lineTo(s1 - 95, GROUND_Y + 40);
      g.lineTo(s1 + 95, GROUND_Y + 40);
      g.closePath();
      g.fill({ color: 0xff2ec4, alpha: 0.13 });

      g.moveTo(1350, -60);
      g.lineTo(s2 - 95, GROUND_Y + 40);
      g.lineTo(s2 + 95, GROUND_Y + 40);
      g.closePath();
      g.fill({ color: 0x00f0ff, alpha: 0.12 });
    } else if (this.currentStage.id === 'eggplant-colosseum') {
      // Flickering torch firelight pools + occasional purple lightning
      const pulse = 0.22 + Math.sin(this.tick * 0.2) * 0.06;
      [480, 1520].forEach((tx) => {
        g.circle(tx, 395, 78);
        g.fill({ color: 0xff8c00, alpha: pulse });
      });
      if (this.tick % 290 === 0 || this.tick % 290 === 3) {
        g.rect(STAGE_LEFT - 300, -110, 2600, 900);
        g.fill({ color: 0xd8b4fe, alpha: 0.16 });
      }
    } else if (this.currentStage.id === 'scottsdale-lounge') {
      // Flickering courtyard fire pits!
      [620, 1380].forEach((fx) => {
        const fh = 26 + Math.sin(this.tick * 0.3 + fx) * 8;
        g.circle(fx, 560, 44);
        g.fill({ color: 0xff6b00, alpha: 0.18 });
        g.moveTo(fx - 18, 575);
        g.lineTo(fx, 575 - fh);
        g.lineTo(fx + 18, 575);
        g.closePath();
        g.fill({ color: 0xffb703, alpha: 0.78 });
      });
    }

    // Weather particles
    this.weatherGfx.clear();
    const startX = STAGE_LEFT - 300;
    const span = STAGE_RIGHT - STAGE_LEFT + 600;
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y > 700 || p.y < -100 || p.x < startX - 40 || p.x > startX + span + 40) {
        Object.assign(p, this.createParticle(this.currentStage, startX, span, false));
      }
      if (this.currentStage.weather === 'matrix_rain') {
        this.weatherGfx.rect(p.x, p.y, 2, p.size);
        this.weatherGfx.fill({ color: p.color, alpha: p.alpha });
      } else {
        this.weatherGfx.circle(p.x, p.y, p.size);
        this.weatherGfx.fill({ color: p.color, alpha: p.alpha * (0.65 + 0.35 * Math.sin(this.tick * 0.15 + p.x)) });
      }
    }

    // FINISH HIM! / Cinematic lighting dim (65%+)
    this.dimOverlay.clear();
    if (dimAmount > 0.01) {
      this.dimOverlay.rect(STAGE_LEFT - 400, -150, STAGE_RIGHT - STAGE_LEFT + 800, 1000);
      this.dimOverlay.fill({ color: 0x05020a, alpha: dimAmount });
    }
  }
}
