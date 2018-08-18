import axios, {AxiosResponse} from 'axios';
import {action, observable} from 'mobx';

interface IUser {
  name: string;
  password: string;
}

class LoginStore {
  @observable public isLoggedIn: boolean = false;
  @observable public user: IUser = {
    name: '',
    password: '',
  };

  constructor() {
    this.fetchUser();
  }

  @action.bound
  public fetchUser() {
    axios.get('/is-logged-in').then((response: AxiosResponse) => {
      this.isLoggedIn = response.data.isLoggedIn;
      this.user.name = response.data.name;
    });
  }

  @action.bound
  public handleChange(field: keyof IUser, event: any) {
    this.user[field] = event.target.value;
  }

  @action.bound
  public handleSubmit(event: any) {
    event.preventDefault();
    axios.post('/login', this.user).then(() => {
      this.isLoggedIn = true;
    });
  }
}

export const loginStore = new LoginStore();
