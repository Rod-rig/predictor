import {
  createStyles,
  List,
  Paper,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { observer } from "mobx-react";
import * as React from "react";
import { Loader, MatchItem } from "../";
import { IMatch, IRetriever } from "../../@types";

const styles = ({ breakpoints, spacing, typography }: Theme) =>
  createStyles({
    round: {
      marginBottom: spacing.unit,
      [breakpoints.up("lg")]: {
        margin: `0 ${spacing.unit * 3}px ${spacing.unit * 3}px`,
      },
    },
    title: {
      ...typography.body1,
      padding: `${spacing.unit}px`,
      [breakpoints.up("lg")]: {
        padding: `${spacing.unit}px ${spacing.unit * 4}px`,
      },
    },
  });

interface IProps extends WithStyles<typeof styles> {
  store: IRetriever<{
    results: IMatch[];
  }>;
}

export const MatchList = withStyles(styles)(
  observer(
    class extends React.Component<IProps, {}> {
      public render() {
        const { classes, store } = this.props;
        let group: JSX.Element[] = [];

        return store.isLoaded ? (
          <List disablePadding={true}>
            {store.data.results.map(
              (item: IMatch, index: number, list: IMatch[]) => {
                const stat = {
                  awayScore: item.sport_event_status.away_score,
                  awayTeam: item.sport_event.competitors[1].name,
                  homeScore: item.sport_event_status.home_score,
                  homeTeam: item.sport_event.competitors[0].name,
                  id: item.sport_event.id,
                  round: item.sport_event.tournament_round.number,
                };
                group.push(<MatchItem key={stat.id} {...stat} />);
                if (
                  !list[index + 1] ||
                  stat.round !==
                    list[index + 1].sport_event.tournament_round.number
                ) {
                  const round = (
                    <React.Fragment key={stat.id}>
                      <div className={classes.title}>Round {stat.round}</div>
                      <Paper className={classes.round}>{group}</Paper>
                    </React.Fragment>
                  );
                  group = [];
                  return round;
                }
              },
            )}
          </List>
        ) : (
          <Loader />
        );
      }
    },
  ),
);
