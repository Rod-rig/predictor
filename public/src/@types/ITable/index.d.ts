export type OrderType = 'asc' | 'desc';

export type RangeType = number[] | null;

export interface ITableProps {
  order: OrderType;
  sort: string;
  chars: string[];
  range?: RangeType;
}

export interface ITable extends ITableProps {
  id?: string;
  isLoaded: boolean;
  table: object[];
  url: string;
  sortHandler(e: Event): void;
}
