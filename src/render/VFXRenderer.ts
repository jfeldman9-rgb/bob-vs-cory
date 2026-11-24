import { Container, Graphics } from 'pixi.js';
import { CombatEngine, SimEvent } from '../engine/CombatEngine';
import { GROUND_Y } from '../engine/constants';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: number;
  gravity: number;
}

interface Ring {
  x: number;
  y: number;
  r: number;
  maxR: number;
  color: number;
  alpha: number;
}

export class VFXRenderer {
  public readonly container = new Container();
  private projGfx = new Graphics();
  private sparkGfx = new Graphics();
  private cinematicGfx = new Graphics();

  private sparks: Spark[] = [];
  private rings: Ring[] = [];
  private tick = 0;

  constructor() {
    this.container.addChild(this.projGfx);
    this.container.addChild(this.sparkGfx);
    this.container.addChild(this.cinematicGfx);
  }

  public clear(): void {
    this.sparks.length = 0;
    this.rings.length = 0;
    this.projGfx.clear();
    this.sparkGfx.clear();
    this.cinematicGfx.clear();
  }

  public ingestEvents(events: SimEvent[]): void {
    for (const ev of events) {
      const x = ev.x ?? 1000;
      const y = ev.y ?? 480;
      if (ev.type === 'hit') {
        const col = ev.fighterId === 'bob' ? 0x00ff7f : ev.fighterId === 'cory' ? 0xff2ec4 : 0xffd700;
        this.spawnBurst(x, y, ev.heavy ? 24 : 12, col, ev.heavy ? 11 : 7);
        this.spawnBurst(x, y, ev.heavy ? 12 : 6, 0xffffff, 8);
        this.rings.push({ x, y, r: 12, maxR: ev.heavy ? 125 : 70, color: col, alpha: 0.95 });
      } else if (ev.type === 'block') {
        this.spawnBurst(x, y, 8, 0x94a3b8, 5);
        this.rings.push({ x, y, r: 14, maxR: 58, color: 0xe2e8f0, alpha: 0.75 });
      } else if (ev.type === 'flawless_block' || ev.type === 'up_block') {
        const col = ev.type === 'flawless_block' ? 0x38bdf8 : 0xc084fc;
        this.spawnBurst(x, y, 18, col, 9);
        this.rings.push({ x, y, r: 18, maxR: 110, color: col, alpha: 0.95 });
      } else if (ev.type === 'parry' || ev.type === 'combo_breaker') {
        this.spawnBurst(x, y, 28, 0xffd700, 12);
        this.rings.push({ x, y, r: 20, maxR: 160, color: 0xffd700, alpha: 1 });
      } else if (ev.type === 'teleport') {
        this.spawnBurst(x, y, 22, 0x00ff7f, 8);
        this.rings.push({ x, y, r: 10, maxR: 95, color: 0x00ff7f, alpha: 0.9 });
      } else if (ev.type === 'wall_bounce') {
        this.spawnBurst(x, y, 16, 0xfacc15, 9);
      } else if (ev.type === 'taunt') {
        const col = ev.fighterId === 'bob' ? 0x00ff7f : 0xff2ec4;
        this.spawnBurst(x, y, 14, col, 5);
      } else if (ev.type === 'fatality_start' || ev.type === 'brutality_start') {
        this.spawnBurst(x, y, 36, 0xa855f7, 13);
        this.rings.push({ x, y, r: 20, maxR: 220, color: 0xa855f7, alpha: 1 });
      }
    }
  }

  private spawnBurst(x: number, y: number, count: number, color: number, speed: number): void {
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = (0.35 + Math.random() * 0.85) * speed;
      this.sparks.push({
        x,
        y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 1.5,
        life: 16 + Math.floor(Math.random() * 16),
        maxLife: 32,
        size: 3 + Math.random() * 4.5,
        color,
        gravity: 0.28,
      });
    }
  }

  /**
   * Draws a stylized comic/wireframe eggplant at (cx, cy) with radius scale.
   */
  private drawEggplant(
    g: Graphics,
    cx: number,
    cy: number,
    scale: number,
    wireframe: boolean,
    disco: boolean
  ): void {
    // Eggplant body (curved plump aubergine silhouette)
    const bodyCol = wireframe ? 0x00ff7f : disco ? 0xd946ef : 0x6b21a8;
    const strokeCol = wireframe ? 0xb7ffd9 : disco ? 0xffffff : 0xc084fc;

    g.ellipse(cx, cy + 8 * scale, 22 * scale, 34 * scale);
    g.fill({ color: bodyCol, alpha: wireframe ? 0.35 : 0.95 });
    g.stroke({ width: Math.max(2, 3 * scale), color: strokeCol, alpha: 0.95 });

    // Specular highlight / wireframe grid lines
    if (wireframe) {
      for (let i = -2; i <= 2; i++) {
        g.moveTo(cx - 18 * scale, cy + (8 + i * 10) * scale);
        g.lineTo(cx + 18 * scale, cy + (8 + i * 10) * scale);
        g.stroke({ width: 1.5, color: 0x00ff7f, alpha: 0.85 });
      }
    } else if (disco) {
      // Mirror-tiled disco eggplant facets!
      for (let row = -2; row <= 2; row++) {
        for (let col = -1; col <= 1; col++) {
          const shimmer = ((this.tick >> 2) + row + col) % 2 === 0 ? 0xffffff : 0xf0abfc;
          g.rect(cx + col * 10 * scale - 4 * scale, cy + (8 + row * 10) * scale - 4 * scale, 8 * scale, 8 * scale);
          g.fill({ color: shimmer, alpha: 0.8 });
        }
      }
    } else {
      g.ellipse(cx - 7 * scale, cy + 2 * scale, 6 * scale, 16 * scale);
      g.fill({ color: 0xe9d5ff, alpha: 0.45 });
    }

    // Green stem & calyx cap
    g.moveTo(cx - 12 * scale, cy - 22 * scale);
    g.lineTo(cx, cy - 34 * scale);
    g.lineTo(cx + 12 * scale, cy - 22 * scale);
    g.lineTo(cx + 4 * scale, cy - 16 * scale);
    g.lineTo(cx - 4 * scale, cy - 16 * scale);
    g.closePath();
    g.fill(0x22c55e);
  }

  public render(engine: CombatEngine): void {
    this.tick++;
    this.projGfx.clear();
    this.sparkGfx.clear();
    this.cinematicGfx.clear();

    // 1. Ambient Cory glitter trail when moving/attacking
    for (const f of engine.fighters) {
      if (f.id === 'cory' && (f.state === 'attack' || f.state === 'dash_fwd' || f.state === 'dash_back') && this.tick % 2 === 0) {
        this.sparks.push({
          x: f.x + (Math.random() - 0.5) * 40,
          y: f.y - 80 - Math.random() * 110,
          vx: -f.facing * (1 + Math.random() * 2),
          vy: -0.5 + Math.random() * 1.5,
          life: 18,
          maxLife: 18,
          size: 3.5,
          color: Math.random() < 0.5 ? 0xff2ec4 : 0xffd700,
          gravity: 0.05,
        });
      }
      // Cory Boa Whip visual arc
      if (f.id === 'cory' && f.state === 'attack' && f.currentMove?.specialEffect === 'boa_whip') {
        const g = this.projGfx;
        const reach = f.facing * 200;
        g.moveTo(f.x + f.facing * 25, f.y - 135);
        g.quadraticCurveTo(f.x + reach * 0.55, f.y - 175 + Math.sin(this.tick * 0.6) * 28, f.x + reach, f.y - 125);
        g.stroke({ width: 14, color: 0xff2ec4, alpha: 0.85 });
        g.moveTo(f.x + f.facing * 25, f.y - 135);
        g.quadraticCurveTo(f.x + reach * 0.55, f.y - 175 + Math.sin(this.tick * 0.6) * 28, f.x + reach, f.y - 125);
        g.stroke({ width: 5, color: 0xffd700, alpha: 0.9 });
      }
    }

    // 2. Render active projectiles & traps
    for (const p of engine.projectiles) {
      const g = this.projGfx;
      if (p.kind === 'eggplant') {
        this.drawEggplant(g, p.x, p.y, p.ex ? 1.15 : 0.95, true, false);
      } else if (p.kind === 'glitter' || p.kind === 'glitter_cloud') {
        const rad = p.kind === 'glitter_cloud' ? 52 + Math.sin(this.tick * 0.3) * 8 : 26;
        g.circle(p.x, p.y, rad);
        g.fill({ color: 0xff2ec4, alpha: p.kind === 'glitter_cloud' ? 0.38 : 0.72 });
        g.circle(p.x, p.y, rad * 0.55);
        g.fill({ color: 0xffd700, alpha: 0.75 });
        // Sparkle cross
        g.moveTo(p.x - rad, p.y); g.lineTo(p.x + rad, p.y);
        g.moveTo(p.x, p.y - rad); g.lineTo(p.x, p.y + rad);
        g.stroke({ width: 3, color: 0xffffff, alpha: 0.9 });
      } else if (p.kind === 'disco_ball') {
        // Mirror-tiled Disco Ball Drop!
        g.moveTo(p.x, -40);
        g.lineTo(p.x, p.y - 36);
        g.stroke({ width: 3, color: 0xe2e8f0, alpha: 0.8 });
        g.circle(p.x, p.y, 40);
        g.fill(0xc084fc);
        g.stroke({ width: 3, color: 0xffffff, alpha: 0.95 });
        for (let a = 0; a < 6; a++) {
          const ang = this.tick * 0.12 + (a * Math.PI) / 3;
          g.moveTo(p.x, p.y);
          g.lineTo(p.x + Math.cos(ang) * 95, p.y + Math.sin(ang) * 95);
          g.stroke({ width: 2, color: a % 2 === 0 ? 0xff2ec4 : 0x00f0ff, alpha: 0.55 });
        }
      } else if (p.kind === 'clone') {
        // Agent Bob digital green clone silhouette!
        g.roundRect(p.x - 32, p.y - 90, 64, 180, 12);
        g.fill({ color: 0x00ff7f, alpha: 0.32 });
        g.stroke({ width: 3, color: 0x00ff7f, alpha: 0.9 });
        g.circle(p.x, p.y - 68, 20);
        g.fill({ color: 0x00ff7f, alpha: 0.5 });
      }
    }

    // 3. Render sparks & shockwave rings
    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += s.gravity;
      s.life--;
      if (s.life <= 0) {
        this.sparks.splice(i, 1);
        continue;
      }
      const a = s.life / s.maxLife;
      this.sparkGfx.circle(s.x, s.y, s.size * a);
      this.sparkGfx.fill({ color: s.color, alpha: a });
    }

    for (let i = this.rings.length - 1; i >= 0; i--) {
      const r = this.rings[i];
      r.r += (r.maxR - r.r) * 0.24;
      r.alpha -= 0.08;
      if (r.alpha <= 0) {
        this.rings.splice(i, 1);
        continue;
      }
      this.sparkGfx.circle(r.x, r.y, r.r);
      this.sparkGfx.stroke({ width: 4, color: r.color, alpha: r.alpha });
    }

    // 4. Scripted Fatal Blow, Eggplant Fatality & Brutality Cinematics!
    if (engine.cinematic.type !== 'none') {
      this.renderCinematic(engine);
    }
  }

  private renderCinematic(engine: CombatEngine): void {
    const c = engine.cinematic;
    const g = this.cinematicGfx;
    const perf = engine.fighters[c.performerIndex];
    const victim = engine.fighters[1 - c.performerIndex];

    if (c.type === 'fatal_blow') {
      if (c.fighterId === 'bob') {
        // Bob "System Purge": Green Matrix code streaks + sunglasses lens flare + giant wireframe eggplant uppercut!
        for (let i = 0; i < 18; i++) {
          const rx = victim.x - 240 + i * 28;
          const ry = ((c.frame * 14 + i * 73) % 520) + 80;
          g.rect(rx, ry, 4, 42);
          g.fill({ color: 0x00ff7f, alpha: 0.7 });
        }
        // Sunglasses lens flare on Bob
        if (c.frame < 40) {
          g.moveTo(perf.x - 140, perf.y - 210);
          g.lineTo(perf.x + 140, perf.y - 210);
          g.stroke({ width: 5, color: 0x00ff7f, alpha: 0.95 });
        }
        if (c.frame >= 85) {
          const rise = (c.frame - 85) * 4;
          this.drawEggplant(g, victim.x, GROUND_Y - 70 - rise, 2.2, true, false);
        }
      } else {
        // Cory "Showstopper": Paparazzi flash strobes + giant mirror disco ball slam!
        if (c.frame % 16 < 3) {
          g.rect(victim.x - 500, 0, 1000, 720);
          g.fill({ color: 0xffffff, alpha: 0.32 });
        }
        const dropY = Math.min(GROUND_Y - 110, 60 + c.frame * 5.2);
        g.circle(victim.x, dropY, 74);
        g.fill({ color: 0xff2ec4, alpha: 0.9 });
        g.stroke({ width: 5, color: 0xffd700, alpha: 1 });
      }
      return;
    }

    if (c.type === 'fatality') {
      if (c.fighterId === 'bob') {
        // === BOB EGGPLANT FATALITY: "INEVITABLE PARM" ===
        // Beat 0-1: Green digital rain + floating wireframe eggplant firing squad
        for (let i = 0; i < 24; i++) {
          const rx = victim.x - 360 + i * 32;
          const ry = ((c.frame * 16 + i * 67) % 620);
          g.rect(rx, ry, 3, 46);
          g.fill({ color: 0x00ff7f, alpha: 0.55 });
        }
        if (c.frame >= 35 && c.frame < 145) {
          for (let e = 0; e < 6; e++) {
            const ang = (e / 6) * Math.PI * 2 + c.frame * 0.04;
            const rad = c.frame > 105 ? Math.max(20, 190 - (c.frame - 105) * 4.5) : 190;
            this.drawEggplant(g, victim.x + Math.cos(ang) * rad, victim.y - 140 + Math.sin(ang) * 90, 0.95, true, false);
          }
        }
        // Beat 2-3: COLOSSAL glowing orbital eggplant slam + comic purple sparks & marinara steam!
        if (c.frame >= 100) {
          const t = Math.min(1, (c.frame - 100) / 48);
          const giantY = -120 + t * (GROUND_Y + 20);
          this.drawEggplant(g, victim.x, giantY, 4.6, false, false);
          if (c.frame >= 148) {
            // Comic purple spark & marinara steam burst!
            g.circle(victim.x, GROUND_Y - 60, 140 + (c.frame - 148) * 3);
            g.fill({ color: 0xa855f7, alpha: Math.max(0, 0.7 - (c.frame - 148) * 0.012) });
            g.circle(victim.x, GROUND_Y - 40, 95 + (c.frame - 148) * 2.2);
            g.fill({ color: 0xef4444, alpha: Math.max(0, 0.5 - (c.frame - 148) * 0.01) });
          }
        }
      } else {
        // === CORY EGGPLANT FATALITY: "RUNWAY AUBERGINE" ===
        // Neon fashion runway beam on the floor
        g.rect(victim.x - 420, GROUND_Y - 12, 840, 26);
        g.fill({ color: 0xff2ec4, alpha: 0.55 });
        g.rect(victim.x - 420, GROUND_Y - 14, 840, 4);
        g.fill(0xffd700);

        // Paparazzi camera flashes during Beat 0-1
        if (c.frame < 105 && c.frame % 22 < 3) {
          g.rect(victim.x - 520, 0, 1040, 720);
          g.fill({ color: 0xffffff, alpha: 0.35 });
        }

        // Beat 2-3: Colossal mirror-tiled DISCO EGGPLANT descends and explodes in purple confetti!
        if (c.frame >= 95) {
          const t = Math.min(1, (c.frame - 95) / 52);
          const giantY = -140 + t * (GROUND_Y - 40);
          // Spotlight cone from rafters
          g.moveTo(victim.x - 80, -80);
          g.lineTo(victim.x - 210, GROUND_Y + 20);
          g.lineTo(victim.x + 210, GROUND_Y + 20);
          g.lineTo(victim.x + 80, -80);
          g.closePath();
          g.fill({ color: 0xd946ef, alpha: 0.2 });

          this.drawEggplant(g, victim.x, giantY, 4.4, false, true);

          if (c.frame >= 148) {
            // Glittering purple & gold confetti explosion!
            for (let k = 0; k < 28; k++) {
              const ang = (k / 28) * Math.PI * 2;
              const dist = (c.frame - 148) * 7.5;
              const cx = victim.x + Math.cos(ang) * dist;
              const cy = GROUND_Y - 110 + Math.sin(ang) * dist - (c.frame - 148) * 2.2;
              g.rect(cx, cy, 10, 10);
              g.fill(k % 3 === 0 ? 0xffd700 : k % 3 === 1 ? 0xff2ec4 : 0xa855f7);
            }
          }
        }
      }
      return;
    }

    if (c.type === 'brutality') {
      // Secret Brutality: Comical giant eggplant splat!
      const s = 2.6 + Math.sin(c.frame * 0.2) * 0.3;
      this.drawEggplant(g, victim.x, GROUND_Y - 110, s, c.fighterId === 'bob', c.fighterId === 'cory');
      g.circle(victim.x, GROUND_Y - 110, 90 + c.frame * 1.5);
      g.stroke({ width: 5, color: 0xa855f7, alpha: Math.max(0, 1 - c.frame / 120) });
    }
  }
}
