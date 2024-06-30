import { Encounter } from './encounter';

export type ShowdownMonster = {
  id: string;
  sessionId: string;
  year: number;
  encounterId: string;
} & Pick<
  Encounter,
  | 'movement'
  | 'toughness'
  | 'speedModifier'
  | 'damageModifier'
  | 'accuracyModifier'
  | 'luckModifier'
>;
