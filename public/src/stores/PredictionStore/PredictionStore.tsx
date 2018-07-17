import axios, {AxiosResponse} from 'axios';
import {observable} from 'mobx';
import {IPredictionFormProps, ISportEvent} from '../../@types';

export class PredictionStore implements IPredictionFormProps {
  @observable public matches: ISportEvent[] = [];
  @observable public isLoaded: boolean = false;
  @observable public isSuccessSubmit: boolean = false;
  public today: string = PredictionStore.getTodayDate;

  constructor() {
    this.fetchTodayMatches();
  }

  public handleSubmit(e: any): void {
    e.preventDefault();
    axios.post('/predictions', {
      awayScore: this.matches[0].competitors[1].userPrediction,
      awayTeam: this.matches[0].competitors[1].name,
      homeScore: this.matches[0].competitors[0].userPrediction,
      homeTeam: this.matches[0].competitors[0].name,
      id: this.matches[0].id,
    }).then(() => {
      this.isSuccessSubmit = true;
    });
  }

  public handleChange(index: number, compIndex: number, e: any): void {
    this.matches[index].competitors[compIndex].userPrediction = +e.target.value;
  }

  private fetchTodayMatches() {
    axios.get('/api/daily-schedule')
      .then((res: AxiosResponse) => {
        this.matches = res.data.sport_events;
        this.isLoaded = true;
      });
  }

  public static get getTodayDate(): string {
    const today: Date = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
    const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    return `${year}-${month}-${day}`;
  }
}
