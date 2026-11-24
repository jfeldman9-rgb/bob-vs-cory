# Gemini thread: "Create a mortal Kombat style game. Include great game art equal to the legend of Claudia in its deta…"
URL: https://gemini.google.com/app/613a0a097c4169fd
Account: jfeldman9 (Jason F, Pro). Model shown: Neon / High. Attachment referenced: IMG_5029.jpeg (reference photo of Bob and Cory)

## User
Create a mortal Kombat style game. Include great game art equal to the legend of Claudia in its detail and quality. Include voices and sound effects. Have health bars etc. first research modern mortal kombat style games. Have fatalities involve and eggplant. Have Cory dressed flamboyantly and bob like agent smith. I expect the game to be between 100 and 500mb. Do a planning session first and set 100 goals.

## Gemini
I encountered an error doing what you asked. Could you try again?

## User
Try again.

## Gemini
### Modern Mortal Kombat Research & Design Benchmarks
Modern NetherRealm fighters (MK11 and MK1) separate themselves from anime fighters and Street Fighter through structural pillars:
- Locked 60 FPS Frame-Data Architecture: strict startup/active/recovery frames, fixed-timestep physics, deterministic hitboxes/hurtboxes/pushboxes and frame advantage.
- 4-Button Limbs + Dedicated Block: Front Punch (1), Back Punch (2), Front Kick (3), Back Kick (4), plus Block button; Up-Block / Flawless Block reward tight timing with reduced chip damage and punishable gaps.
- Dial-a-Combo Strings & Special Cancels: short target strings (e.g., 1,1,2 or Back+2,3) flowing into special cancels and aerial juggles (MK1 emphasizes air-combo extensions and dash-blocking).
- 3-Segment Super Meter: built by hitting, blocking, taking damage; spent on Enhanced (EX) Specials (1 bar) and Combo Breakers (3 bars).
- Fatal Blow Comeback Mechanic: once per match below 30% health; armored, high-damage (~30-35%) cinematic with X-ray/slow-motion zoom; whiffed/blocked = short cooldown.
- Pre-Match Clash Banter & Dynamic Camera: voiced intro clashes into "ROUND 1 - FIGHT!"; 2.5D camera tracks spacing, zooms on heavy hits, dims arena during FINISH HIM!.
- Range-Checked Fatalities & Brutalities: triggered in post-round dizzy state (Close, Mid, Sweep distance) via directional inputs, handing off to a scripted multi-beat cinematic with custom lighting, camera cuts, particles, announcer sting.

### Core Game Concept, Roster & 100-500 MB Architecture
**Playable Fighters**
- **Agent Bob (The Inevitable Anomaly)**: Built around Bob's likeness from the reference photo (short dark hair, trimmed full beard, athletic build), in a razor-sharp Agent Smith ensemble: tailored charcoal-black suit, crisp white shirt, black tie, rectangular dark sunglasses, coiled security earpiece. Stiff, relentless martial-arts stance, rapid-fire blurred palm strikes, glitch-step teleports, clone-assist specials.
- **Flamboyant Cory (The Disco Sovereign)**: Built around Cory's likeness from the reference photo (clean-shaven, short light-brown hair, wide grin), in maximum theatrical flair: sequined hot-pink/iridescent open blazer with feathered shoulders, shimmering metallic flare pants, oversized rhinestone sunglasses, glowing glitter trails, runway-vogue stances. Acrobatic, high-mobility, flashy mix-ups, spotlight parries, disco-ball traps.

**Signature Eggplant Fatalities**
- Agent Bob - "Inevitable Parm": Bob adjusts sunglasses, multiplies into three Agent Bob clones, pins the opponent in slow-motion Matrix code. Dozens of glowing green-wireframe eggplants materialize mid-air, freeze, then fire simultaneously into a massive orbital eggplant slam that flattens the arena in purple sparks and marinara steam.
- Flamboyant Cory - "Runway Aubergine": Arena becomes a neon fashion runway. Cory strikes three paparazzi poses as a colossal mirror-tiled disco eggplant descends from the rafters, spins at hyper-speed, launches the opponent skyward into a glittering eggplant-confetti explosion while Cory bows.

### Engine & 100-500 MB Asset Budget
Reaching 100-500 MB with Legend-of-Claudia-level art requires a real binary asset pipeline, not a single-file script. Godot 4 (Windows/macOS/Steam Deck/WebAssembly) or Vite + PixiJS/Three.js + Electron is the cleanest architecture.

| Asset Category | Format & Resolution Strategy | Target Size |
|---|---|---|
| Character Sprites / 2.5D Rigs | 2K-4K sprite sheets (PNG/WebP lossless or BC7 atlases), 15-20 animation states per fighter, normal maps | 110-180 MB |
| Multi-Layer Parallax Stages | 4 arenas (6-8 parallax layers each at 3840x2160), animated props, volumetric rain/glitter overlays | 45-90 MB |
| Voice Acting & Announcer | High-bitrate OGG/WAV: intros, grunts, hit reactions, taunts, Fatality calls, announcer | 25-50 MB |
| Sound Effects & Foley | Layered punches, suit rustles, Matrix glitches, disco synths, eggplant impacts, bone-crack Fatal Blow | 15-30 MB |
| Dynamic Soundtrack | 4 stage themes + select + Fatality tension loop + victory themes (OGG, low-HP intensity stems) | 30-60 MB |
| VFX & Fatality Cinematics | Particle flipbooks (glitter, green Matrix rain, purple eggplant mist, shockwaves) + optional pre-rendered 1080p/60 flourishes | 35-70 MB |
| Engine Runtime & Code | Godot 4 / Electron runtime, shaders, frame-data JSON, AI state trees | 40-60 MB |
| Total | | ~300-540 MB (tuned inside 100-500 MB) |

### The 100-Goal Master Production Plan
(see plan.md for the full list)

Closing question from Gemini: "Would you like to kick off Phase 1 & Phase 3 right now by locking in Godot 4 as our main engine and generating the first high-detail character concept art/turnarounds for Agent Bob and Flamboyant Cory, or would you rather start with a playable interactive combat engine prototype first to nail the controls, health bars, and feel?"
(Thread ends there; no further user turns.)
