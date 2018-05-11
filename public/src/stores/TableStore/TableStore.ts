import axios, {AxiosResponse} from 'axios';
import {action, observable} from 'mobx';
import {ITable, ITableProps, OrderType, RangeType} from '../../@types';
import {rangeData} from '../../helpers';

export class TableStore implements ITable {
  public id?: string = 'premier-league';
  @observable public isLoaded: boolean = false;
  @observable public order: OrderType;
  @observable public sort: string;
  @observable public table: object[] = [];
  public readonly chars: string[];
  public readonly range?: RangeType;
  public url: string =
    `https://raw.githubusercontent.com/Rod-rig/epl-data/master/2017-2018/england/${this.id}/table.json`;

  constructor(props: ITableProps) {
    this.chars = props.chars;
    this.order = props.order;
    this.range = props.range;
    this.sort = props.sort;
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
        this.table = this.range ? [...rangeData(res.data, this.range[0], this.range[1])] : [...res.data];
        this.isLoaded = true;
      });
  }
}
