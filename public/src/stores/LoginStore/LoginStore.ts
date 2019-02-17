import axios from "axios";
import { action, observable } from "mobx";
import { ILogin, IUser } from "../../@types";
import { userStore } from "../UserStore";

class LoginStore implements ILogin {
  @observable public hasError: boolean = false;
  @observable public user: IUser = {
    name: "",
    password: "",
  };

  @action.bound
  public closeSnackbar() {
    this.hasError = false;
  }

  @action.bound
  public handleChange(field: keyof IUser, event: any) {
    this.user[field] = event.target.value;
  }

  @action.bound
  public handleSubmit(event: any) {
    event.preventDefault();
    axios
      .post("/login", this.user)
      .then(() => {
        userStore.isLoggedIn = true;
        userStore.name = this.user.name;
        this.hasError = false;
      })
      .catch(() => {
        this.hasError = true;
      });
  }
}

export const loginStore = new LoginStore();
