import axios, { AxiosResponse } from "axios";
import { action, computed, observable } from "mobx";
import { OutputParams, parse } from "query-string";
import { userStore } from "../";
import { IPredictionStore, ISportEvent } from "../../@types";
import { getFutureDates, sortByTournamentId } from "../../helpers";

const createPayload = (matches: ISportEvent[]) => {
  return matches
    .filter((match: ISportEvent) => {
      return (
        match.competitors[0].userPrediction >= 0 &&
        match.competitors[1].userPrediction >= 0
      );
    })
    .map(match => {
      return {
        awayScore: match.competitors[1].userPrediction,
        awayTeam: match.competitors[1].name,
        homeScore: match.competitors[0].userPrediction,
        homeTeam: match.competitors[0].name,
        matchId: match.id,
        scheduled: match.scheduled,
        seasonId: match.season.id,
        tournamentId: match.tournament.id,
      };
    });
};

export class PredictionStore implements IPredictionStore {
  @computed get apiPredictionUrl() {
    return `/available-events/${this.currentDate}`;
  }
  @observable public matches: ISportEvent[] = [];
  @observable public isLoaded: boolean = false;
  @observable public isFetched: boolean = false;
  @observable public isSuccessSubmit: boolean = false;
  @observable public buttonWasClicked: boolean = false;
  @observable public currentDate: string;
  public dates: string[];
  public filter: OutputParams;

  constructor(props?: { filter: string }) {
    this.filter = props ? parse(props.filter) : undefined;
    this.dates = getFutureDates();
    this.currentDate = this.dates[0];
    this.fetchMatches();
  }

  public handleSubmit(e: Event): void {
    e.preventDefault();

    const payload = createPayload(this.matches);
    if (payload.length < 1) {
      return;
    }

    this.buttonWasClicked = true;
    axios
      .post("/predictions", { payload })
      .then(() => {
        this.isSuccessSubmit = true;
        this.buttonWasClicked = false;
      })
      /* istanbul ignore next */
      .catch(
        /* istanbul ignore next */
        () => {
          /* istanbul ignore next */
          this.isSuccessSubmit = false;
          this.buttonWasClicked = false;
        },
      );
  }

  public handleChange(index: number, compIndex: number, e: any): void {
    this.matches[index].competitors[compIndex].userPrediction = +e.target.value;
  }

  public fetchMatches() {
    const tournamentId = this.filter ? this.filter.tournament_id : undefined;
    this.isFetched = false;
    axios
      .get(this.apiPredictionUrl)
      .then((res: AxiosResponse) => {
        this.matches = tournamentId
          ? this.filterMatches(res.data)
          : res.data.sort(sortByTournamentId);
        this.isLoaded = this.isLoaded ? this.isLoaded : true;
        this.isFetched = true;
      })
      /* istanbul ignore next */
      .catch(
        /* istanbul ignore next */
        ({ response }) => {
          /* istanbul ignore next */
          if (response.status === 403) {
            userStore.logout();
          }
          if (response.status === 404) {
            this.isLoaded = true;
            this.isFetched = true;
            this.matches = [];
          }
        },
      );
  }

  public setCurrentDate(date: string) {
    this.currentDate = date;
  }

  @action.bound
  public closeSuccessMsg() {
    this.fetchMatches();
    this.isSuccessSubmit = false;
  }

  private filterMatches(matches: ISportEvent[]) {
    return matches.filter((match: ISportEvent) => {
      return match.tournament.id === this.filter.tournament_id;
    });
  }
}
