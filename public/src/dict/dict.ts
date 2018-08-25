export interface IDict {
  draw: string;
  email: string;
  fixtures: string;
  goal_diff: string;
  goals_against: string;
  goals_for: string;
  login: string;
  login_error_msg: string;
  logout: string;
  loss: string;
  name: string;
  notFoundText: string;
  password: string;
  played: string;
  points: string;
  prediction: string;
  rank: string;
  register: string;
  registration: string;
  results: string;
  sidebar_menu_prediction: string;
  submit_btn_text: string;
  team: string;
  tournament_card_more: string;
  win: string;
}

export const dict: IDict = {
  draw: 'draw',
  email: 'Email',
  fixtures: 'Fixtures',
  goal_diff: 'GD',
  goals_against: 'GA',
  goals_for: 'GF',
  login: 'Login',
  login_error_msg: 'Wrong credentials',
  logout: 'Logout',
  loss: 'loss',
  name: 'Name',
  notFoundText: 'Not found',
  password: 'Password',
  played: 'played',
  points: 'points',
  prediction: 'Prediction',
  rank: 'rank',
  register: 'Register',
  registration: 'Registration',
  results: 'Results',
  sidebar_menu_prediction: 'Predictions',
  submit_btn_text: 'Submit',
  team: 'team',
  tournament_card_more: 'Learn more',
  win: 'win',
};
