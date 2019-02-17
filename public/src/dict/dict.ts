export interface IDict {
  continueText: string;
  draw: string;
  email: string;
  fixtures: string;
  goal_diff: string;
  goals_against: string;
  goals_for: string;
  header_menu_account_link: string;
  header_menu_stat_link: string;
  login: string;
  login_error_msg: string;
  logout: string;
  loss: string;
  name: string;
  noAvailablePredictionMatches: string;
  notFoundText: string;
  password: string;
  played: string;
  points: string;
  prediction: string;
  prediction_submit_btn: string;
  rank: string;
  register: string;
  registrationError: string;
  results: string;
  sidebar_menu_prediction: string;
  submit_btn_text: string;
  success: string;
  table: string;
  team: string;
  tournament_card_more: string;
  win: string;
}

export const dict: IDict = {
  continueText: "continue",
  draw: "draw",
  email: "Email",
  fixtures: "Fixtures",
  goal_diff: "GD",
  goals_against: "GA",
  goals_for: "GF",
  header_menu_account_link: "My account",
  header_menu_stat_link: "My stats",
  login: "Login",
  login_error_msg: "Wrong credentials",
  logout: "Logout",
  loss: "loss",
  name: "Name",
  noAvailablePredictionMatches:
    "No available matches for predictions on this date. Please choose another date.",
  notFoundText: "Not found",
  password: "Password",
  played: "played",
  points: "points",
  prediction: "Prediction",
  prediction_submit_btn: "Show",
  rank: "rank",
  register: "Register",
  registrationError: "User with these credentials is already registered",
  results: "Results",
  sidebar_menu_prediction: "Predictions",
  submit_btn_text: "Submit",
  success: "Success",
  table: "Table",
  team: "team",
  tournament_card_more: "Learn more",
  win: "win",
};
