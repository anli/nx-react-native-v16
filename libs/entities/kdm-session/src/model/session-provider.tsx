import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Session } from '@shared/api';

type ContextValue = {
  data?: Session[];
  setData: React.Dispatch<React.SetStateAction<Session[] | undefined>>;
  currentId?: Session['id'];
  setCurrentId: React.Dispatch<React.SetStateAction<Session['id'] | undefined>>;
};

type ContextProviderProps = PropsWithChildren;

const Context = createContext<ContextValue | undefined>(undefined);

export const SessionProvider = ({ children }: ContextProviderProps) => {
  const [data, setData] = useState<Session[] | undefined>(undefined);
  const [currentId, setCurrentId] = useState<Session['id'] | undefined>(
    undefined
  );

  const value: ContextValue = useMemo(
    () => ({ data, setData, currentId, setCurrentId }),
    [currentId, data]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useSessions = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useSessions must be used within a SessionProvider');
  }

  return context;
};

export const useCurrentSession = () => {
  const { data: sessions, currentId, setData, setCurrentId } = useSessions();
  const index = sessions?.findIndex(({ id }) => id === currentId);
  const data = index !== undefined ? sessions?.[index] : undefined;

  if (index === undefined || !data) {
    return { data: undefined, mutate: undefined };
  }

  const mutate = (newValue: Session | null) => {
    if (!newValue) {
      setData((_data = []) => {
        const newData = [..._data];
        newData.splice(index, 1);
        return newData;
      });
      setCurrentId(undefined);
    }
  };

  return { data, mutate };
};
