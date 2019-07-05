import { ISportEvent } from "../../../../@types";

export const filterMatches = (matches: ISportEvent[], tournamentId: string) => {
  return matches.filter((match: ISportEvent) => {
    return match.tournament.id === tournamentId;
  });
};
