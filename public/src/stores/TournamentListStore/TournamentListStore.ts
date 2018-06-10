import axios, {AxiosResponse} from 'axios';
import {observable} from 'mobx';
import {ITournament, ITournamentList} from '../../@types';
import config from '../../config/config';

export class TournamentListStore implements ITournamentList {
  @observable public isLoaded: boolean = false;
  @observable public list: ITournament[] = [];
  private url: string =  `${config.apiUrl}/en/tournaments.json?api_key=${config.apiKey}`;
  constructor() {
    this.fetchList();
  }

  private fetchList() {
    axios.get(this.url).then((res: AxiosResponse) => {
      this.list = res.data.tournaments;
      this.isLoaded = true;
    });
  }
}
