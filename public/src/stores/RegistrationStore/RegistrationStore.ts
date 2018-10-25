import axios from 'axios';
import {action, observable} from 'mobx';
import * as React from 'react';
import {IRegistration, IUser} from '../../@types';
import {userStore} from '../UserStore';

class RegistrationStore implements IRegistration {
  @observable public user: IUser = {
    email: '',
    name: '',
    password: '',
  };

  @action.bound
  public handleChange(field: keyof IUser, event: any) {
    this.user[field] = event.target.value;
  }

  @action.bound
  public handleSubmit(event: React.FormEvent<Element>) {
    event.preventDefault();
    axios.post('/users', this.user).then(() => {
      userStore.isLoggedIn = true;
      userStore.name = this.user.name;
    });
  }
}

export const registrationStore = new RegistrationStore();
