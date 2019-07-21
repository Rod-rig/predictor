import { ISeason, ITournament } from "../";
import { ICompetitor } from "../ICompetitor";
import { IVenue } from "../IVenue";

export interface IFixture {
  competitors: ICompetitor[];
  id: string;
  scheduled: string;
  season: ISeason;
  start_time_tbd: boolean;
  status: string;
  tournament: ITournament;
  tournament_round: {
    number?: number;
    type: string;
    phase?: string;
  };
  venue: IVenue;
}
