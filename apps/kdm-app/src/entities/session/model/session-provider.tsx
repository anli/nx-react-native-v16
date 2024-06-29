import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Session } from './session';

type SessionContextValue = {
  sessions?: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
  currentId?: Session['id'];
  setCurrentId: React.Dispatch<React.SetStateAction<Session['id']>>;
};

type SessionContextProviderProps = PropsWithChildren;

const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export const SessionProvider = ({ children }: SessionContextProviderProps) => {
  const [sessions, setSessions] = useState<Session[] | undefined>(undefined);
  const [currentId, setCurrentId] = useState<Session['id'] | undefined>(
    undefined
  );

  const value: SessionContextValue = useMemo(
    () => ({ sessions, setSessions, currentId, setCurrentId }),
    [currentId, sessions]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSessions = () => {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error('useSessions must be used within a SessionProvider');
  }

  return context;
};

export const useCurrentSession = () => {
  const { sessions, currentId } = useContext(SessionContext);

  return { data: sessions?.find(({ id }) => id === currentId) };
};
