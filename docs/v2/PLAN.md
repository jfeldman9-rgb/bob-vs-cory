# Bob vs Cory: KOMBAT v2 Expansion Plan

**Goal:** grow the live web build from ~7.2 MB to well over 100 MB of real content: painted animation frames, layered
stages, cutscenes, recorded voices, music and SFX. No padding, no dummy bytes, no duplicate files, and no upscaled or
re-inflated assets. The original Gemini brief asked for 100-500 MB. This plan estimates **~309 MB** and crosses
100 MB at the end of Phase 2 (painted core frames + recorded voices).

Companion files:
- `v2/art-prompts.md` has **197** ready-to-paste Gemini image prompts, one per shipped image.
- `v2/voice-script.md` has **220** voice lines (79 announcer/narrator on ElevenLabs "Jason", 71 Bob on OpenAI `onyx`, 70 Cory on OpenAI `ballad`).

Non-negotiables carried from v1: the announcer **never says "K.O."** (it says "Knockout!" or "<Fighter> wins!"). Cory
is campy, flirty and affectionate, with no slurs and nothing hateful. Bob is a deadpan suited agent. Fatal Blows and
Fatalities are **cartoon**: confetti, glitter, steam, swirly eyes, no blood and no gore. Characters are described by
appearance only in generation prompts.

---

## 1. Where v1 stands (measured, 2026-11-24)

| Area | v1 state | v2 problem to fix |
|---|---|---|
| Build | `dist/` 7.2 MB, JS bundle ~0.75 MB | Far below the 100 MB target |
| Fighter art | 7 single poses per fighter (`idle, punch, kick, special, crouch, block, hurt`), PNG RGBA **540 px tall** (~0.22-0.32 MB each) | Cory has no punch or crouch art (`FighterRenderer.ts` maps `punch→cory-special.png`, `crouch→cory-block.png`). Neither fighter has walk, jump, win, lose, knockdown, Fatal Blow or Fatality frames, so all motion is procedural squash and tilt. |
| Stages | 3 single JPGs at **1376x768** (16:9) stretched to a **2360x880** world rect (`StageRenderer.ts` line 55), a **1.5x horizontal stretch**. Scottsdale has `imagePath: ''` and is drawn procedurally. | Stages need panoramic **2.67:1** art, real parallax layers, a painted Scottsdale, and day/night variants. |
| Audio | `AudioEngine.ts` uses oscillator music/SFX and the Web Speech API announcer | No recorded voice, music or SFX |
| Phone (390x844 shots in `shots/`) | Canvas letterboxed into a 16:9 strip mid-screen with ~600 px of dead space. P2 HUD name "FLAMBOYANT CORY" clipped off the right edge. Title portraits show only boots and legs behind the menu. The "PAUSE / MOVES (ESC)" button sits on top of the touch pad (→ and 3 keys). | See section 9 for concrete layout fixes. |
| Modes | vs CPU, 2P, Arcade Tower (4 rungs, no endings), Training, Spectate, Moves list | Story mode, arcade endings, Practice/Fatality trainer, Gallery |

---

## 2. Art pipeline

### 2.1 Generation (Gemini image)
1. Generate the **two model sheets** first (art entries 115-116). Then attach that model sheet plus the v1 `*-idle.png`
   as reference images to **every** sprite prompt for the same character. Each prompt also restates the full costume, so
   it still works without references.
2. Generate sprites at **2K** (3:4 or 4:3 as listed) on flat **#00FF00**. Generate stages at **4K 21:9**. Generate cutscenes at 2K 16:9.
3. Keep raw generations in `art-src/` (git-ignored, backed up separately). Only processed outputs go in `public/assets/`.
4. Re-roll a frame when: the costume drifts (tie or pocket square, feather colours, boot gems, beard shape), there are
   wrong finger counts, the character faces left, something is cropped, a shadow is painted, or green spill can't be cleaned.

### 2.2 Processing script: `tools/art/process.py` (new, Pillow + numpy)
- **Sprites:** scale the whole 2K image to exactly **1024 px tall** (this keeps the scale lock: standing height ≈ 901 px
  in every frame), chroma-key #00FF00 (HSV distance, soft 2 px edge), green despill on edges, trim empty columns only,
  then write `pivotX` (alpha-weighted body-centre column) and `baselineY` (lowest opaque row, target 983) to
  `src/data/animations/<fighter>.json`. Save as PNG-32 with zlib level 9, no quantization, and metadata chunks stripped.
- **Stage layers:** crop the 4K master edits to 2.67:1 (6336x2376), downscale to 3840x1440, key magenta/green/blue as
  listed per stage, then slice out mid (bottom 960 px) and fore (bottom 480 px).
- **Derived mobile tier:** `public/assets-m/` holds 512 px tall sprite WebP (q85) and 1920x720 stage WebP. These are
  derived renditions for phones, so they are **excluded from the 100 MB claim** and listed separately in the budget.
- **Onion-skin QA page:** `tools/art/onion.html` overlays any frame on `idle_01` at 40% opacity to check scale, baseline
  and pivot before committing.

### 2.3 Engine changes for animation
- `PoseName` (7 values) becomes `AnimId` strings. The new `src/data/animations/{bob,cory}.json` looks like:
  `{ "<anim>": { "frames": [{ "file": "fp_02.png", "ticks": 3, "pivotX": 412, "baselineY": 983 }], "loop": false, "events": [{ "frame": 1, "sfx": "whoosh_light", "voice": "grunt_light" }] } }`.
- `fighters.json` moves gain an `anim` field (the existing `pose` stays as a fallback). FSM states map to anims as shown in 3.1.
- `FighterRenderer` gets an `AnimationPlayer` per fighter: frame index from `moveFrame` for attacks (startup frames
  show `_01`, active and recovery show `_02`) and tick-based playback for loops. It keeps the existing procedural breath and
  lean as a light layer on top. The sprite scale changes from `0.52` (540 px source) to `0.274` (1024 px source, same 280 px on-screen height).
- Agent Clone Grapple and System Purge clones render as extra Bob sprites with alpha 0.6 and a green tint. No extra art is needed.

---

## 3. Content: fighters

### 3.1 Frame sets: 57 painted frames per fighter, 114 total (art entries 1-114)

| Group | Frames (each fighter) | Drives FSM state / moves |
|---|---|---|
| Idle | `idle_01-03` (ping-pong, 8 ticks each) | `idle` |
| Walk | `walk_01-04`, `walk_back` | `walk_fwd` (loop), `walk_back` (walk reversed + `walk_back` key pose) |
| Dash | `dash` | `dash_fwd`, `dash_back` (mirrored lean via `walk_back`) |
| Jump | `jump_takeoff`, `jump_apex`, `jump_fall` | `jump` (picked by `vy`), `wakeup_roll` (apex, rotated) |
| Crouch / block | `crouch`, `crouch_block`, `block` | `crouch`, `block_crouch`, `block_stand`, `up_block` and `flawless_block` (block + existing tint) |
| Light/heavy punch | `fp_01-02`, `bp_01-02` | `n_1`, `n_2`, `b_2`, all string hits |
| Light/heavy kick | `fk_01-02`, `bk_01-02` | `n_3`, `n_4`, `s_34`, `wakeup_kick` |
| Crouching / air | `crouch_poke`, `sweep`, `uppercut`, `jump_punch`, `jump_kick` | `d_1`/`d_3`, `d_4`, `d_2`, `j_1`, `j_3` |
| Throw | `throw_grab`, `throw_toss` | `throw_start`, `throw` |
| Hit / hurt | `hit_high`, `hit_body`, `hit_crouch`, `launch`, `knockdown`, `wakeup`, `dizzy` | `hitstun` (by attack height), `launch`, `knockdown`, `wakeup`, `dizzy`, `thrown` |
| Personality | `taunt`, `victory_01-02`, `defeat`, `fatality_victim` | `taunt`, `victory`, `defeat`, `fatality_victim` |
| Bob specials (9) | `sp_palm_flurry_01-02`, `sp_teleport_out/in`, `sp_eggplant_toss_01-02`, `sp_clone_grapple`, `sp_bullet_lean`, `sp_aerial_dive` | `palm_flurry(_ex)`, `glitch_teleport(_ex)`, `eggplant_toss(_ex)`, `clone_grapple`, `bullet_lean`, `aerial_dive` |
| Cory specials (9) | `sp_glitter_bomb_01-02`, `sp_runway_dash_01-02`, `sp_disco_drop`, `sp_vogue_parry`, `sp_boa_whip_01-02`, `sp_air_twirl` | `glitter_bomb(_ex)`, `runway_dash(_ex)`, `disco_drop`, `vogue_parry`, `boa_whip`, `air_twirl` |
| Fatal Blow (3) | Bob `fb_system_purge_01-03`, Cory `fb_showstopper_01-03` | `fatal_blow` (wind-up → strike → finisher) |
| Fatality (3) | Bob `fatality_parm_01-03`, Cory `fatality_aubergine_01-03` | `fatality_perform` |

Projectiles, glows, glitter and code rain are **separate VFX images** (art entries 184-197), drawn additively, so
sprites stay clean and keyable.

### 3.2 Fatal Blows and Fatalities (cartoon)
- **System Purge (Bob):** sprite wind-up with a glasses-lower glare, then a full-screen cut-in still `cine/fb-system-purge-01`
  (lens close-up, 0.6 s), a triple-clone hammer-fist sequence (sprites + clones), cut-in `cine/fb-system-purge-02`, and a
  wireframe-eggplant uppercut finisher. Damage and frame data are unchanged.
- **Showstopper (Cory):** sunglasses wink, camera-flash whiteout with cut-in `cine/fb-showstopper-01`, glitter spin kick, and a
  disco-ball slam with cut-in `cine/fb-showstopper-02`.
- **Inevitable Parm (Bob):** sprite `fatality_parm_01-02`, then three stills (code-sky firing squad, orbital eggplant,
  comic crater with a flattened dazed silhouette), then Bob walks off (`fatality_parm_03`). The victim sprite switches to `fatality_victim`.
- **Runway Aubergine (Cory):** three paparazzi poses, then three stills (neon runway, mirror disco eggplant descent, confetti launch), then a bow.
- Opponents in every still are **anonymous silhouettes**, so the stills work for mirror matches too.

---

## 4. Content: stages (art entries 117-144)

Each of the 4 stages has **two lighting variants** × (master/preview + far plate + mid layer), plus a shared foreground strip.

| Stage | Variant A | Variant B (new) | Key colour for layers |
|---|---|---|---|
| Matrix Subway Platform | night rain | dawn god-rays, rain stopped | magenta (stage is green) |
| Neon Disco Penthouse | night neon | sunset golden hour | green |
| Great Eggplant Colosseum | stormy twilight | blazing noon | green |
| **Scottsdale Midnight Lounge** (first painting) | midnight stars, fire pits, glowing pool | desert sunset | blue (palms and cacti are green, neon is pink) |

Layer stack and parallax (world span stays 2360x880):

| Layer | File | Parallax factor | Notes |
|---|---|---|---|
| Far | `<variant>-far.jpg` 3840x1440 | 0.35 | sky + distant architecture |
| VFX back | existing procedural rain, glitter or embers | 0.6 | kept from v1 |
| Mid | `<variant>-mid.webp` 3840x960 | 0.75 | props: pillars, truss, statues, palms |
| Fore | `fore.webp` 3840x480 | 1.0 | floor band; tinted per variant with a `ColorMatrixFilter` |
| Fighters + VFX | | 1.0 | |

`stages.ts` gets `variants: [{ id, label, far, mid, foreTint, ambience, music }]`. The variant is picked on the stage
select screen (shoulder buttons / tap the variant chip) or at random. Arcade alternates variants by rung.
Ambient motion is cheap: the subway train headlight pulses, disco balls rotate (sprite overlay), braziers flicker
(additive glow), and Scottsdale fire pits and pool caustics use the `steam-puff` and `spotlight-cone` VFX at low alpha.

---

## 5. Content: story, arcade, select, versus, title (art entries 145-183)

- **Story intro (5 stills):** city split skyline → agent receives orders → showman opens a golden invitation → face-off
  at the colosseum gate → the Golden Aubergine trophy. Narration is `narr_intro_01-05`, with `bob_story_1` and `cory_story_1` interleaved.
- **Arcade:** a rival still before the last rung and a 4-still ending per fighter, then a credits still
  (both fighters toasting with sparkling lemonade). Bob's ending: he wins, then a sequin on his lapel, then a boot-tap, then he keeps the sequin.
  Cory's ending: he wins, then the colosseum becomes a club, then he puts a sequin tie on Bob, then Bob attempts one disco step.
- **Cutscene player:** a new `CutscenePlayer` UI shows a full-bleed still with slow Ken-Burns pan (±4% scale over the
  line duration), a subtitle bar and a voice line, with tap or Enter to advance and hold to skip. Stills are `object-fit: cover`
  on desktop. On portrait phones they show `contain` with a blurred copy of the same still behind (CSS `filter: blur(24px)`, so no extra file).
- **Character select:** full-body renders (`ui/select/*-full.png`) flank the grid, busts are used for cards and the HUD
  (the HUD loads the bust, not v1 `*-face.webp`), and announcer name calls play on lock-in.
- **Versus screen (new, 2.5 s):** `versus-bg.jpg` + `bob-half.png` sliding in from the left and `cory-half.png` from the right +
  `ui/logo.png`, with the `ann_versus` call and a sting. Stage assets load during this screen.
- **Title:** `title-key-art.jpg` on landscape and `title-key-art-portrait.jpg` on portrait phones. This replaces the two v1 sprite
  `<img>` portraits that get cropped on phones.
- **Cards:** `fatality-card.jpg` and `victory-card.jpg` sit behind the result text. `arcade-tower.jpg` is the tower ladder background.

---

## 6. Voice and announcer (220 lines, see `voice-script.md`)

- **Announcer/narrator:** ElevenLabs "Jason" clone, `eleven_multilingual_v2` (`eleven_v3` optional for the loudest calls), `pcm_44100`.
- **Bob:** OpenAI `gpt-4o-mini-tts`, voice `onyx`, `instructions` = style column. **Cory:** same model, voice `ballad`. Output is `wav` (24 kHz).
- Tooling: `tools/audio/gen-voice.mjs` reads the markdown table, calls the right API (keys from env vars
  `ELEVENLABS_API_KEY` and `OPENAI_API_KEY`, never committed), writes `public/assets/audio/voice/<id>.wav`, normalises to -16 LUFS / -1 dBTP with
  ffmpeg `loudnorm` (two-pass, **no resample**), and trims silence. `tools/audio/check-voice.mjs` fails on a missing id,
  any duplicate SHA-256, a K.O. match, or a sample rate different from the source.
- Engine: `VoiceBank` maps triggers to ids (random without immediate repeat for grunts, taunts and wins), and ducks music
  by -8 dB while voice plays. Subtitles for banter and story come from the same table. `speakAnnouncer()` plays the
  matching `ann_*` sample and falls back to Web Speech only if the sample failed to load. The K.O. regex guard stays.

---

## 7. Music and SFX

**Source:** ElevenLabs Music (`music_v1`) for the score and ElevenLabs Sound Effects for SFX, both on the owner's paid
plan (commercial use is covered by the paid-plan terms; confirm once before release). The v1 procedural synth stays as the offline fallback.

### 7.1 Music (≈27 min)

| Track | Length | Prompt seed |
|---|---|---|
| Title theme "Inevitable vs Fabulous" | 2:00 loop | heroic synth-orchestral fighting-game theme, half industrial cyberpunk, half nu-disco, 128 bpm |
| Character select | 1:00 loop | tense pulsing synth bass, choir pad, ticking hats |
| Versus sting | 0:08 | huge braam into disco stab |
| Matrix Subway / Penthouse / Colosseum / Scottsdale | 4 × 2:30 loops | industrial breakbeat 140 bpm / nu-disco funk 122 bpm / epic orchestral choir 100 bpm / midnight synthwave 105 bpm |
| Final-round intense variants (same key and tempo, crossfaded) | 4 × 1:15 | same four, denser drums, higher energy |
| Finish Him drone | 0:40 loop | ominous low bass drone, heartbeat |
| Fatality stings (Bob, Cory) | 2 × 0:12 | glitch-orchestral hit / disco fanfare |
| Victory jingles (Bob, Cory) | 2 × 0:10 | cold synth cadence / glitter brass |
| Story theme | 1:45 | cinematic, mysterious, building |
| Ending themes (Bob, Cory) | 2 × 0:50 | warm, funny, slightly romantic-comedy |
| Credits | 2:00 | full disco-synth anthem |
| Practice lounge | 1:15 loop | chill lounge house |
| Arcade tower map | 0:45 loop | rising brass ostinato |
| Game over | 0:12 | deflating trombone-synth |

Music streams through `<audio>` + `MediaElementAudioSourceNode` into the music bus, so 2-3 minute tracks are never
fully decoded into RAM. Each 2:30 stereo track would take ~57 MB as float PCM.

### 7.2 SFX (120 one-shots + 8 ambience loops)

| Category | Count |
|---|---|
| Impacts (light 8, heavy 8, special/eggplant 6) | 22 |
| Blocks (block 4, flawless 3, parry 3) | 10 |
| Whooshes (light 6, heavy 6) | 12 |
| Footsteps (tile, glass, sand/stone, flagstone × 4), landings 4, body falls 4 | 24 |
| Bob signature (glitch teleport 3, palm flurry 2, clone summon 2, bullet-time 2, sunglasses click 2, wire-eggplant spawn 2, earpiece chirp 1) | 14 |
| Cory signature (glitter throw 2, glitter burst 2, camera shutter/flash 3, boa whip 2, disco-ball drop/shatter 3, runway whoosh 2, feather flutter 1) | 15 |
| Fatal Blow / Fatality (slow-mo hit 2, orbital descent 1, giant slam 2, confetti cannon 2, crowd gasp 1, crowd cheer 2) | 10 |
| UI (hover 2, confirm 2, back 1, lock-in slam 2, gong 1) | 8 |
| Misc (dizzy birds, round bell, timer tick, combo breaker, meter full) | 5 |
| **Ambience loops** (one per stage variant, 45 s seamless) | 8 |

SFX are wired through the `events` of each animation frame (section 2.3), with ±8% random pitch and ±2 dB random gain (Gemini plan goals 74 and 80).

---

## 8. Modes

| Mode | Status | v2 work |
|---|---|---|
| **Story Mode** (new) | none | 4 chapters per fighter (one per stage, fixed variant). Each chapter is chapter card narration, then banter, then a fight vs CPU with difficulty ramping Easy → Hard, then the fighter's ending and credits. Progress is saved in `SaveData`. |
| **Klassic Arcade Tower** | 4 rungs, no story | Add rival still + narration before rung 4, the 4-still ending, credits, `ann_tower_*` calls, a continue screen (`ann_continue` / `ann_game_over`), and unlocks (palettes, gallery). |
| **Practice** (Training upgrade) | infinite timer, regen, hitboxes, dummy block modes | Add input history display, frame-advantage readout, dummy record/playback (2 slots, 10 s each; Gemini goal 89), and **Combo Trials**: the 5 named strings per fighter plus 3 special-cancel trials. |
| **Fatality Trainer** (new) | Easy Fatality toggle exists | Dummy stays dizzy, an on-screen range bar shows Close/Mid/Sweep, inputs light up as entered, announcer coaches with `ann_practice_close` / `_far` / `_success`. |
| **Gallery / Extras** (new) | none | Model sheets, all cutscene stills (unlocked by story/arcade), stage previews, a voice-line jukebox and a music player. |
| Versus, Spectate, Moves list, Settings | exist | Settings adds "HD sprites: Auto/On/Off", "Subtitles", "Voice language: EN", and "Reduce flashes" (dims camera-flash and whiteout cut-ins). |

---

## 9. Phone layout fixes (concrete)

### 9.1 `index.html`
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#07060d" />
...
<div id="app">
  <div id="hud-top-slot"></div>          <!-- portrait: HUD bars live here, above the stage -->
  <div id="stage-frame">                 <!-- always exactly the canvas aspect -->
    <div id="canvas-container"></div>
    <div id="hud-overlay"></div>         <!-- combo, callouts, announcer banner: sized to the stage -->
  </div>
  <div id="dock"></div>                  <!-- portrait: touch controls + pause live here -->
  <div id="ui-root"></div>               <!-- menus, modals: full screen -->
</div>
```
`UIManager.renderHud()` writes `.hud-top` into `#hud-top-slot` in portrait and into `#hud-overlay` otherwise, using
the same markup and moving it between slots on `matchMedia('(orientation: portrait)')` change. Touch controls go into `#dock`.

### 9.2 Fill the screen instead of letterboxing (`main.ts`, `constants.ts`, `CameraRig.ts`)
`VIEW_WIDTH` becomes a mutable `view.width`. On resize:
```ts
function fitView() {
  const portraitPhone = matchMedia('(orientation: portrait) and (max-width: 900px)').matches;
  const aspect = portraitPhone ? 16 / 9 : innerWidth / innerHeight;
  view.width = Math.round(Math.min(Math.max(720 * aspect, 1280), 1600)); // 16:9 … 20:9
  pixi.renderer.resize(view.width, 720);
  camera.setViewWidth(view.width);     // halfViewW uses view.width
  document.documentElement.style.setProperty('--stage-aspect', `${view.width} / 720`);
}
addEventListener('resize', fitView); fitView();
```
Landscape phones (19.5:9) now show more stage, which the 2.67:1 plates cover, instead of black pillarbox bars. The
camera clamp keeps fighters inside `STAGE_LEFT/RIGHT`.

### 9.3 CSS (`style.css`)
```css
#app { width: 100vw; height: 100dvh; }
#stage-frame {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  aspect-ratio: var(--stage-aspect, 16 / 9);
  width: min(100vw, calc(100dvh * 1280 / 720));   /* JS keeps --stage-aspect in sync */
  container-type: inline-size;                    /* HUD scales with the stage, not the viewport */
}
#canvas-container canvas { width: 100% !important; height: 100% !important; object-fit: fill; }
#hud-overlay { position: absolute; inset: 0; pointer-events: none; }

/* --- HUD names never clip --- */
.hud-top { grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); }
.hud-fighter, .hud-name-row { min-width: 0; }
.hud-name { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            font-size: clamp(0.66rem, 2.4cqi, 1.05rem); }
.hud-name .short { display: none; }
@container (max-width: 700px) {
  .hud-name .full { display: none; }  .hud-name .short { display: inline; }   /* "BOB" / "CORY" */
  .hud-portrait { width: 34px; height: 34px; }
  .round-pip { width: 10px; height: 10px; }
  .timer-val { font-size: 1.35rem; }
}

/* --- Pause no longer collides with the touch pad --- */
#btn-pause-hud { display: none; }                       /* old text button in .hud-bottom removed */
.hud-pause { position: absolute; top: calc(100% + 6px); left: 50%; transform: translateX(-50%);
             width: 40px; height: 40px; border-radius: 50%; pointer-events: auto; }  /* icon under the timer; tapping the timer also pauses */
body.paused .touch-controls { visibility: hidden; }
.banter-box { bottom: calc(var(--dock-h, 0px) + 16px); }

/* --- Portrait phones: HUD band / 16:9 stage / control dock --- */
@media (orientation: portrait) and (max-width: 900px) {
  body.in-match #app {
    display: grid;
    grid-template-rows: auto auto 1fr;
    padding: env(safe-area-inset-top) env(safe-area-inset-right) 0 env(safe-area-inset-left);
  }
  body.in-match #hud-top-slot { grid-row: 1; padding: 6px 10px 4px; }
  body.in-match #stage-frame  { grid-row: 2; position: relative; left: auto; top: auto; transform: none; width: 100%; }
  body.in-match #dock {
    grid-row: 3; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
    padding: 12px 14px calc(12px + env(safe-area-inset-bottom));
    --dock-h: 100%;
  }
  body.in-match #dock .touch-controls { position: static; display: contents; }
  body.in-match #dock .hud-pause { position: static; transform: none; grid-column: 2; align-self: start; }
  .touch-btn { width: clamp(52px, 15vw, 72px); height: clamp(52px, 15vw, 72px); font-size: 1rem; }
  .touch-pad { grid-template-columns: repeat(3, clamp(52px, 15vw, 72px)); gap: 8px; }
  .hud-bottom { position: absolute; left: 6px; right: 6px; bottom: 4px; }   /* meters stay on the stage */

  /* Title: dedicated portrait key art; no cropped sprite portraits */
  .title-fighters { display: none; }
  .title-screen { background: #07060d url('./assets/ui/title-key-art-portrait.jpg') center top / cover no-repeat;
                  justify-content: flex-end; padding: 0 12px calc(16px + env(safe-area-inset-bottom)); }
  .title-center { max-width: 100%; padding: 14px 16px; background: rgba(8, 7, 16, 0.74); }
  .menu-stack .mk-btn { padding: 10px 12px; font-size: 0.86rem; }
  .game-logo { content: url('./assets/ui/logo.png'); width: 78vw; height: auto; }
}

/* --- Landscape phones: compact HUD, translucent corner pads --- */
@media (orientation: landscape) and (max-height: 500px) {
  .hud-layer { padding: 6px calc(10px + env(safe-area-inset-right)) 6px calc(10px + env(safe-area-inset-left)); }
  .touch-controls { padding: 0 calc(12px + env(safe-area-inset-left)); bottom: calc(8px + env(safe-area-inset-bottom)); }
  .touch-btn { opacity: 0.62; width: 48px; height: 48px; }
  .meter-wrap { width: 26%; }
}

/* --- Desktop/landscape title uses the painted key art --- */
@media (orientation: landscape) {
  .title-screen { background-image: url('./assets/ui/title-key-art.jpg'); background-size: cover; background-position: center; }
  .title-fighters { display: none; }
}
```
`fighters.json` gets `"shortName": "BOB"` / `"CORY"`. HUD markup becomes
`<span class="hud-name"><span class="full">${def.name}</span><span class="short">${def.shortName}</span></span>`.

### 9.4 Phone acceptance (added to `playtest.mjs`)
Viewports: 390x844, 360x780, 844x390, 768x1024, 1280x720, 1920x1080. On each, assert that:
- `.hud-name` has `scrollWidth <= clientWidth`.
- No `.touch-btn` bounding box intersects `.hud-pause` or `.hud-name-row`.
- `#stage-frame` covers ≥ 95% of the viewport width.
- In portrait, the stage top sits directly under the HUD band, with no gap > 8 px.

Save screenshots to `shots/v2/`.

---

## 10. File-format policy

| Asset | Format | Dimensions | Rules |
|---|---|---|---|
| Fighter frames | **PNG-32** (RGBA 8-bit, zlib 9, no palette quantization, metadata stripped) | **1024 px tall** canvas, width ≤ 1365, baseline y ≈ 983 | Downscaled from 2K generations only, never upscaled |
| Stage far plates | **JPG q90**, 4:4:4, progressive | **3840x1440** (2.67:1, matches the 2360x880 world) | From the 4K 21:9 master. A 3840x2160 plate would have to be stretched 1.5x or cropped, as in v1, so the plate keeps the world's shape and the owner's 3840 width. |
| Stage mid/fore layers | **WebP q92, lossless alpha** (`cwebp -q 92 -alpha_q 100 -exact`) | 3840x960 / 3840x480 | A 4K painted PNG layer runs 8-12 MB with no visible gain. WebP keeps exact alpha edges at about 1/8 the bytes. |
| Stage previews | JPG q90 | 1680x720 | Crop of each master |
| Cutscenes / cut-ins | **JPG q92** | 1920x1080 | Generated at 2K |
| UI (keyed) | PNG-32 | as listed (1024-2400 px) | |
| UI (opaque) | JPG q90 | title 3840x2160, others ≤ 2560 | |
| VFX | PNG-24 on pure black (additive blend), PNG-32 for keyed props | 1024-2048 px | |
| Voices | **WAV PCM 16-bit mono at the source rate**: OpenAI 24 kHz, ElevenLabs 44.1 kHz | per line | -16 LUFS, -1 dBTP. **No upsampling** (48 kHz would only add fake bytes). |
| SFX | WAV PCM 16-bit 44.1 kHz mono (stereo only when the source is stereo) | | |
| Music + ambience | **AAC-LC 192 kbps .m4a** (44.1 kHz stereo) encoded once from PCM; if only MP3 192 is available, ship the MP3 untouched | | One file per track. Ogg is not reliably playable on older iOS Safari, and shipping two encodes would duplicate content. |
| Data/code | JSON, TS → Vite bundle | | |

**Honesty rules (enforced by `tools/audit-assets.mjs` in CI):**
1. No two shipped files share a SHA-256. No two images within perceptual-hash distance ≤ 4 (catches re-saves and flips).
2. No upscaled images: `art-src` generation dimensions must be ≥ the shipped dimensions (checked against `art-src/manifest.json`).
3. No lossy→lossless or lossy→higher-bitrate transcodes: each audio file's codec and sample rate must match the source recorded in the manifest.
4. No padding: PNG/JPG with no ancillary chunks or EXIF over 4 KB, WAV with no `JUNK`/`PAD` chunks or more than 150 ms of digital silence at either end, and no files with near-zero entropy.
5. JPG quality is capped at 92. Every file in `public/assets` must be referenced by code, data or the manifest (no orphans).

---

## 11. MB budget (shipped `dist/`, master assets only)

Per-file sizes are anchored to v1 measurements: v1 sprites average **1.03 bytes/pixel** of canvas (e.g. `bob-idle.png`
425x540 = 237 KB), and v1 painted stage JPGs run **0.85 B/px** (1376x768 → ~0.9 MB).

| Category | Count | Per-file assumption | MB |
|---|---|---|---|
| Fighter sprite frames (PNG, 1024 tall, avg ~850 px wide) | 114 | 0.87 MP × 1.03 B/px ≈ **0.90 MB** | **102.6** |
| Stage far plates (JPG q90, 3840x1440) | 8 | 5.5 MP × 0.5 B/px ≈ 2.8 MB | 22.4 |
| Stage mid layers (WebP, 3840x960) | 8 | ~0.9 MB | 7.2 |
| Stage foreground strips (WebP, 3840x480) | 4 | ~0.4 MB | 1.6 |
| Stage-select previews (JPG, 1680x720) | 8 | ~0.55 MB | 4.4 |
| Cutscene and Fatal Blow/Fatality stills (JPG q92, 1920x1080) | 26 | 2.07 MP × 0.63 B/px ≈ 1.3 MB | 33.8 |
| Model sheets (JPG, 2560x1440) | 2 | ~1.8 MB | 3.6 |
| UI art: title 4K (4.1), portrait title (1.8), logo (1.0), select full ×2 (5.8), busts ×2 (2.0), versus halves ×2 (7.0), versus bg (1.8), cards ×2 (2.6), tower (1.8) | 13 | as listed | 27.9 |
| VFX + props (PNG 1024-2048) | 14 | 0.4-2.5 MB | 14.4 |
| **Art subtotal** | **197** | | **217.9** |
| Voice lines (WAV; 79 × 44.1 kHz, 141 × 24 kHz; ≈8.9 min) | 220 | avg ~0.15 MB | 32.4 |
| Music (AAC 192 kbps, ≈27.2 min) | 22 tracks | 1.44 MB/min | 39.1 |
| SFX one-shots (WAV mono 44.1 kHz, avg 0.9 s) | 120 | ~79 KB | 9.5 |
| Ambience loops (AAC 192, 45 s) | 8 | ~1.1 MB | 8.6 |
| **Audio subtotal** | **370** | | **89.6** |
| Code, JSON, fonts (2 woff2 display fonts) | | | 1.5 |
| **TOTAL (counted toward the 100 MB goal)** | | | **≈ 309 MB** |
| *Derived phone tier, shipped but not counted* (114 sprites @512 px WebP ~0.07 MB, 8 plates @1920 WebP ~0.35 MB) | | | *≈ 11* |

- **Floor check:** if every estimate were 50% too high, the total would still be ~155 MB, so the 100 MB goal holds.
- **Ceiling:** comfortably below the Gemini brief's 500 MB and GitHub Pages' 1 GB site limit. The largest single file is ~4 MB.
- **If the owner wants it leaner (~200 MB)** while keeping every listed image and line: switch voices to AAC 128 (-25 MB), stage far
  plates to q85 (-6 MB), music to 160 kbps (-6 MB) and sprites to lossless WebP (-25 MB). Don't cut frames.

### 11.1 Delivery so 309 MB stays playable on the web
- `public/assets/manifest.json` defines load groups: `boot` (title, logo, select busts, menu announcer lines, ≈ 9 MB),
  `fighter:<id>:core` (42 frames, ≈ 38 MB HD / 3 MB phone), `fighter:<id>:moves` (15 frames, loaded during the versus screen and round 1),
  `stage:<id>:<variant>`, `story:<chapter>`, `audio:<group>`.
- The **HD tier loads on desktop** with `navigator.connection.effectiveType === '4g'` or no Connection API. Phones and Save-Data use `assets-m/`.
- A service worker (`sw.js`, cache-first, versioned by the manifest hash) means each asset downloads once per visitor.
  This matters for the **GitHub Pages ~100 GB/month soft bandwidth limit** (~1,000+ full sessions/month even uncached).
- Textures upload lazily (on first draw) and Pixi's `TextureGCSystem` unloads frames idle for more than 60 s. Worst-case VRAM
  with every frame of both fighters resident: HD ≈ 114 × 3.5 MB ≈ 400 MB, phone tier ≈ 114 × 0.9 MB ≈ 100 MB. Typical in-match residency is about 60%.
  HD auto-enables only when `navigator.deviceMemory >= 8` (or is unknown on desktop) and `MAX_TEXTURE_SIZE >= 4096`.
- **Git:** plain git, **no LFS**. GitHub Pages deploys via Actions, and LFS checkouts would burn the 1 GB/month LFS bandwidth in about 3 deploys.
  All files are < 50 MB. Commit assets in a few batches, and only after QA approval, to avoid bloating history with rejected takes.

---

## 12. Phased build order

Cumulative MB counts shipped master assets only. v1 fighter and stage images are retired from `public/` when replaced.

| Phase | Work | Exit criteria | Cum. MB |
|---|---|---|---|
| **0. Tooling + phone fixes** | `tools/art/process.py`, `onion.html`, `tools/audit-assets.mjs`, `gen-voice.mjs`, asset manifest + loader, `AnimationPlayer` with v1 poses wired through it, **all section 9 layout fixes**, playtest viewports | Phone screenshots pass 9.4. `npm test`, `npm run build` and the audit are green. | ~1.5 |
| **1. Model sheets + core frames** | Art 115-116, then the 42 common frames × 2 (art 1-42, 58-99) | Every FSM state shows a painted frame, Cory's punch/crouch reuse is gone, onion-skin QA passes | ~81 |
| **2. Voice + announcer** | All 220 lines, `VoiceBank`, ducking, subtitles, Web Speech fallback | Every trigger in the table fires in-game. The check script is green, with zero "K.O." matches. | ~113 ✅ crosses 100 MB |
| **3. Specials, Fatal Blows, Fatalities + VFX** | Art 43-57, 100-114, 184-197 + cut-in stills 161-170 | All specials, both Fatal Blows and both Fatalities play with painted frames and cut-ins | ~168 |
| **4. Stages** | Art 117-144: Scottsdale first, then the other three, then the variants. Parallax stack, variant picker, 8 ambience loops. | 8 playable stage variants, no stretched art, 60 fps on mid-range laptop | ~212 |
| **5. Music + SFX** | 22 tracks, 120 SFX, frame-event wiring, intense-layer crossfade, Finish Him drone | Procedural audio used only as fallback | ~260 |
| **6. UI art, story, modes** | Art 171-183 + story stills 145-160, `CutscenePlayer`, Story Mode, arcade endings, versus screen, Practice upgrades, Fatality Trainer, Gallery | Story completes for both fighters, gallery unlocks persist | ~309 |
| **7. Perf, QA, release** | Service worker, HD/phone tiers, texture GC, full QA (section 13), README update, deploy | Checklist all green | ~309 (+11 derived) |

Generation effort: about 197 final images (plan for roughly 2.5 rolls each, ~500 generations), 220 voice lines × up to 3 takes, and about 150 audio generations.

---

## 13. Verification checklist

**Build and honesty**
- [ ] `npm test` and `npm run build` pass. `du -sh dist` ≥ 100 MB, and the audit report lists MB per category against section 11 (±35%).
- [ ] `tools/audit-assets.mjs`: zero duplicate hashes, zero pHash near-duplicates, zero upscaled images, zero transcode inflations, zero padding chunks, zero orphans.
- [ ] No API keys in the repo (`git grep -nE "sk-|xi-api-key|ELEVENLABS_API_KEY="` finds nothing outside docs).

**Art**
- [ ] All 114 frames: facing right, baseline 983 ± 4 px, standing height 901 ± 15 px, no green fringe (check by zooming on a magenta background), costume matches the model sheet.
- [ ] Bob and Cory each show a unique painted frame in every FSM state of `types/game.ts`. There's no pose reuse except the documented mappings (`up_block`, `flawless_block`, `dash_back`, `wakeup_roll`).
- [ ] Mirror match: P2 palette filters still work on the new frames, and the clones render.
- [ ] All 8 stage variants load with parallax, the fighters' feet sit on the floor band, nothing is stretched (plate aspect 2.67 ± 0.02), and Scottsdale is no longer procedural.
- [ ] Every Fatal Blow/Fatality still is cartoon-only: no blood, no gore, opponent shown as a silhouette.

**Audio**
- [ ] All 220 voice ids present and triggered. Grep transcripts, subtitles and code for `K.O` and find nothing in spoken or displayed text.
- [ ] Voice ducks the music. No clipping (true peak ≤ -1 dBTP). Grunts don't repeat back-to-back.
- [ ] Music loops are seamless. The final-round crossfade lands on the beat. Finish Him drone → fatality sting → victory jingle plays in order.

**Modes**
- [ ] Story Mode completes for both fighters (4 chapters each) and unlocks gallery items.
- [ ] Arcade shows the rival still, ending, credits and continue/game-over.
- [ ] Practice: record/playback, input history and frame advantage work. Combo Trials detect all 5 strings per fighter.
- [ ] Fatality Trainer: range bar is correct for Close/Mid/Sweep, and both Fatalities and Brutalities succeed via input and via Easy Fatality.

**Phone + performance**
- [ ] Section 9.4 assertions pass on all 6 viewports. iPhone Safari and Android Chrome tested on real devices in portrait and landscape.
- [ ] The pause icon never overlaps the touch pad, and the touch pad hides while paused.
- [ ] Title shows the full portrait key art (faces visible) on 390x844.
- [ ] 60 fps during a match on a 2020-era phone (phone tier) and laptop (HD tier). First match playable in < 6 s on 4G with the phone tier.
- [ ] A second visit loads from the service-worker cache with no asset re-downloads (check the DevTools Network panel).
- [ ] Lighthouse: no console errors, and every image has `alt` text.
