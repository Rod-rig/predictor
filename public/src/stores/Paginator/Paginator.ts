import axios, { AxiosResponse } from "axios";
import { action, observable } from "mobx";
import { IPaginator, IPaginatorProps } from "../../@types";
import { userStore } from "../UserStore";

export const LIMIT: number = 20;
export class Paginator implements IPaginator {
  public url: string;
  @observable public isLoaded: boolean = false;
  @observable public data: any;
  @observable public page: number = 1;
  public initialData: any;
  private readonly limit: number = LIMIT;

  constructor(props: IPaginatorProps) {
    this.url = props.url;
    this.fetchList();
  }

  @action.bound
  public handlePageChange(event: any, page: number) {
    this.page = page;
    this.data = this.getStoreByPage(this.initialData);
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

  private getStoreByPage(data: any) {
    const start: number = (this.page - 1) * this.limit;
    const end: number = this.page * this.limit;
    return data.slice(start, end);
  }
}
