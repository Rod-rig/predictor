export interface IDict {
  draw: string;
  fixtures: string;
  goal_diff: string;
  goals_against: string;
  goals_for: string;
  login: string;
  loss: string;
  notFoundText: string;
  played: string;
  points: string;
  prediction: string;
  rank: string;
  results: string;
  sidebarMenuPrediction: string;
  submit_btn_text: string;
  team: string;
  tournamentCardMore: string;
  win: string;
}

export const dict: IDict = {
  draw: 'draw',
  fixtures: 'Fixtures',
  goal_diff: 'GD',
  goals_against: 'GA',
  goals_for: 'GF',
  login: 'Login',
  loss: 'loss',
  notFoundText: 'Not found',
  played: 'played',
  points: 'points',
  prediction: 'Prediction',
  rank: 'rank',
  results: 'Results',
  sidebarMenuPrediction: 'Predictions',
  submit_btn_text: 'Submit',
  team: 'team',
  tournamentCardMore: 'Learn more',
  win: 'win',
};
