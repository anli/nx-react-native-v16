import {
  getFirstShowdownMonster,
  useShowdownMonsters,
} from '@entities/kdm-showdown';
import { getFirstSession, useSessions } from '@entities/kdm-session';

export const useCreateFirstSession = () => {
  const { setData, setCurrentId } = useSessions();
  const { setData: setShowdownMonsters } = useShowdownMonsters();
  const showdownMonster = getFirstShowdownMonster(getFirstSession().id);

  if (!showdownMonster) {
    return {
      mutate: undefined,
    };
  }

  return {
    mutate: () => {
      setData([getFirstSession()]);
      setCurrentId(getFirstSession().id);
      setShowdownMonsters([showdownMonster]);
    },
  };
};
