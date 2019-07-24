import {
  createStyles,
  List,
  Paper,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import MoodBad from "@material-ui/icons/MoodBad";
import { observer } from "mobx-react";
import * as React from "react";
import { Loader, MatchItem } from "../";
import { IMatch, IRetriever } from "../../@types";
import { dict } from "../../dict";

const styles = ({ breakpoints, palette, spacing, typography }: Theme) =>
  createStyles({
    empty: {
      margin: "auto",
      padding: spacing(2),
      "text-align": "center",
      width: "320px",
      [breakpoints.up("sm")]: {
        left: "50%",
        position: "absolute",
        top: "50%",
        transform: "translate(-50%, -50%);",
      },
    },
    round: {
      margin: spacing(1),
      overflow: "hidden",
      [breakpoints.up("sm")]: {
        margin: spacing(3, 1),
      },
    },
    title: {
      ...typography.body1,
      backgroundColor: palette.primary.main,
      color: palette.common.white,
      padding: spacing(1.5),
    },
  });

interface IProps extends WithStyles<typeof styles> {
  store: IRetriever<{
    results: IMatch[];
  }>;
}

export const MatchList = withStyles(styles)(
  observer((props: IProps) => {
    const { classes, store } = props;
    let group: JSX.Element[] = [];

    return store.isLoaded ? (
      store.data.results.length > 0 ? (
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
                  <Paper className={classes.round} key={stat.id}>
                    <div className={classes.title}>Round {stat.round}</div>
                    <div>{group}</div>
                  </Paper>
                );
                group = [];
                return round;
              }
            },
          )}
        </List>
      ) : (
        <div className={classes.empty}>
          <MoodBad fontSize="large" />
          <Typography variant="h5">{dict.empty_match_list}</Typography>
        </div>
      )
    ) : (
      <Loader />
    );
  }),
);
