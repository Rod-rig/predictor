export type OrderType = 'asc' | 'desc';

export type RangeType = number[] | null;

export interface ITableProps {
  id: string;
  order: OrderType;
  sort: string;
  chars: string[];
  range?: RangeType;
}

interface ITeam {
  team: {
    id: string;
    name: string;
  };
  rank: number;
  current_outcome: string;
  played: number;
  win: number;
  draw: number;
  loss: number;
  goals_for: number;
  goals_against: number;
  goal_diff: number;
  points: number;
}

interface IGroup {
  team_standings: ITeam[];
}

interface IStanding {
  tie_break_rule: string;
  type: string;
  groups: IGroup[];
}

export interface ITable extends ITableProps {
  isLoaded: boolean;
  table: ITeam[];
  sortHandler(e: Event): void;
}
