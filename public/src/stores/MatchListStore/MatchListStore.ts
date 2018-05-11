import axios, {AxiosResponse} from 'axios';
import {computed, observable} from 'mobx';
import {ILogo, IMatchList, IMatchListProps} from '../../@types';
import {transformLogoData} from '../../helpers';

export class MatchListStore implements IMatchList {
  public id: string = 'premier-league';
  @observable public isLoaded: boolean = false;
  public logosUrl: string =
    `https://raw.githubusercontent.com/Rod-rig/epl-data/master/2017-2018/england/${this.id}/teams.json`;
  public logos: ILogo;
  @observable public list: object[] = [];
  public readonly type: string;

  constructor(props: IMatchListProps) {
    this.type = props.type;
    this.fetchList();
  }

  private fetchList() {
    axios.all([
      axios.get(this.matchListUrl),
      axios.get(this.logosUrl),
    ]).then(axios.spread((matchesRes: AxiosResponse, logosRes: AxiosResponse) => {
      this.list = [...matchesRes.data];
      this.logos = {...transformLogoData(logosRes.data)};
      this.isLoaded = true;
    }));
  }

  @computed
  private get matchListUrl(): string {
    return `https://raw.githubusercontent.com/Rod-rig/epl-data/master/2017-2018/england/${this.id}/${this.type}.json`;
  }
}
