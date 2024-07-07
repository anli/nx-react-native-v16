import { ShowdownMonster, encounters, monsters } from '@shared/api';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

type ContextValue = {
  data?: ShowdownMonster[];
  setData: React.Dispatch<React.SetStateAction<ShowdownMonster[]>>;
};

type ContextProviderProps = PropsWithChildren;

const Context = createContext<ContextValue | undefined>(undefined);

export const ShowdownMonsterProvider = ({ children }: ContextProviderProps) => {
  const [data, setData] = useState<ShowdownMonster[] | undefined>(undefined);

  const value: ContextValue = useMemo(() => ({ data, setData }), [data]);

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
  const { data, setData } = useContext(Context);
  const index = data?.findIndex(
    (_item) =>
      _item.year === variables.year && _item.sessionId === variables.sessionId
  );
  const showdownMonster = data?.[index];
  const encounter = encounters?.find(
    (_item) => _item.id === showdownMonster?.encounterId
  );
  const monster = monsters?.find((_item) => _item.id === encounter?.monsterId);

  const mutate = (callback: (value: ShowdownMonster) => ShowdownMonster) => {
    setData((_data) => {
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
