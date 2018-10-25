import * as React from 'react';

export interface ILoginProps {
  classes?: any;
  store: ILogin;
}

export interface IUser {
  name: string;
  password: string;
}

export interface ILogin {
  handleChange: (field: keyof IUser, event: any) => void;
  handleSubmit: (event: React.FormEvent<Element>) => void;
  isSnackbarOpen: boolean;
  user: IUser;
}
