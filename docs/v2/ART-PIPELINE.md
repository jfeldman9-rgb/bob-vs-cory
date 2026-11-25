# v2 art pipeline

Raw Gemini/Antigravity frames go in `../v2/gemini-raw/` (outside the repo; not shipped), named
`NNN_<fighter>_<frame>.(png|jpeg)` where NNN is the entry number in `docs/v2/art-prompts.md`.

    npm run art                       # process every new raw file + write ../shots/v2-art-sheet.png
    python3 tools/process-art.py --only 17-30 --force --sheet ../shots/batch.png

The script keys out the #00FF00 background (soft matte, speck removal, green despill), trims, scales by pose
(`tools/art-pose-ratios.json`; standing figure = 88% of a 2048 px canvas, feet at 96%), writes an optimized RGBA PNG to
the target path from art-prompts.md and updates `public/assets/fighters/<fighter>/frames.json` (w, h, pivotX, baselineY).
Frames listed in `tools/art-rejects.json` are skipped and any old output removed.

`src/render/FrameSets.ts` maps fighter states to frames; anything without a v2 frame falls back to the v1 pose sprite.

## Batch 1 (Bob 1-16)
Accepted: idle_01-03, walk_02-04, walk_back, dash, jump_takeoff, jump_apex, jump_fall, crouch, block.
Rejected: walk_01 (same as idle), fp_01 (same as idle_02, no punch), crouch_block (standing block).
Note: walk_02-04 are nearly identical (one stride pose), and jump_takeoff is an airborne pose, not the crouched launch the prompt asked for.

## Batch 2 (Bob 17-25, Antigravity gemini-3.1-flash-image, 1200x896 / 896x1200)
Accepted: fp_02, bp_01, bp_02, fk_01, fk_02, bk_01, bk_02, sweep (Lanczos-upscaled ~1.5-2x to the shared 2048 px canvas; no generated detail).
Rejected: none. Kicks use the `head_foot` pivot (tools/art-pose-ratios.json) so Bob's body doesn't jump back when the leg extends.
Attack frames per move: `src/data/attack-frames.json` (startup -> *_01, active/recovery -> *_02). Not mapped (stay v1): specials,
air attacks, crouch pokes d_1/d_3, uppercut d_2, low kick s_b23, finisher hits s_112/s_212.
Hitbox check: `python3 tools/hitbox-check.py ../shots/v2-bob-hitbox-check.png`. Punch/kick reach matches the hitboxes'
far edge (kicks overshoot ~25 px), but the art strikes at head height while mid hitboxes sit at chest height (gameplay unchanged).
