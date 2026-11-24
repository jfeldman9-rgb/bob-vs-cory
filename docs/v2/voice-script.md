# Bob vs Cory v2 - VOICE SCRIPT

**220 lines** - announcer/narrator 79, Agent Bob 71, Flamboyant Cory 70.
Estimated 8.9 minutes of audio, about 32.4 MB as native-rate WAV (see PLAN.md budget).

## Rules

- **Never "K.O."** The announcer says "Knockout!" or a winner line. `AudioEngine` keeps its regex guard, and the build
  script `tools/audio/check-voice.mjs` fails if any transcript matches `/\bK\.?\s?O\b/i`.
- Cory is campy, flirty and affectionate. Bob is deadpan. No slurs, no insults about identity, nothing hateful. The jokes
  are about suits, sequins, spreadsheets and disco.
- Banter lines (`*_banter_*`, `*_mirror_*`) reproduce `src/data/banter.ts` text so the subtitles match. If the text in
  banter.ts changes, update both.
- Files are saved as `public/assets/audio/voice/<id>.wav`. Normalise every line to -16 LUFS integrated with a -1 dBTP
  ceiling, trim silence to 60 ms head and 120 ms tail, and never resample upward.

## Engine settings

| Speaker | Engine / model | Voice | Output format | Settings |
|---|---|---|---|---|
| announcer + narrator | ElevenLabs `eleven_multilingual_v2` (or `eleven_v3` for extra energy on ROAR lines) | Owner's "Jason" voice clone | `pcm_44100` (needs a Pro or higher plan; otherwise `mp3_44100_192`, shipped as-is and not transcoded) | stability 0.35 for calls / 0.55 for narration, similarity 0.85, style 0.55, speaker boost on. Generate 3 takes and keep the best. |
| bob | OpenAI `gpt-4o-mini-tts` | `onyx` | `wav` (24 kHz mono, 16-bit) | `instructions` = the style direction column, prefixed with "Voice: a cold, deliberate suited government agent." |
| cory | OpenAI `gpt-4o-mini-tts` | `ballad` | `wav` (24 kHz mono, 16-bit) | `instructions` = the style direction column, prefixed with "Voice: a flamboyant, campy, warm disco showman." |

Grunts and efforts are written as vocalizations. If TTS reads one as a word, re-roll it, or add "a wordless effort
sound, not speech" to the instructions. Keep 2-3 takes of each grunt as **different** ids only if they actually sound
different. Never copy a file.

## Script

| # | id | speaker | engine | voice | style direction | trigger in game | line |
|---|---|---|---|---|---|---|---|
| 1 | `ann_title_main` | announcer | elevenlabs | Jason (ElevenLabs clone) | Booming arena roar, long vowels, huge energy | title screen | Bob versus Cory! |
| 2 | `ann_title_sub` | announcer | elevenlabs | Jason (ElevenLabs clone) | Grand, slower, savour each word | title screen (after main) | Inevitable... versus Fabulous! |
| 3 | `ann_menu_story` | announcer | elevenlabs | Jason (ElevenLabs clone) | Punchy hype call, fast and bright | menu select | Story mode! |
| 4 | `ann_menu_arcade` | announcer | elevenlabs | Jason (ElevenLabs clone) | Punchy hype call, fast and bright | menu select | Klassic Arcade Tower! |
| 5 | `ann_menu_versus` | announcer | elevenlabs | Jason (ElevenLabs clone) | Punchy hype call, fast and bright | menu select | Versus mode! |
| 6 | `ann_menu_training` | announcer | elevenlabs | Jason (ElevenLabs clone) | Punchy hype call, fast and bright | menu select | Practice mode! |
| 7 | `ann_menu_fatality_trainer` | announcer | elevenlabs | Jason (ElevenLabs clone) | Sinister grin in the voice | menu select | Fatality trainer! |
| 8 | `ann_select_prompt` | announcer | elevenlabs | Jason (ElevenLabs clone) | Booming arena roar, long vowels, huge energy | character select open | Choose your fighter! |
| 9 | `ann_select_bob` | announcer | elevenlabs | Jason (ElevenLabs clone) | Booming arena roar, long vowels, huge energy | select lock-in | Agent Bob! |
| 10 | `ann_select_cory` | announcer | elevenlabs | Jason (ElevenLabs clone) | Booming arena roar, long vowels, huge energy | select lock-in | Flamboyant Cory! |
| 11 | `ann_select_bob_title` | announcer | elevenlabs | Jason (ElevenLabs clone) | Grand introduction | select hover (long) | Agent Bob, the Inevitable Anomaly! |
| 12 | `ann_select_cory_title` | announcer | elevenlabs | Jason (ElevenLabs clone) | Grand introduction, a little sparkle | select hover (long) | Flamboyant Cory, the Disco Sovereign! |
| 13 | `ann_stage_prompt` | announcer | elevenlabs | Jason (ElevenLabs clone) | Punchy hype call, fast and bright | stage select open | Choose your arena! |
| 14 | `ann_stage_subway` | announcer | elevenlabs | Jason (ElevenLabs clone) | Punchy hype call, fast and bright | stage select | Matrix Subway Platform! |
| 15 | `ann_stage_penthouse` | announcer | elevenlabs | Jason (ElevenLabs clone) | Punchy hype call, fast and bright | stage select | Neon Disco Penthouse! |
| 16 | `ann_stage_colosseum` | announcer | elevenlabs | Jason (ElevenLabs clone) | Booming arena roar, long vowels, huge energy | stage select | The Great Eggplant Colosseum! |
| 17 | `ann_stage_lounge` | announcer | elevenlabs | Jason (ElevenLabs clone) | Smooth late-night cool | stage select | Scottsdale Midnight Lounge! |
| 18 | `ann_versus` | announcer | elevenlabs | Jason (ElevenLabs clone) | Booming arena roar, long vowels, huge energy | versus screen | Versus! |
| 19 | `ann_round_1` | announcer | elevenlabs | Jason (ElevenLabs clone) | Booming arena roar, long vowels, huge energy | round start | Round one! |
| 20 | `ann_round_2` | announcer | elevenlabs | Jason (ElevenLabs clone) | Booming arena roar, long vowels, huge energy | round start | Round two! |
| 21 | `ann_round_3` | announcer | elevenlabs | Jason (ElevenLabs clone) | Booming arena roar, long vowels, huge energy | round start | Round three! |
| 22 | `ann_final_round` | announcer | elevenlabs | Jason (ElevenLabs clone) | Maximum intensity, slight rasp | round start (deciding round) | Final round! |
| 23 | `ann_fight` | announcer | elevenlabs | Jason (ElevenLabs clone) | Explosive single-word shout | round start (after round call) | Fight! |
| 24 | `ann_fight_alt` | announcer | elevenlabs | Jason (ElevenLabs clone) | Booming arena roar, long vowels, huge energy | round start (first match of session) | Let the kombat begin! |
| 25 | `ann_knockout` | announcer | elevenlabs | Jason (ElevenLabs clone) | Huge, punchy, the crowd is on its feet | round end by health | Knockout! |
| 26 | `ann_time` | announcer | elevenlabs | Jason (ElevenLabs clone) | Sharp, final | timer reaches 0 | Time! |
| 27 | `ann_draw` | announcer | elevenlabs | Jason (ElevenLabs clone) | Low, grave, deliberate | draw round | Draw! |
| 28 | `ann_double_knockout` | announcer | elevenlabs | Jason (ElevenLabs clone) | Shocked disbelief | both fighters at 0 | Double knockout! |
| 29 | `ann_bob_wins` | announcer | elevenlabs | Jason (ElevenLabs clone) | Booming arena roar, long vowels, huge energy | round/match win | Agent Bob wins! |
| 30 | `ann_cory_wins` | announcer | elevenlabs | Jason (ElevenLabs clone) | Booming arena roar, long vowels, huge energy | round/match win | Flamboyant Cory wins! |
| 31 | `ann_flawless` | announcer | elevenlabs | Jason (ElevenLabs clone) | Reverent, then explode | win with full health | Flawless victory! |
| 32 | `ann_finish_him` | announcer | elevenlabs | Jason (ElevenLabs clone) | Low, menacing, drawn out | finish him phase | Finish him! |
| 33 | `ann_fatality` | announcer | elevenlabs | Jason (ElevenLabs clone) | Deep, ominous, drawn out | fatality performed | Fatality! |
| 34 | `ann_brutality` | announcer | elevenlabs | Jason (ElevenLabs clone) | Gleeful roar | brutality performed | Brutality! |
| 35 | `ann_fatal_blow` | announcer | elevenlabs | Jason (ElevenLabs clone) | Urgent, cinematic | fatal blow connects | Fatal Blow! |
| 36 | `ann_system_purge` | announcer | elevenlabs | Jason (ElevenLabs clone) | Cold and huge | bob fatal blow name card | System Purge! |
| 37 | `ann_showstopper` | announcer | elevenlabs | Jason (ElevenLabs clone) | Show-business sparkle | cory fatal blow name card | Showstopper! |
| 38 | `ann_inevitable_parm` | announcer | elevenlabs | Jason (ElevenLabs clone) | Grave, slow, then hit the last word | bob fatality name card | Inevitable Parm! |
| 39 | `ann_runway_aubergine` | announcer | elevenlabs | Jason (ElevenLabs clone) | Fabulous, theatrical | cory fatality name card | Runway Aubergine! |
| 40 | `ann_parmesan_override` | announcer | elevenlabs | Jason (ElevenLabs clone) | Gleeful roar | bob brutality name card | Parmesan Override! |
| 41 | `ann_eggplant_splat` | announcer | elevenlabs | Jason (ElevenLabs clone) | Gleeful roar | cory brutality name card | Fabulous Eggplant Splat! |
| 42 | `ann_first_hit` | announcer | elevenlabs | Jason (ElevenLabs clone) | Punchy hype call, fast and bright | first hit of round | First hit! |
| 43 | `ann_combo_breaker` | announcer | elevenlabs | Jason (ElevenLabs clone) | Punchy hype call, fast and bright | combo breaker | Combo breaker! |
| 44 | `ann_reversal` | announcer | elevenlabs | Jason (ElevenLabs clone) | Punchy hype call, fast and bright | reversal callout | Reversal! |
| 45 | `ann_punish` | announcer | elevenlabs | Jason (ElevenLabs clone) | Punchy hype call, fast and bright | punish callout | Punish! |
| 46 | `ann_flawless_block` | announcer | elevenlabs | Jason (ElevenLabs clone) | Punchy hype call, fast and bright | flawless block | Flawless block! |
| 47 | `ann_counter` | announcer | elevenlabs | Jason (ElevenLabs clone) | Punchy hype call, fast and bright | counter hit / parry | Counter! |
| 48 | `ann_excellent` | announcer | elevenlabs | Jason (ElevenLabs clone) | Impressed | 5+ hit combo | Excellent! |
| 49 | `ann_outstanding` | announcer | elevenlabs | Jason (ElevenLabs clone) | Very impressed, climbing | 8+ hit combo | Outstanding! |
| 50 | `ann_inevitable` | announcer | elevenlabs | Jason (ElevenLabs clone) | Cold awe | bob 30%+ combo | Inevitable! |
| 51 | `ann_fabulous` | announcer | elevenlabs | Jason (ElevenLabs clone) | Delighted, sparkly | cory 30%+ combo | Fabulous! |
| 52 | `ann_rematch` | announcer | elevenlabs | Jason (ElevenLabs clone) | Punchy hype call, fast and bright | rematch selected | Rematch! |
| 53 | `ann_continue` | announcer | elevenlabs | Jason (ElevenLabs clone) | Slow, tempting | arcade loss | Continue? |
| 54 | `ann_game_over` | announcer | elevenlabs | Jason (ElevenLabs clone) | Low, grave, deliberate | arcade continue timeout | Game over. |
| 55 | `ann_tower_start` | announcer | elevenlabs | Jason (ElevenLabs clone) | Booming arena roar, long vowels, huge energy | arcade tower start | Climb the tower! |
| 56 | `ann_tower_rival` | announcer | elevenlabs | Jason (ElevenLabs clone) | Ominous build | arcade final rung | Your rival awaits! |
| 57 | `ann_tower_complete` | announcer | elevenlabs | Jason (ElevenLabs clone) | Booming arena roar, long vowels, huge energy | arcade cleared | Tower conquered! |
| 58 | `ann_unlock_palette` | announcer | elevenlabs | Jason (ElevenLabs clone) | Bright reward chime voice | unlock | New palette unlocked! |
| 59 | `ann_practice_success` | announcer | elevenlabs | Jason (ElevenLabs clone) | Approving | fatality trainer success | Perfect execution! |
| 60 | `ann_practice_close` | announcer | elevenlabs | Jason (ElevenLabs clone) | Coaching, quick | fatality trainer wrong range | Too close! |
| 61 | `ann_practice_far` | announcer | elevenlabs | Jason (ElevenLabs clone) | Coaching, quick | fatality trainer wrong range | Too far! |
| 62 | `narr_intro_01` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | story intro still 01 | In a city that never sleeps, two legends refuse to share the spotlight. |
| 63 | `narr_intro_02` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | story intro still 02 | Agent Bob. Precision. Protocol. Zero tolerance for anomalies. |
| 64 | `narr_intro_03` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | story intro still 03 | Flamboyant Cory. Sequins. Spectacle. Zero tolerance for boring. |
| 65 | `narr_intro_04` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | story intro still 04 | The Golden Aubergine tournament has summoned them both. |
| 66 | `narr_intro_05` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | story intro still 05 | Only one will walk out holding the Golden Aubergine. |
| 67 | `narr_ch1` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | story chapter 1 card | Chapter one. Sector Seven. Down here, the rain never stops. |
| 68 | `narr_ch2` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | story chapter 2 card | Chapter two. Forty floors up, the party never stops either. |
| 69 | `narr_ch3` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | story chapter 3 card | Chapter three. The Colosseum of the Golden Aubergine. |
| 70 | `narr_ch4` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | story chapter 4 card | Final chapter. A desert lounge at midnight. One last dance. |
| 71 | `narr_rival_bob` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | arcade rival still (bob) | One rival remains. He is wearing feathers. |
| 72 | `narr_rival_cory` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | arcade rival still (cory) | One rival remains. He is wearing a suit. Of course he is. |
| 73 | `narr_bob_end_01` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | bob ending still 01 | Agent Bob claims the Golden Aubergine. The anomaly is contained. |
| 74 | `narr_bob_end_02` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | bob ending still 02 | His report is flawless, except for one pink sequin he cannot explain. |
| 75 | `narr_bob_end_03` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | bob ending still 03 | Later, the System logs an irregularity. Agent Bob is tapping his boot. |
| 76 | `narr_cory_end_01` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | cory ending still 01 | Flamboyant Cory wins the Golden Aubergine, and the crowd goes wild. |
| 77 | `narr_cory_end_02` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | cory ending still 02 | By sunrise, the ancient colosseum is the hottest club in the realm. |
| 78 | `narr_cory_end_04` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm cinematic trailer narration, unhurried, dramatic pauses | cory ending still 04 | And somewhere deep in the System, an agent learns to dance. |
| 79 | `narr_credits` | announcer | elevenlabs | Jason (ElevenLabs clone) | Warm, grateful sign-off | credits | Thank you for playing Bob versus Cory. Stay inevitable. Stay fabulous. |
| 80 | `bob_grunt_light_1` | bob | openai | onyx | A short sharp exhale-grunt, not a word; controlled, low | light attack effort | Hup. |
| 81 | `bob_grunt_light_2` | bob | openai | onyx | A short sharp exhale-grunt, not a word; controlled, low | light attack effort | Tch! |
| 82 | `bob_grunt_heavy_1` | bob | openai | onyx | Heavy effort, chest-deep push | heavy attack effort | Hnngh! |
| 83 | `bob_grunt_heavy_2` | bob | openai | onyx | Heavy effort, chest-deep push | heavy attack effort | Haaah! |
| 84 | `bob_grunt_heavy_3` | bob | openai | onyx | Heavy effort, rising snarl | heavy attack effort | Rrrah! |
| 85 | `bob_grunt_jump` | bob | openai | onyx | A short sharp exhale-grunt, not a word; controlled, low | jump | Hup! |
| 86 | `bob_grunt_throw` | bob | openai | onyx | Strained effort then a flat word | throw | Hrrgh... down. |
| 87 | `bob_pain_light_1` | bob | openai | onyx | Pained grunt, restrained, he hates showing it | light hit taken | Ugh. |
| 88 | `bob_pain_light_2` | bob | openai | onyx | Pained grunt, restrained, he hates showing it | light hit taken | Nnh! |
| 89 | `bob_pain_heavy_1` | bob | openai | onyx | Big pained shout, surprised | heavy hit taken | Gaaah! |
| 90 | `bob_pain_heavy_2` | bob | openai | onyx | Winded, breath knocked out | heavy hit taken | Hhrk! |
| 91 | `bob_launch` | bob | openai | onyx | Startled cry as he is airborne | launched | Nngh... aah! |
| 92 | `bob_knockdown` | bob | openai | onyx | Thud exhale | knockdown | Oof. |
| 93 | `bob_dizzy` | bob | openai | onyx | Groggy, slurring, flat | dizzy | Mmh... recalibrating... |
| 94 | `bob_block` | bob | openai | onyx | Dismissive breath | block | Hmph. |
| 95 | `bob_select_1` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | character select lock-in | Agent Bob. Reporting. |
| 96 | `bob_select_2` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | character select lock-in (alt) | Assignment accepted. |
| 97 | `bob_intro_1` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | match intro (solo) | Anomaly detected. Commencing correction. |
| 98 | `bob_intro_2` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | match intro (solo) | You are a glitch in an otherwise perfect system. |
| 99 | `bob_intro_3` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth; bone-dry pause before the last word | match intro (solo) | I have reviewed your file. It is... sparkly. |
| 100 | `bob_intro_4` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | match intro (solo) | Remove the feathers. Or I will. |
| 101 | `bob_banter_1` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | intro banter 1 (bob opens) | Your sequins are a statistical anomaly, Cory. They will be audited. |
| 102 | `bob_banter_2` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | intro banter 2 (bob replies) | I do not shop. I optimize. And I am inevitable. |
| 103 | `bob_banter_3` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | intro banter 3 (bob opens) | You hear that, Cory? That is the sound of inevitability. |
| 104 | `bob_banter_4` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | intro banter 4 (bob replies) | Step into my hitbox and find out. |
| 105 | `bob_banter_5` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | intro banter 5 (bob opens) | I have simulated this match ten thousand times. You lose in all of them. |
| 106 | `bob_banter_6` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | intro banter 6 (bob replies) | Agents do not blush. Prepare for system purge. |
| 107 | `bob_mirror_1` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth; offended | mirror match intro | A rogue clone? Unacceptable. |
| 108 | `bob_mirror_2` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | mirror match intro reply | Correction: I am the upgrade. |
| 109 | `bob_taunt_1` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | taunt | Your style is noise. I am the signal. |
| 110 | `bob_taunt_2` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | taunt | Hm. Still inevitable. |
| 111 | `bob_taunt_3` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth; faint dry amusement | taunt | Is that glitter? Or panic? |
| 112 | `bob_taunt_4` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | taunt | Try harder. The algorithm is bored. |
| 113 | `bob_taunt_5` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | taunt | I have seen your next move. And the one after. |
| 114 | `bob_taunt_6` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | taunt | You cannot out-dance gravity. |
| 115 | `bob_taunt_7` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | taunt | Every sequin is a liability. |
| 116 | `bob_taunt_8` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth; mock-polite | taunt | Please, continue. I am taking notes. |
| 117 | `bob_sp_palm_flurry` | bob | openai | onyx | Single cold command, crisp | special: Blurred Palm Flurry | Execute. |
| 118 | `bob_sp_palm_flurry_ex` | bob | openai | onyx | Command, slightly faster | special: Palm Flurry EX | Execute. Faster. |
| 119 | `bob_sp_teleport` | bob | openai | onyx | Quiet, almost a whisper | special: System Glitch Teleport | Rerouting. |
| 120 | `bob_sp_eggplant` | bob | openai | onyx | Flat, deadpan | special: Digital Eggplant Toss | Catch. |
| 121 | `bob_sp_eggplant_ex` | bob | openai | onyx | Deadpan with a hint of relish | special: Eggplant Toss EX | Double helping. |
| 122 | `bob_sp_clone` | bob | openai | onyx | Firm order into earpiece | special: Agent Clone Grapple | Agents. Restrain him. |
| 123 | `bob_sp_lean` | bob | openai | onyx | Unbothered, smug | special: Bullet-Time Lean Counter | Too slow. |
| 124 | `bob_sp_dive` | bob | openai | onyx | Clipped, airborne | special: Aerial Matrix Dive | From above. |
| 125 | `bob_wakeup` | bob | openai | onyx | Irritated | armored wakeup kick | Get off me. |
| 126 | `bob_combo_breaker` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | combo breaker | Denied. |
| 127 | `bob_fb_1` | bob | openai | onyx | Slow, menacing, almost bored | fatal blow start | System purge initiated. |
| 128 | `bob_fb_2` | bob | openai | onyx | Hard, final | fatal blow mid | Delete. |
| 129 | `bob_fb_3` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth; quiet contempt | fatal blow end | You were never authorized. |
| 130 | `bob_fatality_1` | bob | openai | onyx | Calm, like ordering at a restaurant | fatality start | Order up. |
| 131 | `bob_fatality_2` | bob | openai | onyx | Slow, savouring | fatality mid (eggplants appear) | One Inevitable Parm. Extra cheese. |
| 132 | `bob_fatality_3` | bob | openai | onyx | Walking away, flat | fatality end | Dinner is served. From orbit. |
| 133 | `bob_brutality` | bob | openai | onyx | Deadpan satisfaction | brutality | Parmesan override. Approved. |
| 134 | `bob_round_win` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | round won | Round logged. |
| 135 | `bob_finish_line` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | finish him phase (bob is winner) | Stand still. This is for your own good. |
| 136 | `bob_win_1` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | win quote | System anomaly resolved. Have a productive evening. |
| 137 | `bob_win_2` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | win quote | The beard remains unruffled. Inevitable. |
| 138 | `bob_win_3` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | win quote | You fought bravely. The algorithm did not care. |
| 139 | `bob_win_4` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | win quote | Your feathers have been filed as evidence. |
| 140 | `bob_win_5` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | win quote | Next time, bring a plan. Not a playlist. |
| 141 | `bob_win_6` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth; grudging | win quote | Match concluded. Disco remains... tolerated. |
| 142 | `bob_win_7` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | win quote | I did not break a sweat. I do not have sweat. |
| 143 | `bob_win_8` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | win quote | Flawless. Like my tie. |
| 144 | `bob_win_9` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth; the faintest smirk | win quote | Go home, Cory. Dance it off. |
| 145 | `bob_lose_1` | bob | openai | onyx | Glitching disbelief, slower | defeat | This... was not in the simulation. |
| 146 | `bob_lose_2` | bob | openai | onyx | Fading, mechanical | defeat | Reboot... required. |
| 147 | `bob_lose_3` | bob | openai | onyx | Reluctant, quieter, almost human | defeat | Fine. One dance. Do not tell anyone. |
| 148 | `bob_story_1` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth; into earpiece | story intro still 02 | Directive received. Anomaly located. |
| 149 | `bob_story_3` | bob | openai | onyx | Cold, deliberate, low and precise; clipped consonants; zero warmth | story chapter 4 | Your disco ends tonight. |
| 150 | `bob_story_4` | bob | openai | onyx | Softer than ever before, a hint of warmth | bob ending still 04 | Some anomalies are worth keeping. |
| 151 | `cory_grunt_light_1` | cory | openai | ballad | Short playful battle cry, not a word, bright and springy | light attack effort | Hah! |
| 152 | `cory_grunt_light_2` | cory | openai | ballad | Short playful battle cry, not a word, bright and springy | light attack effort | Hya! |
| 153 | `cory_grunt_heavy_1` | cory | openai | ballad | Big theatrical shout | heavy attack effort | Hiyaaah! |
| 154 | `cory_grunt_heavy_2` | cory | openai | ballad | Big theatrical shout | heavy attack effort | Hnnngh-HA! |
| 155 | `cory_grunt_heavy_3` | cory | openai | ballad | Sassy effort, one syllable | heavy attack effort | Werk! |
| 156 | `cory_grunt_jump` | cory | openai | ballad | Short playful battle cry, not a word, bright and springy | jump | Hup-la! |
| 157 | `cory_grunt_throw` | cory | openai | ballad | Ballroom flourish | throw | And... dip! |
| 158 | `cory_pain_light_1` | cory | openai | ballad | Over-dramatic offended yelp | light hit taken | Ow! Rude! |
| 159 | `cory_pain_light_2` | cory | openai | ballad | Over-dramatic offended yelp | light hit taken | Ugh! |
| 160 | `cory_pain_heavy_1` | cory | openai | ballad | Big dramatic cry | heavy hit taken | Aaah! |
| 161 | `cory_pain_heavy_2` | cory | openai | ballad | Wounded diva | heavy hit taken | Oof! My feathers! |
| 162 | `cory_launch` | cory | openai | ballad | Wailing as he flies | launched | Wheee... no! |
| 163 | `cory_knockdown` | cory | openai | ballad | Swooning collapse | knockdown | Ohhh, darling, no. |
| 164 | `cory_dizzy` | cory | openai | ballad | Woozy, giggly | dizzy | Ooh, the room is spinning... |
| 165 | `cory_block` | cory | openai | ballad | Alarmed | block | Not the face! |
| 166 | `cory_select_1` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | character select lock-in | Flamboyant Cory. Obviously. |
| 167 | `cory_select_2` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | character select lock-in (alt) | Let's get glamorous! |
| 168 | `cory_intro_1` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | match intro (solo) | Lights up, darling. Showtime! |
| 169 | `cory_intro_2` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; mock-flattered | match intro (solo) | Bob! You wore the suit again. I'm flattered. |
| 170 | `cory_intro_4` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | match intro (solo) | Smile for the cameras, handsome. You're on my runway. |
| 171 | `cory_banter_1` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; teasing purr | intro banter 1 (cory replies) | Ooh, talk spreadsheets to me, Bob. Just try not to crease that cute little suit! |
| 172 | `cory_banter_2` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | intro banter 2 (cory opens) | Charcoal wool? Again? Honey, let me take you shopping after I win. |
| 173 | `cory_banter_3` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | intro banter 3 (cory replies) | No darling, that's my disco bassline, and you're totally tapping your boot! |
| 174 | `cory_banter_4` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; flirty | intro banter 4 (cory opens) | Nice shades, tall, dark and bearded. Mind if I steal the spotlight? |
| 175 | `cory_banter_5` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; mock horror | intro banter 5 (cory replies) | Ten thousand simulations and you still didn't add feathers? Tragic! |
| 176 | `cory_banter_6` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; flirty | intro banter 6 (cory opens) | Careful, Bob. One spin of this blazer and you'll be blushing under that beard. |
| 177 | `cory_mirror_1` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; gasping delight | mirror match intro | Wait, someone else wore plum feathers? Honestly, iconic. |
| 178 | `cory_mirror_2` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | mirror match intro reply | Flattering, babe, but there's only room for one Disco Sovereign! |
| 179 | `cory_taunt_1` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | taunt | Come on, handsome, smile! It won't crack your sunglasses. |
| 180 | `cory_taunt_2` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; mock-swoon | taunt | Ooh, intimidating. Do it again, slower. |
| 181 | `cory_taunt_3` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | taunt | Charcoal is not a personality, sweetie. |
| 182 | `cory_taunt_4` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | taunt | I've had tougher dance partners. And they had two left feet. |
| 183 | `cory_taunt_5` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; coaching | taunt | Work it! No, no. Like this. |
| 184 | `cory_taunt_6` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | taunt | I could do this in heels. Actually, next time I will. |
| 185 | `cory_taunt_7` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; flirty | taunt | You're cute when you're calculating. |
| 186 | `cory_taunt_8` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; sing-song | taunt | Catch me if you can, Mister Inevitable! |
| 187 | `cory_sp_glitter` | cory | openai | ballad | Sparkly exclamation | special: Glitter Bomb | Sparkle! |
| 188 | `cory_sp_glitter_ex` | cory | openai | ballad | Sparkly, bigger | special: Glitter Bomb EX | Extra sparkle! |
| 189 | `cory_sp_runway` | cory | openai | ballad | Commanding diva | special: Runway Strut Dash | Make way! |
| 190 | `cory_sp_runway_ex` | cory | openai | ballad | Commanding diva, louder | special: Runway Dash EX | Clear the runway! |
| 191 | `cory_sp_disco_drop` | cory | openai | ballad | Party host announcement | special: Disco Ball Drop | Drop the ball! |
| 192 | `cory_sp_vogue` | cory | openai | ballad | Sharp, then purr | special: Vogue Pose Parry | Freeze! Gorgeous. |
| 193 | `cory_sp_boa` | cory | openai | ballad | Whip-crack attitude | special: Boa Whip Lash | Feather fury! |
| 194 | `cory_sp_twirl` | cory | openai | ballad | Delighted spin | special: Fabulous Air Twirl | Twirl! |
| 195 | `cory_wakeup` | cory | openai | ballad | Bouncing back | armored wakeup kick | Up, up, up! |
| 196 | `cory_combo_breaker` | cory | openai | ballad | Indignant | combo breaker | Hands off the couture! |
| 197 | `cory_fb_1` | cory | openai | ballad | Slow, building, stage whisper | fatal blow start | Lights. Camera. |
| 198 | `cory_fb_2` | cory | openai | ballad | Bright, camera-ready | fatal blow mid | Say cheese, darling! |
| 199 | `cory_fb_3` | cory | openai | ballad | Full diva belt | fatal blow end | Encore! |
| 200 | `cory_fatality_1` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; MC voice | fatality start | The runway is open, darling! |
| 201 | `cory_fatality_2` | cory | openai | ballad | Hype, campy | fatality mid (disco eggplant descends) | Serve it! Aubergine realness! |
| 202 | `cory_fatality_3` | cory | openai | ballad | Gracious, bowing | fatality end | And... bow. |
| 203 | `cory_brutality` | cory | openai | ballad | Giggly, mock-guilty | brutality | Oops! Fabulous mess. |
| 204 | `cory_round_win` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | round won | Round's mine, darling! |
| 205 | `cory_finish_line` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | finish him phase (cory is winner) | Hold still, sweetie. This will be quick. |
| 206 | `cory_win_1` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | win quote | Lights, camera, victory! Drinks are on me, Bob! |
| 207 | `cory_win_2` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | win quote | Don't pout, handsome. You still looked great losing! |
| 208 | `cory_win_3` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | win quote | That's how you own the runway, darling! |
| 209 | `cory_win_4` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | win quote | Ten out of ten. The judges are me. |
| 210 | `cory_win_5` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; flirty | win quote | Call me, Bob. We'll pick you a fun tie. |
| 211 | `cory_win_6` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | win quote | Glitter is forever. So is this win. |
| 212 | `cory_win_7` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; gleeful gotcha | win quote | Was that a smile? Under the beard? I saw it! |
| 213 | `cory_win_8` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | win quote | Sequins one, spreadsheets zero! |
| 214 | `cory_win_9` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | win quote | Thank you, thank you! No autographs. Okay, one. |
| 215 | `cory_lose_1` | cory | openai | ballad | Sulky but proud | defeat | Ugh, fine. But I looked amazing. |
| 216 | `cory_lose_2` | cory | openai | ballad | Melodramatic heartbreak | defeat | You crushed my feathers. And my heart. |
| 217 | `cory_lose_3` | cory | openai | ballad | Bouncing back instantly | defeat | Rematch! And this time, I pick the music. |
| 218 | `cory_story_1` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; delighted | story intro still 03 | A golden eggplant trophy? Darling, it's practically my color. |
| 219 | `cory_story_3` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing | story chapter 4 | Let's give this desert something to talk about. |
| 220 | `cory_story_4` | cory | openai | ballad | Bright, campy theatrical showman; playful flirty lilt, audible grin, quick comic timing; affectionate | cory ending still 03 | Hold still, handsome. Sequins are a commitment. |
