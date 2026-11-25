# v2 SFX, ambience and stings

All of these came from ElevenLabs Sound Effects v3 (`eleven_text_to_sound_v3`), generated in the
ElevenLabs flow `oxflow5eoigTNjQT21Tx` on 2026-11-24. There are no music tracks here. Suno is
making those.

## What shipped (PLAN.md §7)

| Set | Files | Format |
|---|---|---|
| One-shots | 120 in `public/assets/audio/sfx/` | WAV, 16-bit, mono, 44.1 kHz |
| Ambience loops | 8 in `public/assets/audio/ambience/` (4 stages × night/day; only night is used until day stages exist) | WAV, 16-bit, stereo, 44.1 kHz, 30 s seamless |
| Stings | 7 in `public/assets/audio/stings/`: versus, finish-him drone loop, Bob and Cory fatality, Bob and Cory victory, game over | WAV, 16-bit, stereo, 44.1 kHz |

- The manifest is `src/data/sfx-manifest.json`. Each id has its takes, a loop flag and a gain value (ambience only).
- Prompts, durations and take counts are in `tools/sfx/spec.py`.

## Quality

- ElevenLabs delivers 44.1 kHz, 128 kbps MP3 masters.
- Each file is a straight decode of its master at the same sample rate. No upsampling, no enhancement.
- One-shots are summed to mono (the plan's format), trimmed of leading and trailing silence, and peak-normalised to -1 dBFS. That is gain only.
- Stings are trimmed and peak-normalised the same way.
- Ambience and loops are left sample-for-sample untouched. They ship as WAV because MP3 encoder padding breaks gapless `AudioBufferSourceNode.loop`.

### Limits

- The ElevenLabs SFX API caps a clip at 30 s. So the ambience loops are 30 s, not the plan's 45 s, and the Finish Him drone is a 30 s loop, not 40 s.

## QA (`tools/sfx/qa.py`; raw results in `tools/sfx/qa-raw-takes.json`)

Every take was checked for:
- length against the request
- peak and RMS level
- clipped samples
- share of silent 50 ms windows
- leading silence

Results:
- No take clipped.
- Rejected, and redone once:
  - `misc_timer_tick` takes 1-2 were digital silence; take 3 shipped.
  - `ui_hover` takes 1 and 3 were silent or -48 dB; takes 2 and 4 shipped.
- Ambience and crowd clips went through Whisper. It returned only its usual hallucinations on non-speech audio, so there is no intelligible speech.
- Loop seams were checked: the sample jump at the wrap point is below the clip's normal sample-to-sample step.
- Stings were picked by waveform from 2 takes each. The alternate takes are kept outside the repo in `v2/sfx/raw/`.

## In game

- `src/audio/SfxBank.ts` does the fetch and decode, picks takes without back-to-back repeats, and applies ±8% pitch and ±2 dB gain variation.
- `src/audio/SfxDirector.ts` maps engine events and state changes to sounds:
  - hits (light, heavy, special), blocks, flawless, parry, whooshes on move start
  - footsteps by stage surface, jumps and landings, knockdown body falls, throws
  - Bob and Cory signature specials, Fatal Blow and Fatality sequences
  - dizzy-bird loop, round bell, last-10-seconds timer tick, combo breaker, meter full
  - versus sting at intro, victory jingle or arcade game-over at match end, Fatality stings
- `AudioEngine`:
  - Plays the recorded Finish Him drone in place of the procedural drone.
  - Plays per-stage ambience on its own bus.
  - Uses the sample gong for announcer calls.
  - Plays UI hover, confirm, back and lock-in sounds.
- When a sample is missing or not decoded yet, the old procedural Web Audio sound plays instead.

## Cost

About 1,813 ElevenLabs credits in total: 150 generations, including the redos.
