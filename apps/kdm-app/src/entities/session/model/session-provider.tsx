import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Session } from '../../../shared/api';

type ContextValue = {
  data?: Session[];
  setData: React.Dispatch<React.SetStateAction<Session[]>>;
  currentId?: Session['id'];
  setCurrentId: React.Dispatch<React.SetStateAction<Session['id']>>;
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
  const { data, currentId } = useSessions();

  return { data: data?.find(({ id }) => id === currentId) };
};
