import { mediumAspectRatio } from './card';

export type Encounter = {
  id: string;
  name: string;
  monsterId: string;
  movement: number;
  toughness: number;
  speedModifier: number;
  damageModifier: number;
  accuracyModifier: number;
  luckModifier: number;
  aiActiveIds: string[];
  imageUrl: string;
  aspectRatio: number;
};

export const encounters: Encounter[] = [
  {
    id: 'WHITE_LION_FIRST_STORY',
    name: 'White Lion First Story',
    monsterId: 'WHITE_LION',
    movement: 6,
    toughness: 6,
    speedModifier: 0,
    damageModifier: 0,
    accuracyModifier: 0,
    luckModifier: 0,
    aiActiveIds: ['WHITE_LION_BASIC_ACTION'],
    imageUrl: 'https://imgur.com/6voXSGA.png',
    aspectRatio: mediumAspectRatio,
  },
];
