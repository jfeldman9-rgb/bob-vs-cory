import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { VoiceDirector, VoicePlayer } from '../src/audio/VoiceDirector';
import { FORBIDDEN_KO, VOICE_LINES, announcerClipForText, findLineByText, getVoiceLine } from '../src/audio/VoiceBank';
import { BANTER_EXCHANGES, MIRROR_BANTER, VICTORY_QUOTES } from '../src/data/banter';
import { CombatEngine } from '../src/engine/CombatEngine';
import { emptyInput } from '../src/engine/InputBuffer';
import { MatchConfig } from '../src/types/game';

const ROOT = process.cwd();
const VOICE_DIR = join(ROOT, 'public/assets/audio/voice');

function makeEngine(overrides: Partial<MatchConfig> = {}): CombatEngine {
  return new CombatEngine({
    mode: 'vs-p2',
    p1Fighter: 'bob',
    p2Fighter: 'cory',
    p1Palette: 0,
    p2Palette: 0,
    stage: 'matrix-subway',
    aiDifficulty: 'normal',
    roundTimeSeconds: 99,
    roundsToWin: 2,
    easyFatality: true,
    ...overrides,
  });
}

class FakePlayer implements VoicePlayer {
  played: string[] = [];
  play(id: string): boolean {
    this.played.push(id);
    return true;
  }
}

describe('voice manifest', () => {
  it('has the full v2 voice script (220 lines) with unique ids', () => {
    expect(VOICE_LINES.length).toBe(220);
    expect(new Set(VOICE_LINES.map((l) => l.id)).size).toBe(VOICE_LINES.length);
  });

  it('every clip exists on disk, is non-trivial, and is wav or mp3', () => {
    for (const l of VOICE_LINES) {
      const p = join(VOICE_DIR, l.file);
      expect(existsSync(p), l.file).toBe(true);
      expect(statSync(p).size, l.file).toBeGreaterThan(4000);
      expect(/\.(wav|mp3)$/.test(l.file)).toBe(true);
    }
  });

  it('never says "K.O."', () => {
    for (const l of VOICE_LINES) expect(FORBIDDEN_KO.test(l.text), l.id).toBe(false);
  });

  it('voices every intro banter line, mirror line and victory quote', () => {
    for (const ex of [...BANTER_EXCHANGES, MIRROR_BANTER.bob, MIRROR_BANTER.cory]) {
      for (const line of ex.lines) expect(findLineByText(line.speaker, line.text), line.text).toBeTruthy();
    }
    for (const id of ['bob', 'cory'] as const) {
      for (const q of VICTORY_QUOTES[id]) expect(findLineByText(id, q), q).toBeTruthy();
    }
  });

  it('maps every engine announcer banner to a recorded clip', () => {
    const banners: [string, boolean, string][] = [
      ['ROUND 1', false, 'ann_round_1'],
      ['ROUND 2', false, 'ann_round_2'],
      ['ROUND 3', true, 'ann_final_round'],
      ['FINAL ROUND', true, 'ann_final_round'],
      ['FIGHT!', false, 'ann_fight'],
      ['FINISH HIM!', false, 'ann_finish_him'],
      ['FATALITY!', false, 'ann_fatality'],
      ['BRUTALITY!', false, 'ann_brutality'],
      ['TIME OVER', false, 'ann_time'],
      ['DOUBLE DEFEAT', false, 'ann_double_knockout'],
      ['AGENT BOB WINS', false, 'ann_bob_wins'],
      ['FLAMBOYANT CORY WINS', false, 'ann_cory_wins'],
      ['INEVITABLE PARM', false, 'ann_inevitable_parm'],
      ['RUNWAY AUBERGINE', false, 'ann_runway_aubergine'],
    ];
    for (const [text, fin, id] of banners) {
      expect(announcerClipForText(text, fin)).toBe(id);
      expect(getVoiceLine(id), id).toBeTruthy();
    }
    expect(announcerClipForText('K.O.!')).toBeNull();
  });

  it('every clip id referenced in source exists in the manifest', () => {
    const files = ['src/audio/VoiceDirector.ts', 'src/ui/UIManager.ts', 'src/main.ts', 'src/audio/VoiceBank.ts'];
    const missing: string[] = [];
    for (const f of files) {
      const src = readFileSync(join(ROOT, f), 'utf8');
      for (const m of src.matchAll(/['`]((?:ann|narr|bob|cory|\$\{[a-zA-Z.]+\})_[a-z0-9_$\{\}.]+)['`]/g)) {
        const raw = m[1];
        if (raw.endsWith('_')) continue; // prefixes for random pools
        const ph = /\$\{([^}]+)\}/.exec(raw);
        if (ph && !/(^|\.)(id|fighterId)$/.test(ph[1])) continue; // non-fighter placeholders (e.g. round number)
        const expanded = ph ? ['bob', 'cory'].map((id) => raw.replace(ph[0], id)) : [raw];
        for (const id of expanded) {
          if (id.includes('${')) continue;
          if (!getVoiceLine(id)) missing.push(`${f}: ${id}`);
        }
      }
    }
    expect(missing).toEqual([]);
  });
});

describe('VoiceDirector', () => {
  it('voices both intro banter lines in sync with the banter box', () => {
    const eng = makeEngine();
    const fake = new FakePlayer();
    const dir = new VoiceDirector(fake, () => 0);
    dir.update(eng, eng.events);
    const first = findLineByText(eng.activeBanter.lines[0].speaker, eng.activeBanter.lines[0].text)!;
    expect(fake.played).toEqual([first.id]);
    for (let i = 0; i < 120; i++) {
      eng.step(emptyInput(), emptyInput());
      dir.update(eng, eng.events);
    }
    const second = findLineByText(eng.activeBanter.lines[1].speaker, eng.activeBanter.lines[1].text)!;
    expect(fake.played).toContain(second.id);
  });

  it('plays an attack grunt and a pain line when a hit lands', () => {
    const eng = makeEngine();
    eng.phase = 'fighting';
    eng.fighters[0].x = 900;
    eng.fighters[1].x = 995;
    const fake = new FakePlayer();
    const dir = new VoiceDirector(fake, () => 0); // rng 0 => always grunt
    dir.attach(eng);
    eng.step({ ...emptyInput(), p1: true }, emptyInput());
    dir.update(eng, eng.events);
    for (let i = 0; i < 15; i++) {
      eng.step(emptyInput(), emptyInput());
      dir.update(eng, eng.events);
    }
    expect(fake.played.some((id) => id.startsWith('bob_grunt_'))).toBe(true);
    expect(fake.played.some((id) => id.startsWith('cory_pain_'))).toBe(true);
    for (const id of fake.played) expect(getVoiceLine(id), id).toBeTruthy();
  });
});
