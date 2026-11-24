# 100-Goal Master Production Plan (from Gemini thread https://gemini.google.com/app/613a0a097c4169fd)
Game: Mortal Kombat-style 2.5D fighter, Agent Bob (Agent Smith style) vs Flamboyant Cory. Engine suggested: Godot 4 (or Vite+PixiJS/Three.js+Electron). Build size 100-500 MB.

## Phase 1: Engine Architecture & Core 60 FPS Combat Loop (1-10)
1. Initialize repo structure (Godot 4 project or Vite/PixiJS/Electron workspace) with Git LFS for binary assets.
2. Lock combat simulation to deterministic 60 Hz fixed timestep decoupled from display refresh.
3. Fighter FSM: Idle, Walk, Dash, Jump, Crouch, Attack, Block, Hitstun, Knockdown, Wakeup, Dizzy, Fatality.
4. Automatic fighter facing logic incl. crossovers.
5. 2.5D dynamic camera rig: horizontal tracking, boundary clamp, distance-based zoom, vertical jump follow.
6. Round flow controller (Intro Clash > Round 1 > Fight > KO > Round 2 > Final Round > Finish Him! > Victory).
7. Configurable 99-second timer with timeout victory by remaining health %.
8. Screen-shake, directional hitstop, chromatic aberration hooks.
9. Frame-by-frame debug overlay (FPS, state, anim frame, frame advantage).
10. Local 2-player input routing: keyboard + dual gamepads (Xbox/PS/Steam Deck).

## Phase 2: Input Buffer, Hitboxes, Hurtboxes & Frame Data (11-20)
11. JSON/Resource frame-data schema (startup, active, recovery, damage, chip, blockstun, hitstun, knockback).
12. 8-frame input buffer and motion parser (quarter-circles, back-forward, double-taps, Fatality sequences).
13. Pushbox/Hurtbox/Hitbox layers per animation frame.
14. Attack height classes (High, Mid, Low, Overhead, Unblockable).
15. Dedicated Block button; standing/crouching block logic.
16. Flawless Block (3-frame window) with meter gain and reduced blockstun.
17. Up-Block counter to jump-ins/overheads with punish window.
18. Dial-a-combo strings (3-4 hits) with cancel windows into specials.
19. Combo damage scaling (gravity increase, damage decay).
20. Throws and throw-tech (escape window, wall swaps).

## Phase 3: Character Art Pipeline - Agent Bob & Flamboyant Cory (21-30)
21. Master turnaround sheets for Agent Bob (preserve beard, hair, facial likeness from photo IMG_5029.jpeg).
22. Master turnaround sheets for Flamboyant Cory (likeness and grin from photo; sequined/feathered wardrobe).
23. Unified art-style guide matching The Legend of Claudia's detail, silhouettes, shading, proportion.
24. High-res idle, walk fwd/back, crouch, jump cycles for both.
25. Normal-attack sprite sequences for Agent Bob (1,2,3,4, crouching pokes, sweep, uppercut, jump kicks).
26. Normal-attack sprite sequences for Cory (slaps, runway high kicks, spin sweeps, uppercut, aerial poses).
27. Hit-reaction, launch/juggle, hard-knockdown, get-up, block-recoil, dizzy sets for both.
28. Normal maps for sprite sheets (neon pink spotlights, Matrix green glow).
29. 1024x1024 select portraits, VS-screen splash art, bruised/battle-damage overlay decals.
30. Pack frames into GPU-optimized atlases with consistent pivots and pixel-accurate hitbox alignment.

## Phase 4: Agent Bob Moveset, Combos & Matrix Mechanics (31-40)
31. Blurred Palm Flurry (multi-hit mid; EX extra bounce).
32. System Glitch Teleport (green code; EX faster/safer).
33. Digital Eggplant Toss (wireframe eggplant projectile; EX dual spread).
34. Agent Clone Grapple (second Agent Bob restrains opponent for combo extension).
35. Bullet-Time Lean Counter (low-profile Matrix back-bend parry, slow-mo counter).
36. Glasses Adjust Taunt (restores sliver of meter).
37. 5 dial-a-combo strings: "Mr. Anderson", "Inevitable", "System Override", "Code Injection", "Hostile Takeover".
38. Aerial Matrix Dive for mid-air continuations.
39. Wakeup Roll & Armored Get-Up Kick (1 bar).
40. Tune frame data: disciplined pressure-heavy rushdown/counter archetype.

## Phase 5: Flamboyant Cory Moveset, Combos & Glam Mechanics (41-50)
41. Glitter Bomb projectile (hot-pink explosion; EX lingering stun cloud).
42. Runway Strut Dash (invincible spin-dash, rainbow feather trail; EX juggle launch).
43. Disco Ball Drop (overhead/unblockable-setup trap).
44. Vogue Pose Parry (spotlight pose, camera-flash freeze; punishes physical strikes).
45. Boa Whip Lash (long-range feather-boa grab).
46. Fabulous Air Twirl (multi-hit rising aerial kick; anti-air/combo ender).
47. 5 combo strings: "Werk It", "Center Stage", "Sequined Fury", "Encore", "Velvet Rope".
48. Glitter Trail & Feather Physics particles on limbs.
49. Spotlight Taunt (stage beam, crowd SFX, builds meter).
50. Tune frame data: high-mobility mix-up/trickster zoning archetype.

## Phase 6: Fatal Blows, Finish Him! & Eggplant Fatalities (51-60)
51. 3-bar Super Meter UI/logic: EX Specials (1 bar), Combo Breakers (3 bars).
52. Fatal Blow trigger (L2+R2 when HP <= 30%): startup armor, red/gold flash freeze, once per match.
53. Agent Bob Fatal Blow "System Purge": slow-mo sunglasses glare, triple-clone beatdown, Matrix-code eggplant uppercut.
54. Cory Fatal Blow "Showstopper": flash-photography freeze, glitter spin-kicks, giant disco-ball slam.
55. FINISH HIM! state: lighting dims 65%, tension drone, 6-second dizzy loop, Fatality listener.
56. Fatality Distance Validator (Close, Mid, Sweep) with toggleable Easy Fatality/Training guide.
57. Bob Eggplant Fatality "Inevitable Parm": scripted cameras, green-rain code sky, floating eggplant firing squad, colossal glowing eggplant finisher.
58. Cory Eggplant Fatality "Runway Aubergine": neon runway, giant mirror-tiled disco eggplant descent, launch explosion, purple confetti.
59. Secret Brutality per fighter (final round ended with specific EX special = comical eggplant-splat finish).
60. FATALITY blood-purple/neon victory card, victory pose camera pan, replay button.

## Phase 7: High-Detail Parallax Arenas, Lighting & Shaders (61-70)
61. Arena 1: Rain-Soaked Matrix Subway Platform (flickering bulbs, passing train, wet tiles, rain shader).
62. Arena 2: Neon Disco Penthouse Rooftop (skyline, pulsing floor, volumetric spotlights, disco balls, VIP ropes).
63. Arena 3: The Great Eggplant Colosseum (stone temple, golden eggplant statues, torches, stormy twilight).
64. Arena 4: Scottsdale Midnight Alley / VIP Lounge Courtyard (desert night, palm silhouettes, neon signs).
65. 6-8 layer parallax synced to 2.5D camera for each arena.
66. Custom shaders: rain streaks, Matrix digital rain, sequin shimmer, hit-flash whiteout, shockwave distortion.
67. Wall-bounce visual cues and persistent ground dust/spark decals.
68. Dynamic 2D normal-mapped point lights for projectiles, spotlights, explosions.
69. Animated background spectators/elements (silhouetted clubbers, code terminals).
70. Stage-select carousel with live animated thumbnails.

## Phase 8: Voice Acting, Announcer, SFX & Dynamic Music (71-80)
71. Kombat Announcer voice pack ("AGENT BOB!", "FLAMBOYANT CORY!", "ROUND ONE - FIGHT!", "FINISH HIM!", "FATALITY!", "FLAWLESS VICTORY!").
72. 6 voiced pre-match banter exchanges (Bob deadpanning Matrix threats, Cory roasting his boring suit).
73. Vocal effort sets per fighter: attack grunts, pain yelps, launch screams, dizzy groans, victory one-liners.
74. Layered combat foley engine with randomized pitch/volume.
75. Signature effects: Matrix warp tones, sunglasses click, glitter chimes, camera shutter, wet/explosive eggplant impacts.
76. 4 original stage tracks (industrial cyberpunk breakbeat, nu-disco synth funk, epic orchestral choir, midnight synthwave).
77. Adaptive music layering: intensity in Final Round, ominous bass drone on FINISH HIM!.
78. UI sounds (metallic gong confirms, hover ticks, heavy slam on lock-in).
79. Audio mixer buses (Master, Voice/Announcer, SFX, Music) with ducking.
80. Sync audio to animation frame events.

## Phase 9: HUD, Health Bars, Menus, AI Opponent & Game Modes (81-90)
81. MK-style HUD: angled metallic/neon health bars with red trailing drain, portraits, nameplates, round-win medallions.
82. Combo counter (5 HITS - 24% DAMAGE) and callouts (FIRST HIT, REVERSAL, PUNISH, FLAWLESS BLOCK, COUNTER).
83. Bottom Super Meter (3 segments) and pulsing FATAL BLOW READY badge below 30%.
84. Main Title Screen with animated Bob vs Cory art and menus.
85. Character & Stage Select with voiced lock-ins, >=3 alternate palettes per fighter.
86. Pause Menu with full Move List (strings, specials, EX, Fatal Blow, Eggplant Fatality inputs/ranges).
87. CPU AI (Very Easy, Normal, Hard, Very Hard): spacing heuristics, anti-air, combos, reaction delays.
88. Versus Mode (P vs CPU, P vs P2, CPU vs CPU spectate).
89. Training Mode (infinite time, regen health/meter, input history, hitbox toggle, dummy record/block).
90. Klassic Arcade Tower Mode (escalating AI ladder, buffed mirror/rival boss, end credits).

## Phase 10: Optimization, Packaging (100-500 MB Build) & Polish (91-100)
91. Audit total asset footprint; lock build within 100-500 MB without losing art detail.
92. Background asset preloading and VS-clash loading transitions; zero frame drops in match.
93. VRAM texture compression and audio streaming; 1080p/60fps on desktop, laptops, handhelds.
94. Graphics & Controls settings (fullscreen/windowed, resolution scaling, V-Sync, screen-shake toggle, remapping).
95. Persistent local save data (win/loss stats, unlocked palettes, training prefs, combo records).
96. Collision and corner-trap stress test (no clipping, soft-locks, desync on double KO).
97. Balance-test Bob vs Cory matchup.
98. Polish transition timing; rematches load under 2 seconds.
99. Package builds (Windows .exe, macOS .app, optional Linux/Steam Deck) with icon and splash.
100. Final end-to-end QA playthrough of every move, Fatal Blow, Fatality, voice line, UI screen before v1.0.
