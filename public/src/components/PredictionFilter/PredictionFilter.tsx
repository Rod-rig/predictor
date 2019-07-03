import {
  createStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { observer } from "mobx-react";
import * as React from "react";
import { IPredictionStore } from "../../@types";
import { constants } from "../../constants";
import { dict } from "../../dict";

const styles = ({ spacing }: Theme) =>
  createStyles({
    control: {
      margin: spacing.unit,
      width: 200,
    },
    wrap: {
      alignItems: "center",
      display: "flex",
    },
  });

interface IDatePickerProps extends WithStyles<typeof styles> {
  store: IPredictionStore;
}

export const PredictionFilter = withStyles(styles)(
  observer(
    class extends React.Component<IDatePickerProps, {}> {
      public render() {
        const { classes, store } = this.props;

        return (
          <div>
            <div className={classes.wrap}>
              <FormControl className={classes.control}>
                <InputLabel htmlFor="date">{dict.date_label}</InputLabel>
                <Select
                  value={store.currentDate}
                  onChange={this.handleDateChange}
                  inputProps={{
                    id: "date",
                    name: "date",
                  }}
                >
                  {store.dates.map((item: string) => {
                    const date = item
                      .split("-")
                      .reverse()
                      .join(".");
                    return (
                      <MenuItem key={item} value={item}>
                        {date}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl
                className={classes.control}
                disabled={store.matches.length < 1}
              >
                <InputLabel htmlFor="tournament">
                  {dict.tournament_label}
                </InputLabel>
                <Select
                  value={store.filter.tournament_id}
                  onChange={this.handleTournamentChange}
                >
                  <MenuItem
                    key={constants.defaultTournamentsValue}
                    value={constants.defaultTournamentsValue}
                  >
                    All
                  </MenuItem>
                  {Object.keys(store.tournaments).map((id: string) => {
                    return (
                      <MenuItem key={id} value={id}>
                        {store.tournaments[id]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
        );
      }

      private handleDateChange = (event: any) => {
        const { store } = this.props;

        store.setCurrentDate(event.target.value);

        store.setTournamentId(constants.defaultTournamentsValue);

        store.currentDate in store.cache
          ? store.setMatches(store.cache[store.currentDate])
          : store.fetchMatches();
      };

      private handleTournamentChange = (event: any) => {
        const { store } = this.props;

        store.setTournamentId(event.target.value);

        const filteredMatches =
          store.filter.tournament_id === constants.defaultTournamentsValue
            ? store.cache[store.currentDate]
            : store.filterMatches(store.cache[store.currentDate]);
        store.setMatches(filteredMatches);
      };
    },
  ),
);
