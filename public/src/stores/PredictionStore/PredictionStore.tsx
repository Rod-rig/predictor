import axios, {AxiosResponse} from 'axios';
import {observable} from 'mobx';
import {IPredictionFormProps, ISportEvent} from '../../@types';
import config from '../../config/config';

export class PredictionStore implements IPredictionFormProps {
  @observable public matches: ISportEvent[] = [];
  @observable public isLoaded: boolean = false;
  public today: string = PredictionStore.getTodayDate;

  constructor() {
    this.fetchTodayMatches();
  }

  public handleSubmit(e: any): void {
    e.preventDefault();
  }

  public handleChange(index: number, compIndex: number, e: any): void {
    this.matches[index].competitors[compIndex].userPrediction = +e.target.value;
  }

  private fetchTodayMatches() {
    axios.get(`${config.apiUrl}/en/schedules/${this.today}/schedule.json?api_key=${config.apiKey}`)
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
