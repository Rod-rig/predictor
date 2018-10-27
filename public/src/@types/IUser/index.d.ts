export interface ILoginProps {
  classes?: any;
  store: ILogin;
}

export interface IUser {
  email?: string;
  name: string;
  password: string;
}

export interface ILogin {
  handleChange: (field: keyof IUser, event: any) => void;
  handleSubmit: (event: any) => void;
  isSnackbarOpen: boolean;
  user: IUser;
}

export interface IRegistrationProps {
  classes?: any;
  store: IRegistration;
}

export interface IRegistration {
  handleChange: (field: keyof IUser, event: any) => void;
  handleSubmit: (event: Event) => void;
  user: IUser;
}
