import { Assets, ColorMatrixFilter, Container, Graphics, Sprite, Texture } from 'pixi.js';
import { Fighter } from '../engine/Fighter';
import { GROUND_Y } from '../engine/constants';
import { FighterId, PoseName } from '../types/game';

const SPRITE_PATHS: Record<FighterId, Record<PoseName, string>> = {
  bob: {
    idle: './assets/fighters/bob-idle.png',
    punch: './assets/fighters/bob-punch.png',
    kick: './assets/fighters/bob-kick.png',
    special: './assets/fighters/bob-special.png',
    crouch: './assets/fighters/bob-crouch.png',
    block: './assets/fighters/bob-block.png',
    hurt: './assets/fighters/bob-hurt.png',
  },
  cory: {
    idle: './assets/fighters/cory-idle.png',
    punch: './assets/fighters/cory-special.png',
    kick: './assets/fighters/cory-kick.png',
    special: './assets/fighters/cory-special.png',
    crouch: './assets/fighters/cory-block.png',
    block: './assets/fighters/cory-block.png',
    hurt: './assets/fighters/cory-hurt.png',
  },
};

export class FighterRenderer {
  public readonly container = new Container();
  private textures: Record<FighterId, Partial<Record<PoseName, Texture>>> = {
    bob: {},
    cory: {},
  };

  private shadowGfx = new Graphics();
  private afterimageLayer = new Container();
  private spritePair: [Sprite, Sprite] = [new Sprite(), new Sprite()];
  private auraGfx = new Graphics();
  private debugGfx = new Graphics();
  private paletteFilters: [ColorMatrixFilter, ColorMatrixFilter] = [
    new ColorMatrixFilter(),
    new ColorMatrixFilter(),
  ];
  private loaded = false;

  constructor() {
    this.container.addChild(this.shadowGfx);
    this.container.addChild(this.afterimageLayer);
    this.container.addChild(this.auraGfx);
    for (let i = 0; i < 2; i++) {
      this.spritePair[i].anchor.set(0.5, 1.0);
      this.container.addChild(this.spritePair[i]);
    }
    this.container.addChild(this.debugGfx);
  }

  public async preloadAll(): Promise<void> {
    if (this.loaded) return;
    const jobs: Promise<void>[] = [];
    (['bob', 'cory'] as FighterId[]).forEach((fid) => {
      (Object.keys(SPRITE_PATHS[fid]) as PoseName[]).forEach((pose) => {
        const path = SPRITE_PATHS[fid][pose];
        jobs.push(
          Assets.load<Texture>(path)
            .then((tex) => {
              this.textures[fid][pose] = tex;
            })
            .catch(() => {
              // Fallback handled gracefully at render time
            })
        );
      });
    });
    await Promise.all(jobs);
    this.loaded = true;
  }

  public applyPalette(playerIndex: 0 | 1, fighter: Fighter): void {
    const pal = fighter.def.palettes[fighter.paletteIndex] ?? fighter.def.palettes[0];
    const f = this.paletteFilters[playerIndex];
    f.reset();
    if (pal.hueRotate !== 0) f.hue(pal.hueRotate, false);
    if (pal.saturate !== 1) f.saturate(pal.saturate - 1, true);
    if (pal.brightness !== 1) f.brightness(pal.brightness, true);
    this.spritePair[playerIndex].filters = pal.hueRotate === 0 && pal.saturate === 1 && pal.brightness === 1 ? [] : [f];
  }

  public render(fighters: [Fighter, Fighter], showHitboxes: boolean, globalTick: number): void {
    this.shadowGfx.clear();
    this.auraGfx.clear();
    this.debugGfx.clear();
    this.afterimageLayer.removeChildren();

    for (let i = 0; i < 2; i++) {
      const f = fighters[i];
      const sp = this.spritePair[i];
      const pose = f.getCurrentPose();
      const tex = this.textures[f.id][pose] ?? this.textures[f.id].idle;
      if (tex) {
        sp.texture = tex;
      }

      // Ground contact shadow (shrinks when airborne)
      const airHeight = Math.max(0, GROUND_Y - f.y);
      const shadowScale = Math.max(0.35, 1 - airHeight / 340);
      this.shadowGfx.ellipse(f.x, GROUND_Y + 4, 62 * shadowScale, 15 * shadowScale);
      this.shadowGfx.fill({ color: 0x000000, alpha: 0.52 * shadowScale });

      // Render afterimages (dashes / runway strut)
      for (const ai of f.afterimages) {
        const aiTex = this.textures[f.id][ai.pose] ?? this.textures[f.id].idle;
        if (!aiTex) continue;
        const ghost = new Sprite(aiTex);
        ghost.anchor.set(0.5, 1.0);
        ghost.x = ai.x;
        ghost.y = ai.y;
        ghost.scale.set(ai.facing * 0.5, 0.5);
        ghost.alpha = ai.alpha;
        ghost.tint = ai.tint;
        this.afterimageLayer.addChild(ghost);
      }

      // Base sprite height ~270px in world coordinates (540px * 0.5)
      let baseScaleX = 0.52;
      let baseScaleY = 0.52;
      let offsetY = 0;
      let offsetX = 0;
      let rot = 0;

      // Dynamic procedural animation polish per FSM state!
      if (f.state === 'idle') {
        const breath = Math.sin(globalTick * 0.09 + i * 2) * 0.015;
        baseScaleY += breath;
        baseScaleX -= breath * 0.6;
      } else if (f.state === 'walk_fwd' || f.state === 'walk_back') {
        const stride = Math.sin(globalTick * 0.28);
        offsetY = -Math.abs(stride) * 7;
        rot = (f.state === 'walk_fwd' ? 0.05 : -0.05) * f.facing;
      } else if (f.state === 'crouch' || f.state === 'block_crouch') {
        baseScaleY *= f.id === 'cory' ? 0.78 : 0.86;
        baseScaleX *= 1.06;
      } else if (f.state === 'jump') {
        rot = f.vy * 0.008 * f.facing;
        baseScaleY *= 1.04;
      } else if (f.state === 'attack' || f.state === 'fatal_blow') {
        const lunge = Math.sin(Math.min(1, f.moveFrame / 8) * Math.PI) * 14;
        offsetX = f.facing * lunge;
        baseScaleX *= 1.05;
      } else if (f.state === 'hitstun' || f.state === 'launch') {
        rot = -f.facing * (f.state === 'launch' ? 0.34 : 0.14);
        offsetX = -f.facing * 8;
      } else if (f.state === 'knockdown' || f.state === 'defeat') {
        rot = -f.facing * 1.38;
        offsetY = -28;
      } else if (f.state === 'dizzy') {
        rot = Math.sin(globalTick * 0.14) * 0.18;
        offsetX = Math.sin(globalTick * 0.14) * 10;
      } else if (f.state === 'parry') {
        rot = -f.facing * (f.id === 'bob' ? 0.32 : 0.12); // Bob's Matrix back-bend!
      } else if (f.state === 'victory' || f.state === 'taunt') {
        const glowCol = f.id === 'bob' ? 0x00ff7f : 0xff2ec4;
        this.auraGfx.circle(f.x, f.y - 135, 95 + Math.sin(globalTick * 0.15) * 12);
        this.auraGfx.fill({ color: glowCol, alpha: 0.18 });
      }

      // Restrained by Agent Bob Clone Grapple!
      if (f.restrainedFrames > 0) {
        this.auraGfx.rect(f.x - 58, f.y - 215, 116, 215);
        this.auraGfx.stroke({ width: 3, color: 0x00ff7f, alpha: 0.85 });
      }

      // Fatal Blow Ready red/gold pulse aura!
      if (f.canUseFatalBlow() && f.state !== 'defeat') {
        const pulse = 0.14 + Math.sin(globalTick * 0.22) * 0.08;
        this.auraGfx.ellipse(f.x, f.y - 125, 72, 130);
        this.auraGfx.fill({ color: 0xff2a55, alpha: pulse });
      }

      // Armor / Parry glow
      if (f.state === 'parry' || f.currentMove?.armor) {
        this.auraGfx.ellipse(f.x, f.y - 130, 82, 138);
        this.auraGfx.stroke({ width: 4, color: 0xffd700, alpha: 0.85 });
      }

      sp.x = f.x + offsetX;
      sp.y = f.y + offsetY;
      sp.scale.set(f.facing * baseScaleX, baseScaleY);
      sp.rotation = rot;

      // Hit-flash whiteout / low-HP slight tint
      if (f.hitFlashFrames > 0) {
        sp.tint = f.hitFlashFrames % 2 === 0 ? 0xff7777 : 0xffffff;
      } else if (f.state === 'flawless_block') {
        sp.tint = 0x7dd3fc;
      } else if (f.state === 'up_block') {
        sp.tint = 0xd8b4fe;
      } else {
        sp.tint = 0xffffff;
      }

      // Hitbox / Hurtbox / Pushbox debug overlay
      if (showHitboxes) {
        const pb = f.getPushbox();
        this.debugGfx.rect(pb.x, pb.y, pb.w, pb.h);
        this.debugGfx.stroke({ width: 2, color: 0xfacc15, alpha: 0.8 });

        const hurt = f.getHurtbox();
        this.debugGfx.rect(hurt.x, hurt.y, hurt.w, hurt.h);
        this.debugGfx.fill({ color: 0x22c55e, alpha: 0.16 });
        this.debugGfx.stroke({ width: 2, color: 0x22c55e, alpha: 0.9 });

        const hit = f.getActiveHitbox();
        if (hit) {
          this.debugGfx.rect(hit.x, hit.y, hit.w, hit.h);
          this.debugGfx.fill({ color: 0xef4444, alpha: 0.35 });
          this.debugGfx.stroke({ width: 2.5, color: 0xef4444, alpha: 1 });
        }
      }
    }
  }
}
