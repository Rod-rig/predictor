import axios, {AxiosResponse} from 'axios';
import {computed, observable} from 'mobx';
import {IMatchList, IMatchListProps} from '../../@types';
import config from '../../config/config';

export class MatchListStore implements IMatchList {
  public id: string;
  @observable public isLoaded: boolean = false;
  @observable public list: object[] = [];
  public readonly type: string;

  constructor(props: IMatchListProps) {
    this.type = props.type;
    this.id = props.id;
    this.fetchList();
  }

  private fetchList() {
    axios.get(this.matchListUrl)
      .then((res: AxiosResponse) => {
        this.list = [...res.data.results];
        this.isLoaded = true;
      });
  }

  @computed
  private get matchListUrl(): string {
    return `${config.apiUrl}/en/tournaments/${this.id}/results.json?api_key=${config.apiKey}`;
  }
}
