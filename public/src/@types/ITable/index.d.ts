export type OrderType = "asc" | "desc";

export type RangeType = number[] | null;

export interface ITableProps {
  id: string;
  order?: OrderType;
  sortName?: string;
  chars: string[];
  range?: RangeType;
}

export interface ITeam {
  team: {
    id: string;
    name: string;
  };
  rank: number;
  current_outcome: string;
  played: number;
  win: number;
  draw: number;
  logo?: string;
  loss: number;
  goals_for: number;
  goals_against: number;
  goal_diff: number;
  points: number;
}

interface IGroup {
  name?: string;
  sortName?: string; // not from api
  order?: OrderType; // not from api
  team_standings: ITeam[];
}

interface IStanding {
  tie_break_rule: string;
  type: "total" | "home" | "away";
  groups: IGroup[];
}

export interface ITable extends ITableProps {
  isLoaded: boolean;
  table: IGroup[];
  title?: string;
  sortHandler(index: number, sortName: string): void;
}
