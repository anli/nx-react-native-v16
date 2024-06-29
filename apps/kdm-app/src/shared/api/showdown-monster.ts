type Monster = {
  id: string;
  name: string;
};

type Encounter = {
  id: string;
  name: string;
};

export type ShowdownMonster = {
  id: string;
  sessionId: string;
  year: number;
  encounter?: Encounter & { monster: Monster };
};
