import axios from 'axios';
import {action, observable} from 'mobx';
import {userStore} from '../UserStore';

interface IUser {
  name: string;
  password: string;
}

class LoginStore {
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
      userStore.isLoggedIn = true;
      userStore.name = this.user.name;
    });
  }
}

export const loginStore = new LoginStore();
