import axios, { AxiosResponse } from "axios";
import { action, observable } from "mobx";
import * as React from "react";
import { IPaginator, IPaginatorProps, IPredictionMatch } from "../../@types";
import { constants } from "../../constants";
import { userStore } from "../UserStore";

export const LIMIT: number = 20;
const START_PAGE: number = 1;
export class Paginator implements IPaginator<IPredictionMatch[]> {
  public url: string;
  @observable public isLoaded: boolean = false;
  @observable public data: IPredictionMatch[];
  @observable public page: number = START_PAGE;
  @observable public season: string = constants.defaultSeasonsValue;
  public initialData: IPredictionMatch[];
  private readonly limit: number = LIMIT;

  constructor(props: IPaginatorProps) {
    this.url = props.url;
    this.fetchList();
  }

  @action.bound
  public handlePageChange(
    event: React.ChangeEvent<{ value: string }>,
    page: number,
  ) {
    this.page = page;
    this.data = this.getStoreByPage(this.initialData);
  }

  @action.bound
  public handleSeasonChange(event: React.ChangeEvent<{ value: string }>) {
    this.season = event.target.value;
    this.page = START_PAGE;
    this.data = this.getStoreByPage(this.filterDataBySeason(this.initialData));
  }

  @action.bound
  private fetchDataFailed({ status }: { status: number }) {
    this.isLoaded = false;
    if (status === 403) {
      userStore.logout();
    }
  }

  @action.bound
  private fetchDataSuccess(res: AxiosResponse) {
    this.initialData = res.data;
    this.data = this.getStoreByPage(res.data);
    this.isLoaded = true;
  }

  private fetchList() {
    axios.get(this.url).then(this.fetchDataSuccess, this.fetchDataFailed);
  }

  private getStoreByPage(data: IPredictionMatch[]) {
    const start: number = (this.page - 1) * this.limit;
    const end: number = this.page * this.limit;
    return data.slice(start, end);
  }

  private filterDataBySeason(data: IPredictionMatch[]) {
    return this.season === constants.defaultSeasonsValue
      ? data
      : data.filter((i: IPredictionMatch) => i.season === this.season);
  }
}
