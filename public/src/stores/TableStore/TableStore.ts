import axios, {AxiosResponse} from 'axios';
import {action, observable} from 'mobx';
import {ITable, ITableProps, OrderType, RangeType} from '../../@types';
import config from '../../config/config';
import {rangeData} from '../../helpers';

export class TableStore implements ITable {
  public id: string;
  @observable public isLoaded: boolean = false;
  @observable public order: OrderType;
  @observable public sort: string;
  @observable public table: object[] = [];
  public readonly chars: string[];
  public readonly range?: RangeType;
  private url: string;

  constructor(props: ITableProps) {
    this.chars = props.chars;
    this.order = props.order;
    this.range = props.range;
    this.sort = props.sort;
    this.url = `${config.apiUrl}/en/tournaments/${props.id}/standings.json?api_key=${config.apiKey}`;
    this.fetchTable();
  }

  @action.bound
  public sortHandler(e: any) {
    const key = e.target.textContent;
    const newOrder = this.order === 'asc' ? 'desc' : 'asc';
    this.setSort(key);
    this.setOrder(newOrder);
    this.sortTable();
  }

  @action.bound
  private sortTable() {
    this.table = this.table.sort((a: any, b: any) => {
      if (this.order === 'asc') {
        return a[this.sort] - b[this.sort];
      } else {
        return b[this.sort] - a[this.sort];
      }
    });
  }

  @action.bound
  private setOrder(order: 'asc' | 'desc') {
    this.order = order;
  }

  @action.bound
  private setSort(sort: string) {
    this.sort = sort;
  }

  private fetchTable() {
    axios.get(this.url)
      .then((res: AxiosResponse) => {
        const groups = res.data.standings[0].groups;
        const table = groups[0].team_standings;
        this.table = this.range ? [...rangeData(table, this.range[0], this.range[1])] : [...table];
        this.isLoaded = true;
      });
  }
}
