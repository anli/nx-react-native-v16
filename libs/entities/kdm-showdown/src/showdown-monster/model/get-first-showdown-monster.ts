import { ShowdownMonster, encounters } from '@shared/api';

const encounterId = 'WHITE_LION_FIRST_STORY';

export const getFirstShowdownMonster = (
  sessionId: string
): ShowdownMonster | undefined => {
  const encounter = encounters.find((_item) => _item.id === encounterId);

  if (!encounter) {
    return undefined;
  }

  return {
    ...encounter,
    id: 'SHOWDOWN_MONSTER_1',
    sessionId,
    year: 0,
    encounterId,
  };
};
