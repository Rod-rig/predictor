import { ISeason, ITournament } from "../";
import { ICompetitor } from "../ICompetitor";
import { IPeriodScore } from "../IPeriodScore";
import { IVenue } from "../IVenue";

interface IReferee {
  type?: string;
  id: string;
  name: string;
  nationality: string;
  country_code: string;
}

interface IPlayer {
  id: string;
  name: string;
  substituted_in: number;
  substituted_out: number;
  goals_scored: number;
  assists: number;
  own_goals: number;
  yellow_cards: number;
  yellow_red_cards: number;
  red_cards: number;
}

interface ITeamStat {
  id: string;
  name: string;
  abbreviation: string;
  qualifier: string;
  statistics: {
    ball_possession: number;
    shots_blocked: number;
    shots_on_target: number;
    throw_ins: number;
    fouls: number;
    goal_kicks: number;
    shots_saved: number;
    free_kicks: number;
    offsides: number;
    corner_kicks: number;
    shots_off_target: number;
    injuries: number;
    yellow_cards: number;
  };
  players: IPlayer[];
}

export interface IMatchDetails {
  sport_event: {
    id: string;
    scheduled: string;
    start_time_tbd: string;
    tournament_round: {
      type: string;
      number: number;
      phase: string;
    };
    season: ISeason;
    tournament: ITournament;
    competitors: ICompetitor;
    venue: IVenue;
  };
  sport_event_conditions: {
    referee: IReferee;
    referee_assistants: IReferee[];
    venue: IVenue;
    attendance: number;
    weather_info: {
      pitch: string;
      weather_conditions: string;
    };
  };
  sport_event_status: {
    status: string;
    match_status: string;
    home_score: number;
    away_score: number;
    winner_id: string;
    period_scores: IPeriodScore[];
    statistics: {
      teams: ITeamStat[];
    };
  };
}
