import axios, {AxiosResponse} from 'axios';
import {observable} from 'mobx';
import {parse} from 'query-string';
import {IPredictionStore, ISportEvent} from '../../@types';

export class PredictionStore implements IPredictionStore {
  @observable public matches: ISportEvent[] = [];
  @observable public isLoaded: boolean = false;
  @observable public isSuccessSubmit: boolean = false;
  public dates: string[] = [];
  public filter: {
    tournament_id?: string;
  };

  constructor(props: {
    filter?: string;
  }) {
    this.filter = parse(props.filter);
    this.dates = this.getFutureDates();
    this.fetchTodayMatches();
  }

  public handleSubmit(e: any): void {
    e.preventDefault();
    const validatedMatches = this.matches.filter((match: ISportEvent) => {
      return match.competitors[0].userPrediction >= 0 && match.competitors[1].userPrediction >= 0;
    }).map((match) => {
      return {
        awayScore: match.competitors[1].userPrediction,
        awayTeam: match.competitors[1].name,
        homeScore: match.competitors[0].userPrediction,
        homeTeam: match.competitors[0].name,
        id: match.id,
      };
    });
    axios.post('/predictions', validatedMatches).then(() => {
      this.isSuccessSubmit = true;
    });
  }

  public handleChange(index: number, compIndex: number, e: any): void {
    this.matches[index].competitors[compIndex].userPrediction = +e.target.value;
  }

  public getFutureDates(): string[] {
    const dates = this.dates;
    const today: Date = new Date();
    for (let i = 0; i < 7; i++) {
      const year = today.getFullYear();
      const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
      const day = today.getDate() + i < 10 ? `0${today.getDate() + i}` : today.getDate() + i;
      dates.push(`${year}-${month}-${day}`);
    }
    return dates;
  }

  private fetchTodayMatches() {
    const {tournament_id} = this.filter;
    axios.get('/available-predictions')
      .then((res: AxiosResponse) => {
        this.matches = tournament_id ? this.filterMatches(res.data) : res.data;
        this.isLoaded = true;
      });
  }

  private filterMatches(matches: ISportEvent[]) {
    return matches.filter((match: ISportEvent) => {
      return match.tournament.id === this.filter.tournament_id;
    });
  }
}
