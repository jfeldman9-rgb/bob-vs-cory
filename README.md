# BOB vs CORY: KOMBAT — Inevitable vs Fabulous

A Mortal Kombat-style 2.5D web fighting game starring **Agent Bob** (*The Inevitable Anomaly*) and **Flamboyant Cory** (*The Disco Sovereign*), built with **Vite + TypeScript + PixiJS 8** and a deterministic **60 Hz fixed-timestep** combat engine.

## Quick Start

```bash
npm install
npm run dev      # Start local dev server
npm test         # Run Vitest unit tests (frame data, hitboxes, input buffer, combat)
npm run build    # Type-check & build static bundle into dist/ (GitHub Pages ready)
```

## Game Modes

- **1P vs CPU** (Easy, Normal, Hard, Very Hard AI)
- **2P Local Versus** (Shared Keyboard and/or Dual Gamepads)
- **Klassic Arcade Tower** (Escalating 4-stage ladder across all arenas)
- **Training Mode** (Infinite timer, health/meter regen, hitbox overlay, dummy block modes, live frame data)
- **CPU vs CPU Spectate**
- **Moves List & Settings** (4 alternate palettes per fighter, audio mixer buses, persistent stats)

## Controls

### Player 1 (Keyboard)
| Action | Keys |
|---|---|
| Move / Jump / Crouch | `W` `A` `S` `D` (also Arrow keys in 1P modes) |
| Front Punch (`1`) | `U` or `Z` |
| Back Punch (`2`) | `I` or `X` |
| Front Kick (`3`) | `J` or `C` |
| Back Kick (`4`) | `K` or `V` |
| Dedicated Block | `Space`, `L`, or `Left Shift` |
| Enhance (`EX`) / Throw | `O` or `E` (or `1 + 3` for Throw) |
| Fatal Blow (HP ≤ 30%) | `F` or `H` |
| Taunt (+Meter) | `T` |
| Pause / Moves List | `Esc` |

### Player 2 (Shared Keyboard — 2P Local)
| Action | Keys |
|---|---|
| Move / Jump / Crouch | Arrow Keys (`↑` `←` `↓` `→`) |
| Front Punch (`1`) | `Numpad 4` / `Numpad 7` / `[` |
| Back Punch (`2`) | `Numpad 5` / `Numpad 8` / `]` |
| Front Kick (`3`) | `Numpad 1` / `;` |
| Back Kick (`4`) | `Numpad 2` / `'` |
| Dedicated Block | `Numpad 0` / `Right Shift` / `/` |
| Enhance (`EX`) / Throw | `Numpad 6` / `Numpad 9` / `\` |
| Fatal Blow (HP ≤ 30%) | `Numpad 3` / `Enter` |

### Gamepads & Mobile Touch
- **Xbox / PlayStation / Steam Deck**: D-Pad or Left Stick to move; `X/Square` (`1`), `Y/Triangle` (`2`), `A/Cross` (`3`), `B/Circle` (`4`), `RB/RT` Block, `LB` EX, `LT+RT` Fatal Blow.
- **Phones & Tablets**: On-screen touch controls auto-enable on touch devices (and can be toggled in Settings).

## Core Combat Mechanics

- **Dedicated Block**: Hold Block to guard High/Mid/Overhead; hold Down+Block to guard Low.
- **Flawless Block**: Tap Block within 3 frames of impact for 0 chip damage, bonus meter, and reduced blockstun.
- **Up-Block**: Hold Up + Block to counter jump-ins and overheads for a big punish window.
- **Combo Breaker (3 Bars)**: Press Forward + Block while taking a combo to break out.
- **Wakeup Options (1 Bar)**: During knockdown, press Forward/Back + EX for an invincible Wakeup Roll, or Up + `3` for an Armored Get-Up Kick.
- **Fatal Blow (HP ≤ 30%)**: Once per match, press `F` (or `L2+R2`) for an armored cinematic comeback strike.

## Movesets, Fatal Blows & Eggplant Fatalities

### Agent Bob (*The Inevitable Anomaly*)
- **Combo Strings**: *Mr. Anderson* (`1, 1, 2`), *Inevitable* (`1, 2, 4`), *System Override* (`2, 1, 2`), *Code Injection* (`3, 4`), *Hostile Takeover* (`←+2, 3, 4`)
- **Specials**:
  - **Blurred Palm Flurry** (`← → + 1`, +EX for armor & launch)
  - **System Glitch Teleport** (`↓ ← + 3`, +EX faster & invincible)
  - **Digital Eggplant Toss** (`↓ → + 2`, +EX dual spread)
  - **Agent Clone Grapple** (`↓ ← + 2`)
  - **Bullet-Time Lean Counter** (`↓ ← + 4`)
  - **Aerial Matrix Dive** (`Air ↓ → + 3`)
- **Fatal Blow**: *System Purge* (`F` at ≤ 30% HP)
- **Eggplant Fatality**: **Inevitable Parm** — `→ ↓ → + 2` (Mid range during *FINISH HIM!*, or press `F` with Easy Fatality enabled)
- **Secret Brutality**: End the final deciding round with **EX Dual Digital Eggplant** (*Parmesan Override*)

### Flamboyant Cory (*The Disco Sovereign*)
- **Combo Strings**: *Werk It* (`1, 1, 2`), *Center Stage* (`1, 2, 4`), *Sequined Fury* (`2, 1, 3`), *Encore* (`3, 4`), *Velvet Rope* (`←+2, 3, 4`)
- **Specials**:
  - **Glitter Bomb** (`↓ → + 1`, +EX lingering stun cloud)
  - **Runway Strut Dash** (`← → + 3`, +EX juggle launch)
  - **Disco Ball Drop** (`↓ ← + 2`, overhead trap)
  - **Vogue Pose Parry** (`↓ ← + 4`)
  - **Boa Whip Lash** (`← → + 2`)
  - **Fabulous Air Twirl** (`↓ → + 3`, ground or air)
- **Fatal Blow**: *Showstopper* (`F` at ≤ 30% HP)
- **Eggplant Fatality**: **Runway Aubergine** — `← ↓ ← + 4` (Mid/Sweep range during *FINISH HIM!*, or press `F` with Easy Fatality enabled)
- **Secret Brutality**: End the final deciding round with **EX Glitter Bomb Cloud** (*Fabulous Eggplant Splat*)

## Arenas
1. **Matrix Subway Platform** — Rain-Soaked Sector 07
2. **Neon Disco Penthouse** — Skyline VIP Rooftop
3. **Great Eggplant Colosseum** — Temple of the Golden Aubergine
4. **Scottsdale Midnight Lounge** — VIP Desert Courtyard

## Play online

Live build: [https://jfeldman9-rgb.github.io/bob-vs-cory/](https://jfeldman9-rgb.github.io/bob-vs-cory/)

This repo deploys `dist/` to GitHub Pages on every push to `main`.
