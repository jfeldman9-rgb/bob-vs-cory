import { CombatEngine } from '../engine/CombatEngine';
import { GROUND_Y, STAGE_LEFT, STAGE_RIGHT, VIEW_HEIGHT, VIEW_WIDTH } from '../engine/constants';

export class CameraRig {
  public x: number = 1000;
  public y: number = 420;
  public zoom: number = 1.0;
  public shakeX: number = 0;
  public shakeY: number = 0;

  public reset(): void {
    this.x = 1000;
    this.y = 420;
    this.zoom = 1.0;
    this.shakeX = 0;
    this.shakeY = 0;
  }

  public update(engine: CombatEngine, allowShake: boolean): void {
    const f0 = engine.fighters[0];
    const f1 = engine.fighters[1];

    let targetX = (f0.x + f1.x) / 2;
    const minY = Math.min(f0.y, f1.y);
    let targetY = 415 - Math.max(0, GROUND_Y - minY) * 0.28;

    // Distance-based dynamic zoom
    const dist = Math.abs(f0.x - f1.x);
    let targetZoom = 1.12 - Math.min(0.28, Math.max(0, (dist - 360) / 1450));

    if (engine.cinematic.type !== 'none') {
      targetX = engine.cinematic.cameraTargetX;
      targetY = engine.cinematic.cameraTargetY - 40;
      targetZoom = engine.cinematic.cameraZoom;
    }

    // Smooth interpolation
    this.x += (targetX - this.x) * 0.14;
    this.y += (targetY - this.y) * 0.12;
    this.zoom += (targetZoom - this.zoom) * 0.12;

    // Clamp camera within stage bounds
    const halfViewW = VIEW_WIDTH / (2 * this.zoom);
    const minCamX = STAGE_LEFT - 80 + halfViewW;
    const maxCamX = STAGE_RIGHT + 80 - halfViewW;
    if (minCamX < maxCamX) {
      this.x = Math.max(minCamX, Math.min(maxCamX, this.x));
    } else {
      this.x = (STAGE_LEFT + STAGE_RIGHT) / 2;
    }

    // Screen-shake
    if (allowShake && engine.shakeIntensity > 0.2) {
      this.shakeX = (Math.random() * 2 - 1) * engine.shakeIntensity;
      this.shakeY = (Math.random() * 2 - 1) * engine.shakeIntensity * 0.7;
    } else {
      this.shakeX = 0;
      this.shakeY = 0;
    }
  }

  public applyToContainer(world: { position: { set: (x: number, y: number) => void }; scale: { set: (s: number) => void } }): void {
    world.scale.set(this.zoom);
    const screenX = VIEW_WIDTH / 2 - this.x * this.zoom + this.shakeX;
    const screenY = VIEW_HEIGHT / 2 - this.y * this.zoom + this.shakeY;
    world.position.set(screenX, screenY);
  }
}
