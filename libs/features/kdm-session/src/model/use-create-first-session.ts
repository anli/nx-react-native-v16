import {
  getFirstShowdownMonster,
  useShowdownMonsters,
} from '@entities/kdm-showdown';
import { getFirstSession, useSessions } from '@entities/kdm-session';

export const useCreateFirstSession = () => {
  const { mutate: mutateSesions, setCurrentId } = useSessions();
  const { mutate: mutateShowdownMonsters } = useShowdownMonsters();
  const showdownMonster = getFirstShowdownMonster(getFirstSession().id);

  if (!showdownMonster) {
    return {
      mutate: undefined,
    };
  }

  return {
    mutate: () => {
      mutateSesions([getFirstSession()]);
      setCurrentId(getFirstSession().id);
      mutateShowdownMonsters([showdownMonster]);
    },
  };
};
