interface ICompetitor {
  abbreviation: string;
  country: string;
  country_code: string;
  id: string;
  name: string;
  qualifier: 'home' | 'away';
}

interface ISeason {
  end_date: string;
  id: string;
  name: string;
  start_date: string;
  tournament_id: string;
  year: string;
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
  tournament: string;
  tournament_round: {
    number: number;
    type: string;
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

export interface IMatchListProps {
  type: string;
  id: string;
}

export interface IMatchList extends IMatchListProps {
  isLoaded: boolean;
  list: object[];
}

export interface IMatch {
  sport_event: ISportEvent;
  sport_event_status: ISportEventStatus;
}
