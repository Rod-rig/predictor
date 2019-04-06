import { ISeason, ITournament } from "../";

interface ICompetitor {
  abbreviation: string;
  country: string;
  country_code: string;
  id: string;
  name: string;
  qualifier: string;
  userPrediction?: number;
}

interface IVenue {
  capacity: number;
  city_name: string;
  country_code: string;
  country_name: string;
  id: string;
  map_coordinates: string;
  name: string;
}

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

interface IPeriodScore {
  away_score: number;
  home_score: number;
  number: number;
  type: string;
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
}

export interface IPredictionStore {
  buttonWasClicked?: boolean;
  currentDate: string;
  dates: string[];
  filter?: any;
  isLoaded: boolean;
  isFetched: boolean;
  isSuccessSubmit: boolean;
  matches: ISportEvent[];
  fetchMatches(): void;
  handleSubmit(e: Event): void;
  handleChange(index: number, compIndex: number, e: any): void;
  setCurrentDate(date: string): void;
  closeSuccessMsg(): void;
}
