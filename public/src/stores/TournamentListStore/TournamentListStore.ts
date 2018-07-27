import axios, {AxiosResponse} from 'axios';
import {observable} from 'mobx';
import {ITournament, ITournamentList} from '../../@types';

export class TournamentListStore implements ITournamentList {
  @observable public isLoaded: boolean = false;
  @observable public list: ITournament[] = [];
  constructor() {
    this.fetchList();
  }

  private fetchList() {
    axios.get('/api/tournaments').then((res: AxiosResponse) => {
      this.list = res.data.tournaments;
      this.isLoaded = true;
    });
  }
}
