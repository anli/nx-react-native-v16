import {
  getFirstShowdownMonster,
  useShowdownMonsters,
} from '../../../entities/showdown-monster';
import { getFirstSession, useSessions } from '../../../entities/session';

export const useCreateFirstSession = () => {
  const { setData, setCurrentId } = useSessions();
  const { setData: setShowdownMonsters } = useShowdownMonsters();

  return {
    mutate: () => {
      setData([getFirstSession()]);
      setCurrentId(getFirstSession().id);
      setShowdownMonsters([getFirstShowdownMonster(getFirstSession().id)]);
    },
  };
};
