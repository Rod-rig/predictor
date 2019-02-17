import axios from "axios";
import { action, observable } from "mobx";
import { IRegistration, IUser } from "../../@types";
import { userStore } from "../UserStore";

class RegistrationStore implements IRegistration {
  @observable public hasError: boolean = false;
  @observable public user: IUser = {
    email: "",
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
  public handleSubmit(event: Event) {
    event.preventDefault();
    axios
      .post("/register", this.user)
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

export const registrationStore = new RegistrationStore();
