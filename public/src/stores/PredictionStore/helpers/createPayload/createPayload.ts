import { ISportEvent } from "../../../../@types";

export const createPayload = (matches: ISportEvent[]) => {
  return matches
    .filter((match: ISportEvent) => {
      return (
        match.competitors[0].userPrediction >= 0 &&
        match.competitors[1].userPrediction >= 0
      );
    })
    .map(match => {
      return {
        awayScore: match.competitors[1].userPrediction,
        awayTeam: match.competitors[1].name,
        homeScore: match.competitors[0].userPrediction,
        homeTeam: match.competitors[0].name,
        matchId: match.id,
        scheduled: match.scheduled,
        seasonId: match.season.id,
        tournamentId: match.tournament.id,
      };
    });
};
