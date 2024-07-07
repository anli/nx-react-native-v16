import { useCurrentSession } from '@entities/kdm-session';
import { useShowdownMonsters } from '@entities/kdm-showdown';

export const useDeleteCurrentSession = () => {
  const { data: session, mutate: mutateCurrentSession } = useCurrentSession();
  const { mutate: mutateShowdownMonsters } = useShowdownMonsters();

  return {
    mutate: () => {
      mutateCurrentSession?.(undefined);
      session &&
        mutateShowdownMonsters?.((_data) => {
          return _data?.filter(
            (_showdownMonsters) => _showdownMonsters.sessionId !== session.id
          );
        });
    },
  };
};
