import { ShowdownMonster } from '../../../shared/api';

export const getFirstShowdownMonster = (sessionId: string): ShowdownMonster => {
  return {
    id: 'SHOWDOWN_MONSTER_1',
    sessionId,
    year: 0,
    encounter: {
      id: 'WHITE_LION_FIRST_STORY',
      name: 'White Lion First Story',
      monster: {
        id: 'WHITE_LION',
        name: 'White Lion',
      },
    },
  };
};
