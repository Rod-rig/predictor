import axios, { AxiosResponse } from "axios";
import { createBrowserHistory } from "history";
import { action, computed, observable } from "mobx";
import { parse, ParsedQuery } from "query-string";
import { userStore } from "../";
import { IPredictionStore, ISportEvent } from "../../@types";
import { constants } from "../../constants";
import { getFutureDates, sortByTournamentId } from "../../helpers";
import {
  createPayload,
  filterMatches,
  getTournaments,
  updateUrl,
} from "./helpers";

const history = createBrowserHistory({
  basename: "/#/predictions",
});

export class PredictionStore implements IPredictionStore {
  @computed get apiPredictionUrl() {
    return `/available-events/${this.currentDate}`;
  }
  @observable public isLoaded: boolean = false;
  @observable public isFetched: boolean = false;
  @observable public isSuccessSubmit: boolean = false;
  @observable public buttonWasClicked: boolean = false;
  @observable public currentDate: string;
  @observable public tournamentId: string;
  public dates: string[];
  public cache: {
    [key: string]: ISportEvent[];
  } = {};
  @observable public matches: ISportEvent[] = [];
  @observable public tournaments: {
    [key: string]: string;
  } = {};

  constructor(props?: { filter: string }) {
    const { date, tournament_id }: ParsedQuery = props
      ? parse(props.filter)
      : {};
    this.dates = getFutureDates();
    this.currentDate = date && !Array.isArray(date) ? date : this.dates[0];
    this.tournamentId =
      tournament_id && !Array.isArray(tournament_id)
        ? tournament_id
        : constants.defaultTournamentsValue;
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
      .then(this.handleSubmitSuccess, this.handleSubmitError);
  }

  @action.bound
  public handleSubmitSuccess() {
    this.isSuccessSubmit = true;
    this.buttonWasClicked = false;
  }

  @action.bound
  public handleSubmitError() {
    this.isSuccessSubmit = false;
    this.buttonWasClicked = false;
  }

  public handleChange(index: number, compIndex: number, e: any): void {
    this.matches[index].competitors[compIndex].userPrediction = +e.target.value;
  }

  public fetchMatches() {
    this.isFetched = false;
    this.cache[this.currentDate] = [];

    axios
      .get(this.apiPredictionUrl)
      .then(this.fetchMatchesSuccess, this.fetchMatchesError);
  }

  @action.bound
  public fetchMatchesSuccess(res: AxiosResponse) {
    const matches = res.data.sort(sortByTournamentId);
    this.matches =
      this.tournamentId !== constants.defaultTournamentsValue
        ? filterMatches(matches, this.tournamentId)
        : matches;
    this.cache = {
      ...this.cache,
      [this.currentDate]: matches,
    };
    this.tournaments = getTournaments(this.cache[this.currentDate]);
    this.isLoaded = this.isLoaded ? this.isLoaded : true;
    this.isFetched = true;
  }

  @action.bound
  public fetchMatchesError(response: any) {
    if (response.status === 403) {
      userStore.logout();
    }
    if (response.status === 404) {
      this.isLoaded = true;
      this.isFetched = true;
    }
  }

  public setCurrentDate(date: string) {
    this.currentDate = date;
  }

  @action.bound
  public closeSuccessMsg() {
    this.fetchMatches();
    this.isSuccessSubmit = false;
  }

  public setTournamentId(tournamentId: string) {
    this.tournamentId = tournamentId;
  }

  public setMatches(matches: ISportEvent[]) {
    this.matches = matches;
    this.tournaments = getTournaments(this.cache[this.currentDate]);
  }

  @action.bound
  public handleDateChange = (event: any) => {
    this.setCurrentDate(event.target.value);

    this.setTournamentId(constants.defaultTournamentsValue);

    this.currentDate in this.cache
      ? this.setMatches(this.cache[this.currentDate])
      : this.fetchMatches();

    updateUrl(history, {
      date: this.currentDate,
      tournament_id: this.tournamentId,
    });
  };

  @action.bound
  public handleTournamentChange = (event: any) => {
    const cacheMatches = this.cache[this.currentDate];

    this.setTournamentId(event.target.value);

    const filteredMatches =
      this.tournamentId === constants.defaultTournamentsValue
        ? cacheMatches
        : filterMatches(cacheMatches, this.tournamentId);
    this.setMatches(filteredMatches);

    updateUrl(history, { tournament_id: this.tournamentId });
  };
}
