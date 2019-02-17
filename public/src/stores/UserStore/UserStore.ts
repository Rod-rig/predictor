import axios, { AxiosResponse } from "axios";
import { action, observable } from "mobx";

class UserStore {
  @observable public isLoggedIn: boolean | undefined;
  @observable public name: string;

  constructor() {
    this.fetchUser();
  }

  @action.bound
  public fetchUser() {
    axios.get("/is-logged-in").then((response: AxiosResponse) => {
      this.isLoggedIn = response.data.isLoggedIn;
      this.name = response.data.name;
    });
  }

  @action.bound
  public logout() {
    axios.get("/logout").then(() => {
      this.isLoggedIn = false;
      this.name = "";
    });
  }
}

export const userStore = new UserStore();
