# v2 voice pass (branch `v2-expansion`)

220 recorded lines in `public/assets/audio/voice/`, listed in `src/data/voice-manifest.json` (id, speaker, file, trigger, text, source).

| Speaker | Engine | Voice | Lines | Format |
|---|---|---|---|---|
| Announcer + narrator | ElevenLabs `eleven_v4` | Jason clone `Of6MrggueGNHio3zxb9C` | 79 (74 new + 5 reused from velvet-vendetta: round 1, round 2, final round, time, knockout) | MP3 44.1 kHz 128 kbps (source format on the current plan; not upsampled) |
| Agent Bob | OpenAI `gpt-4o-mini-tts` | onyx | 71 | WAV 24 kHz 16-bit mono (native, lossless) |
| Flamboyant Cory | OpenAI `gpt-4o-mini-tts` | ballad | 70 | WAV 24 kHz 16-bit mono (native, lossless) |

Processing: silence trimmed (60 ms head / 120 ms tail), loudness-normalised to -16 LUFS / -1 dBTP; grunts capped at 1.6 s. Every take was transcribed with Whisper and compared to the script; announcer lines were generated in batches (2 takes each) and split on pauses, best-scoring take kept.

The announcer never says "K.O." (test-enforced). Story/narration lines (`narr_*`, `*_story_*`) are rendered and in the manifest, and get wired when Story mode lands (PLAN.md Phase 4).

Wiring: `src/audio/VoiceBank.ts` (loading/playback, per-speaker channel), `src/audio/VoiceDirector.ts` (engine state/events -> lines), `AudioEngine.speakAnnouncer` (recorded clip first, Web Speech fallback), `UIManager` (menu/select/stage/versus calls, victory quote). Tests: `tests/voice.test.ts`.
