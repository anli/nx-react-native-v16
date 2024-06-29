import { Session } from '../../../shared/api';

export const getFirstSession = (): Session => {
  return {
    id: 'SESSION_1',
    year: 0,
  };
};
