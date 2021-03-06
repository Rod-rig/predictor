import { ISeason, ITournament } from "../";
import { ICompetitor } from "../ICompetitor";
import { IPeriodScore } from "../IPeriodScore";
import { IVenue } from "../IVenue";

interface ISportEvent {
  competitors: ICompetitor[];
  id: string;
  scheduled: string;
  season: ISeason;
  start_time_tbd: boolean;
  tournament: ITournament;
  tournament_round: {
    cup_round_match_number?: string;
    cup_round_matches?: string;
    name?: string;
    number?: number;
    type: string;
    group?: string;
    other_match_id?: string;
    tournament_match_number?: number;
  };
  venue: IVenue;
}

interface ISportEventStatus {
  away_score: number;
  home_score: number;
  match_status: string;
  period_scores: IPeriodScore[];
  status: string;
  winner_id: string;
}

export interface IMatch {
  sport_event: ISportEvent;
  sport_event_status: ISportEventStatus;
}

export interface IPredictionMatch {
  awayTeam: string;
  homeTeam: string;
  homeScore: number;
  awayScore: number;
  status?: number;
  id: string;
  season: string;
}

export interface IPredictionStore {
  buttonWasClicked?: boolean;
  cache: {
    [key: string]: ISportEvent[];
  };
  currentDate: string;
  tournamentId: string;
  dates: string[];
  isLoaded: boolean;
  isFetched: boolean;
  isSuccessSubmit: boolean;
  matches: ISportEvent[];
  tournaments: {
    [key: string]: string;
  };
  setMatches(matches: ISportEvent[]): void;
  setTournamentId(value: string): void;
  fetchMatches(): void;
  fetchMatchesError(response: any): void;
  fetchMatchesSuccess(response: any): void;
  handleDateChange(event: any): void;
  handleTournamentChange(event: any): void;
  handleSubmit(e: Event): void;
  handleSubmitSuccess(): void;
  handleSubmitError(): void;
  handleChange(index: number, compIndex: number, e: any): void;
  setCurrentDate(date: string): void;
  closeSuccessMsg(): void;
}
