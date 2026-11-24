import { StageId } from '../types/game';

export interface StageDefinition {
  id: StageId;
  name: string;
  subtitle: string;
  imagePath: string;
  musicStyle: 'cyberpunk' | 'nudisco' | 'orchestral' | 'synthwave';
  ambientTint: number;
  floorColor: number;
  floorGlowColor: number;
  accentHex: string;
  weather: 'matrix_rain' | 'disco_glitter' | 'embers' | 'desert_neon';
}

export const STAGES: StageDefinition[] = [
  {
    id: 'matrix-subway',
    name: 'Matrix Subway Platform',
    subtitle: 'Rain-Soaked Sector 07',
    imagePath: './assets/stages/matrix-subway.jpg',
    musicStyle: 'cyberpunk',
    ambientTint: 0x0b2a19,
    floorColor: 0x101c16,
    floorGlowColor: 0x00ff7f,
    accentHex: '#00ff7f',
    weather: 'matrix_rain',
  },
  {
    id: 'disco-penthouse',
    name: 'Neon Disco Penthouse',
    subtitle: 'Skyline VIP Rooftop',
    imagePath: './assets/stages/disco-penthouse.jpg',
    musicStyle: 'nudisco',
    ambientTint: 0x260934,
    floorColor: 0x1d0f2a,
    floorGlowColor: 0xff2ec4,
    accentHex: '#ff2ec4',
    weather: 'disco_glitter',
  },
  {
    id: 'eggplant-colosseum',
    name: 'Great Eggplant Colosseum',
    subtitle: 'Temple of the Golden Aubergine',
    imagePath: './assets/stages/eggplant-colosseum.jpg',
    musicStyle: 'orchestral',
    ambientTint: 0x220c33,
    floorColor: 0x251b2b,
    floorGlowColor: 0xffb703,
    accentHex: '#ffb703',
    weather: 'embers',
  },
  {
    id: 'scottsdale-lounge',
    name: 'Scottsdale Midnight Lounge',
    subtitle: 'VIP Desert Courtyard',
    imagePath: '',
    musicStyle: 'synthwave',
    ambientTint: 0x101730,
    floorColor: 0x1c1824,
    floorGlowColor: 0x00e5ff,
    accentHex: '#00e5ff',
    weather: 'desert_neon',
  },
];

export function getStageById(id: StageId): StageDefinition {
  return STAGES.find((s) => s.id === id) ?? STAGES[0];
}
