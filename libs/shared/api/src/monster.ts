import { Card } from './card';

export type Monster = {
  id: string;
  name: string;
};

export const monsters: Monster[] = [
  {
    id: 'WHITE_LION',
    name: 'White Lion',
  },
];

type MonsterAiSubType = 'MOOD' | 'NONE' | 'TRAIT' | 'DURATION';
type MonsterAiLevel = 'A' | 'B' | 'S' | 'L';

type MonsterCardType = 'MONSTER_AI' | 'MONSTER_BASIC' | 'MONSTER_HIT_LOCATION';

export type MonsterAi = {
  id: string;
  name: string;
  typeId: MonsterCardType;
  subType: MonsterAiSubType;
  level?: MonsterAiLevel;
  monsterId: Monster['id'];
  token?: number;
  heal?: number;
} & Card;
