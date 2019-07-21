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
import { IFixture, IRetriever } from "../../@types";

const styles = ({ breakpoints, spacing, typography }: Theme) =>
  createStyles({
    round: {
      marginBottom: spacing(1),
      [breakpoints.up("lg")]: {
        margin: spacing(0, 3, 3),
      },
    },
    title: {
      ...typography.body1,
      padding: spacing(1),
      [breakpoints.up("lg")]: {
        padding: spacing(1, 4),
      },
    },
  });

interface IProps extends WithStyles<typeof styles> {
  store: IRetriever<{
    sport_events: IFixture[];
  }>;
}

export const FixturesList = withStyles(styles)(
  observer(
    class extends React.Component<IProps, {}> {
      public render() {
        const { classes, store } = this.props;
        let group: JSX.Element[] = [];

        return store.isLoaded ? (
          <List disablePadding={true}>
            {store.data.sport_events.map(
              (item: IFixture, index: number, list: IFixture[]) => {
                const stat = {
                  awayTeam: item.competitors[1].name,
                  homeTeam: item.competitors[0].name,
                  id: item.id,
                  round: item.tournament_round.number,
                };
                group.push(<MatchItem key={stat.id} {...stat} />);
                if (
                  !list[index + 1] ||
                  stat.round !== list[index + 1].tournament_round.number
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
