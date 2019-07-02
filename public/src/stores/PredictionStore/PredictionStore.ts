import axios, { AxiosResponse } from "axios";
import { action, computed, observable } from "mobx";
import { parse, ParsedQuery } from "query-string";
import { userStore } from "../";
import { IPredictionStore, ISportEvent } from "../../@types";
import { constants } from "../../constants";
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
  @observable public isLoaded: boolean = false;
  @observable public isFetched: boolean = false;
  @observable public isSuccessSubmit: boolean = false;
  @observable public buttonWasClicked: boolean = false;
  @observable public currentDate: string;
  public dates: string[];
  @observable public filter: ParsedQuery;
  public cache: {
    [key: string]: ISportEvent[];
  } = {};
  @observable public matches: ISportEvent[] = this.cache[this.currentDate]
    ? [...this.cache[this.currentDate]]
    : [];
  @observable public tournaments: {
    [key: string]: string;
  } = {};

  constructor(props?: { filter: string }) {
    this.filter = props.filter
      ? parse(props.filter)
      : {
          tournament_id: constants.defaultTournamentsValue,
        };
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
    const tournamentId = this.filter.tournament_id;
    this.isFetched = false;
    axios
      .get(this.apiPredictionUrl)
      .then((res: AxiosResponse) => {
        const matches = res.data.sort(sortByTournamentId);
        this.matches =
          tournamentId !== constants.defaultTournamentsValue
            ? this.filterMatches(matches)
            : matches;
        this.cache = {
          ...this.cache,
          [this.currentDate]: matches,
        };
        this.tournaments = this.getTournaments();
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
            this.cache[this.currentDate] = [];
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

  @action.bound
  public setTournamentId(id: string) {
    this.filter = {
      tournament_id: id,
    };
  }

  @action.bound
  public setMatches(matches: ISportEvent[]) {
    this.matches = matches;
    this.tournaments = this.getTournaments();
  }

  @action.bound
  public getTournaments() {
    const ids: {
      [key: string]: string;
    } = {};
    this.cache[this.currentDate].forEach((match: ISportEvent) => {
      const id: string = match.tournament.id;
      if (!ids[id]) {
        ids[id] = match.tournament.name;
      }
    });
    return ids;
  }

  public filterMatches(matches: ISportEvent[]) {
    return matches.filter((match: ISportEvent) => {
      return match.tournament.id === this.filter.tournament_id;
    });
  }
}
