export interface IDict {
  all: string;
  att: string;
  continue_text: string;
  date_label: string;
  draw: string;
  email: string;
  empty_fixtures_list: string;
  empty_match_list: string;
  empty_stat_descr: string;
  empty_stat_title: string;
  fixtures: string;
  go_to_main_page_link: string;
  go_to_predictions_page_link: string;
  goal_diff: string;
  goals_against: string;
  goals_for: string;
  header_menu_account_link: string;
  header_menu_stat_link: string;
  login: string;
  login_error_msg: string;
  logout: string;
  loss: string;
  match_details_tab_lineups: string;
  match_details_tab_stats: string;
  match_details_tab_stats_title: string;
  name: string;
  no_available_prediction_matches: string;
  not_found_descr: string;
  not_found_title: string;
  password: string;
  played: string;
  points: string;
  prediction: string;
  prediction_submit_btn: string;
  predictions_correct: string;
  predictions_pending: string;
  predictions_success: string;
  predictions_total: string;
  rank: string;
  register: string;
  registration_error: string;
  results: string;
  sidebar_menu_prediction: string;
  submit_btn_text: string;
  success: string;
  table: string;
  team: string;
  tournament_card_more: string;
  tournament_label: string;
  win: string;
}

export const dict: IDict = {
  all: "All",
  att: "Att",
  continue_text: "continue",
  date_label: "Date",
  draw: "draw",
  email: "Email",
  empty_fixtures_list: "Fixtures list is empty",
  empty_match_list: "Match list is empty",
  empty_stat_descr: "Looks like you have no predictions yet",
  empty_stat_title: "No statistics",
  fixtures: "Fixtures",
  go_to_main_page_link: "Go to main page",
  go_to_predictions_page_link: "Make predictions",
  goal_diff: "GD",
  goals_against: "GA",
  goals_for: "GF",
  header_menu_account_link: "My account",
  header_menu_stat_link: "My stats",
  login: "Login",
  login_error_msg: "Wrong credentials",
  logout: "Logout",
  loss: "loss",
  match_details_tab_lineups: "Line-ups",
  match_details_tab_stats: "Stats",
  match_details_tab_stats_title: "Match Stats",
  name: "Name",
  no_available_prediction_matches:
    "No available matches for predictions on this date. Please choose another date.",
  not_found_descr:
    "Looks like you've followed a broken link or entered a URL that doesn't exist on this site.",
  not_found_title: "Page Not Found",
  password: "Password",
  played: "played",
  points: "points",
  prediction: "Prediction",
  prediction_submit_btn: "Show",
  predictions_correct: "Predicted correctly",
  predictions_pending: "Predictions pending",
  predictions_success: "Predictions success %",
  predictions_total: "Total predictions",
  rank: "rank",
  register: "Register",
  registration_error: "User with these credentials is already registered",
  results: "Results",
  sidebar_menu_prediction: "Predictions",
  submit_btn_text: "Submit",
  success: "Success",
  table: "Table",
  team: "team",
  tournament_card_more: "Learn more",
  tournament_label: "Tournament",
  win: "win",
};
