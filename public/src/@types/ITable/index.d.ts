import {match} from 'react-router-dom';

export type OrderType = 'asc' | 'desc';

export type RangeType = number[] | null;

export type IId = match<{id: string}>;

export interface ITableProps {
  id: string;
  order: OrderType;
  sort: string;
  chars: string[];
  range?: RangeType;
}

export interface ITable extends ITableProps {
  isLoaded: boolean;
  table: object[];
  url: string;
  sortHandler(e: Event): void;
}
