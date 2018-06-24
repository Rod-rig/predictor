import axios, {AxiosResponse} from 'axios';
import {action, observable} from 'mobx';
import {IGroup, ITable, ITableProps, OrderType, RangeType} from '../../@types';
import config from '../../config/config';
import {rangeData} from '../../helpers';

export class TableStore implements ITable {
  public id: string;
  @observable public isLoaded: boolean = false;
  @observable public order: OrderType;
  @observable public sortName: string;
  @observable public table: IGroup[] = [];
  public readonly chars: string[];
  public readonly range?: RangeType;
  private url: string;

  constructor(props: ITableProps) {
    this.chars = props.chars;
    this.order = props.order;
    this.range = props.range;
    this.sortName = props.sortName;
    this.url = `${config.apiUrl}/en/tournaments/${props.id}/standings.json?api_key=${config.apiKey}`;
    this.fetchTable();
  }

  @action.bound
  public sortHandler(index: number, sortName: string) {
    let newOrder: OrderType;
    if (this.table[index].order) {
      newOrder = this.table[index].order === 'asc' ? 'desc' : 'asc';
    } else {
      newOrder = this.order ? this.order : 'asc';
      this.table[index].order = newOrder;
    }
    this.setSort(index, sortName);
    this.setOrder(index, newOrder);
    this.sortTable(index, newOrder, sortName);
  }

  @action.bound
  private sortTable(index: number, order: OrderType, sortName: string) {
    this.table[index].team_standings = this.table[index].team_standings
      .slice().sort((a: any, b: any) => {
        if (order === 'asc') {
          return a[sortName] - b[sortName];
        } else {
          return b[sortName] - a[sortName];
        }
      });
  }

  @action.bound
  private setOrder(index: number, order: OrderType) {
    this.table[index].order = order;
  }

  @action.bound
  private setSort(index: number, sortName: string) {
    this.table[index].sortName = sortName;
  }

  private fetchTable() {
    axios.get(this.url)
      .then((res: AxiosResponse) => {
        const {standings} = res.data;
        this.table = this.range && standings[0].groups.length === 1 ?
          [...rangeData(standings[0].groups[0].team_standings, this.range[0], this.range[1])] :
          [...standings[0].groups];
        if (this.sortName) {
          this.table.forEach((item, index) => {
            this.sortHandler(index, this.sortName);
          });
        }
        this.isLoaded = true;
      });
  }
}
