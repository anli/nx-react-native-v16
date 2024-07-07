import { ShowdownMonster, encounters, monsters, storage } from '@shared/api';
import { PropsWithChildren, createContext, useContext, useMemo } from 'react';

type ContextValue = {
  data?: ShowdownMonster[];
  mutate: React.Dispatch<React.SetStateAction<ShowdownMonster[] | undefined>>;
};

type ContextProviderProps = PropsWithChildren;

const Context = createContext<ContextValue | undefined>(undefined);

export const ShowdownMonsterProvider = ({ children }: ContextProviderProps) => {
  const [data, mutate] = storage.useArray<ShowdownMonster[] | undefined>(
    'ShowdownMonster'
  );

  const value: ContextValue = useMemo(() => {
    return {
      data,
      mutate,
    };
  }, [data, mutate]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useShowdownMonsters = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(
      'useShowdownMonsters must be used within a ShowdownMonsterProvider'
    );
  }

  return context;
};

type UseShowdownMonsterProps = {
  variables: Partial<Pick<ShowdownMonster, 'sessionId' | 'year'>>;
};

export const useShowdownMonster = ({ variables }: UseShowdownMonsterProps) => {
  const context = useContext(Context);
  const index = context?.data?.findIndex(
    (_item) =>
      _item.year === variables.year && _item.sessionId === variables.sessionId
  );
  const showdownMonster =
    index !== undefined ? context?.data?.[index] : undefined;

  if (!context || index === undefined || !showdownMonster) {
    return { data: undefined, mutate: undefined };
  }

  const encounter = encounters?.find(
    (_item) => _item.id === showdownMonster.encounterId
  );
  const monster = monsters?.find((_item) => _item.id === encounter?.monsterId);

  const mutate = (
    callback: undefined | ((value: ShowdownMonster) => ShowdownMonster)
  ) => {
    context.mutate((_data = []) => {
      if (callback === undefined) {
        return undefined;
      }

      const newItem = callback(showdownMonster);
      const newData = [..._data];
      newData.splice(index, 1, newItem);
      return newData;
    });
  };

  return {
    data: {
      ...showdownMonster,
      encounter: {
        ...encounter,
        monster,
      },
    },
    mutate,
  };
};
