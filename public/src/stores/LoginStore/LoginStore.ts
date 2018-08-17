import axios from 'axios';
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
