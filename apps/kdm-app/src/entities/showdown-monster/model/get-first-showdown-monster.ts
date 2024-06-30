import { ShowdownMonster, encounters } from '../../../shared/api';

const encounterId = 'WHITE_LION_FIRST_STORY';

export const getFirstShowdownMonster = (sessionId: string): ShowdownMonster => {
  const encounter = encounters.find((_item) => _item.id === encounterId);

  return {
    id: 'SHOWDOWN_MONSTER_1',
    sessionId,
    year: 0,
    encounterId,
    movement: encounter.movement,
    toughness: encounter.toughness,
    speedModifier: encounter.speedModifier,
    damageModifier: encounter.damageModifier,
    accuracyModifier: encounter.accuracyModifier,
    luckModifier: encounter.luckModifier,
  };
};
