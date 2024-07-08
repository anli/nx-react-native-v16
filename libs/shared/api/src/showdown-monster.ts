import { Encounter } from './encounter';

export type ShowdownMonster = {
  id: string;
  sessionId: string;
  year: number;
  encounterId: string;
} & Omit<Encounter, 'id'>;
