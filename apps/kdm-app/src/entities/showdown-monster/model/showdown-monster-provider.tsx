import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ShowdownMonster } from '../../../shared/api';

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
  const { data } = useContext(Context);

  return {
    data: data?.find(
      (_item) =>
        _item.year === variables.year && _item.sessionId === variables.sessionId
    ),
  };
};
