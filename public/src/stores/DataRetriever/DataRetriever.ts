import axios, { AxiosResponse } from "axios";
import { action, observable } from "mobx";
import { IRetriever, IRetrieverProps } from "../../@types";
import { userStore } from "../UserStore";

export class DataRetriever implements IRetriever {
  public url: string;
  @observable public isLoaded: boolean = false;
  @observable public data: any;

  constructor(props: IRetrieverProps) {
    this.url = props.url;
    this.fetchList();
  }

  @action.bound
  public fetchDataFailed({ status }: { status: number }) {
    if (status === 403) {
      userStore.logout();
    }
  }

  @action.bound
  private fetchDataSuccess(res: AxiosResponse) {
    this.data = Array.isArray(res.data) ? [...res.data] : { ...res.data };
    this.isLoaded = true;
  }

  private fetchList() {
    axios.get(this.url).then(this.fetchDataSuccess, this.fetchDataFailed);
  }
}
