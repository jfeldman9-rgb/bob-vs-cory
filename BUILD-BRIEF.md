# Build brief: Bob vs Cory, a Mortal Kombat-style fighting game

Read docs/GEMINI-PLAN.md (the 100-goal plan) and docs/GEMINI-THREAD.md first. Build the game they describe in this folder.

## Decisions (already made, don't ask)
- Tech: web build, Vite + PixiJS (or Phaser 3/4 if you prefer), plain JS or TS. No Godot. It must run from GitHub Pages (relative paths, `vite build` into `dist/` with base './') and from `npm run dev`.
- Build a fully playable game first, then polish: 60 Hz fixed timestep, frame data in JSON, hitboxes/hurtboxes, input buffer, blocking, health bars, round timer, best-of-3 rounds.
- Fighters: "Agent Bob" (Agent Smith style: black/charcoal suit, tie, dark hair, full beard, narrow dark glasses) and "Flamboyant Cory" (sequined plum/purple couture, feathers, swept light hair, clean-shaven, rhinestone sunglasses). Cory is campy and flirty toward Bob with affectionate ribbing. No slurs. Look references: reference/*.webp.
- Implement the plan's movesets, combo strings, Fatal Blows (at or below 30% health) and eggplant Fatalities (Bob "Inevitable Parm", Cory "Runway Aubergine"). Keep them cartoon/comic, not gory.
- Stages from the plan: Matrix subway platform, neon disco penthouse rooftop, Great Eggplant Colosseum, and Scottsdale midnight VIP lounge courtyard.
- Modes: 1P vs CPU (easy/normal/hard AI), 2P local on one keyboard, training mode, and a moves list screen. Keyboard and gamepad. Touch controls on phones.
- Art: make it look good. Generate rich painted art for the fighters (multiple poses/frames: idle, walk, jump, crouch, punch, kick, special, hurt, block, win, fatality) and the stages with your image generation where you can; otherwise draw detailed procedural art. No stick figures or flat boxes.
- Audio: procedural/WebAudio SFX and music are fine. Announcer text calls like "FIGHT!", "Agent Bob wins", "FATALITY". The announcer never says "K.O.".
- Write a README.md (how to play, controls, moves) and add `npm test` with a few unit tests for frame data/hit detection. Run it, `npm run build`, and fix all errors and console errors before finishing.
- Do not push to git or GitHub; I'll do that. Don't put secrets in the repo.
