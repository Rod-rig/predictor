import { ISportEvent } from "../../@types";

export const getTournamentId = ({ tournament }: ISportEvent) => {
  return Number(tournament.id.split(":")[2]);
};

export const sortByTournamentId = (a: ISportEvent, b: ISportEvent): number => {
  return getTournamentId(a) - getTournamentId(b);
};
