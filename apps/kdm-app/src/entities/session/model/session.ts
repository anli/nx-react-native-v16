export type Session = {
  id: string;
  name?: string;
  currentYear: number;
};

export const getFirstSession = () => {
  return {
    id: 'SESSION_1',
    currentYear: 0,
  };
};
