export type OrderType = 'asc' | 'desc';

export type RangeType = number[] | null;

export interface ITableProps {
  order: OrderType;
  sort: string;
  chars: string[];
  range?: RangeType;
}

export interface ITable {
  id?: string;
  isLoaded: boolean;
  order: OrderType;
  sort: string;
  table: object[];
  chars: string[];
  range?: RangeType;
  url: string;
  sortHandler(e: Event): void;
}
