import { getFirstSession, useSessions } from '../../../entities/session';

export const useCreateFirstSession = () => {
  const { setSessions, setCurrentId } = useSessions();

  return {
    mutate: () => {
      setSessions([getFirstSession()]);
      setCurrentId(getFirstSession().id);
    },
  };
};
