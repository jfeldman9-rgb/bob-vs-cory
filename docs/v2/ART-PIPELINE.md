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
