import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { Session, storage } from '@shared/api';

type ContextValue = {
  data?: Session[];
  mutate: React.Dispatch<React.SetStateAction<Session[] | undefined>>;
  currentId?: Session['id'];
  setCurrentId: React.Dispatch<React.SetStateAction<Session['id'] | undefined>>;
};

type ContextProviderProps = PropsWithChildren;

const Context = createContext<ContextValue | undefined>(undefined);

export const SessionProvider = ({ children }: ContextProviderProps) => {
  const [data, mutate] = storage.useArray<Session[] | undefined>('Session');
  const [currentId, setCurrentId] = storage.useString('Session.CurrentId');

  const value: ContextValue = useMemo(
    () => ({ data, mutate, currentId, setCurrentId }),
    [currentId, data, setCurrentId, mutate]
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
  const {
    data: sessions,
    currentId,
    mutate: mutateSessions,
    setCurrentId,
  } = useSessions();
  const index = sessions?.findIndex(({ id }) => id === currentId);
  const data = index !== undefined ? sessions?.[index] : undefined;

  if (index === undefined || !data) {
    return { data: undefined, mutate: undefined };
  }

  const mutate = (newValue: Session | undefined) => {
    if (!newValue) {
      mutateSessions((_data = []) => {
        const newData = [..._data];
        newData.splice(index, 1);
        if (newData.length === 0) {
          return undefined;
        }

        return newData;
      });
      setCurrentId(undefined);
    }
  };

  return { data, mutate };
};
