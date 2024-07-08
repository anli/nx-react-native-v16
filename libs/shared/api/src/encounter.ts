import { mediumAspectRatio } from './card';
import { MonsterAi } from './monster';
import { monsterBasics } from './monster-basic';

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
  aiActiveIds: MonsterAi[];
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
    aiActiveIds: monsterBasics.filter(
      (_item) => _item.id === 'WHITE_LION_BASIC_ACTION'
    ),
    imageUrl: 'https://imgur.com/6voXSGA.png',
    aspectRatio: mediumAspectRatio,
  },
];
