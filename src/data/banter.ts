import { FighterId } from '../types/game';

export interface BanterLine {
  speaker: FighterId;
  text: string;
}

export interface BanterExchange {
  lines: [BanterLine, BanterLine];
}

export const BANTER_EXCHANGES: BanterExchange[] = [
  {
    lines: [
      { speaker: 'bob', text: 'Your sequins are a statistical anomaly, Cory. They will be audited.' },
      { speaker: 'cory', text: 'Ooh, talk spreadsheets to me, Bob—just try not to crease that cute little suit!' },
    ],
  },
  {
    lines: [
      { speaker: 'cory', text: 'Charcoal wool? Again? Honey, let me take you shopping after I win.' },
      { speaker: 'bob', text: 'I do not shop. I optimize. And I am inevitable.' },
    ],
  },
  {
    lines: [
      { speaker: 'bob', text: 'You hear that, Cory? That is the sound of inevitability.' },
      { speaker: 'cory', text: 'No darling, that’s my disco bassline—and you’re totally tapping your boot!' },
    ],
  },
  {
    lines: [
      { speaker: 'cory', text: 'Nice shades, tall dark and bearded. Mind if I steal the spotlight?' },
      { speaker: 'bob', text: 'Step into my hitbox and find out.' },
    ],
  },
  {
    lines: [
      { speaker: 'bob', text: 'I have simulated this match ten thousand times. You lose in all of them.' },
      { speaker: 'cory', text: 'Ten thousand simulations and you still didn’t add feathers? Tragic!' },
    ],
  },
  {
    lines: [
      { speaker: 'cory', text: 'Careful, Bob—one spin of this blazer and you’ll be blushing under that beard.' },
      { speaker: 'bob', text: 'Agents do not blush. Prepare for system purge.' },
    ],
  },
];

export const MIRROR_BANTER: Record<FighterId, BanterExchange> = {
  bob: {
    lines: [
      { speaker: 'bob', text: 'A rogue clone? Unacceptable.' },
      { speaker: 'bob', text: 'Correction: I am the upgrade.' },
    ],
  },
  cory: {
    lines: [
      { speaker: 'cory', text: 'Wait—someone else wore plum feathers?! Honestly, iconic.' },
      { speaker: 'cory', text: 'Flattering, babe, but there’s only room for one Disco Sovereign!' },
    ],
  },
};

// Every quote has a matching recorded line in voice-manifest.json (bob_win_N / cory_win_N).
export const VICTORY_QUOTES: Record<FighterId, string[]> = {
  bob: [
    "System anomaly resolved. Have a productive evening.",
    "The beard remains unruffled. Inevitable.",
    "You fought bravely. The algorithm did not care.",
    "Your feathers have been filed as evidence.",
    "Next time, bring a plan. Not a playlist.",
    "Match concluded. Disco remains... tolerated.",
    "I did not break a sweat. I do not have sweat.",
    "Flawless. Like my tie.",
    "Go home, Cory. Dance it off.",
  ],
  cory: [
    "Lights, camera, victory! Drinks are on me, Bob!",
    "Don't pout, handsome. You still looked great losing!",
    "That's how you own the runway, darling!",
    "Ten out of ten. The judges are me.",
    "Call me, Bob. We'll pick you a fun tie.",
    "Glitter is forever. So is this win.",
    "Was that a smile? Under the beard? I saw it!",
    "Sequins one, spreadsheets zero!",
    "Thank you, thank you! No autographs. Okay, one.",
  ],
};
