import { ISportEvent } from "../../../../@types";

export const getTournaments = (matches: ISportEvent[]) => {
  const ids: {
    [key: string]: string;
  } = {};
  matches.forEach((match: ISportEvent) => {
    const id: string = match.tournament.id;
    if (!ids[id]) {
      ids[id] = match.tournament.name;
    }
  });
  return ids;
};
