import { Paper, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import axios, { AxiosResponse } from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Loader } from "../";
import { IMatchDetails } from "../../@types";
import { MatchDetailsInfo } from "./MatchDetailsInfo";
import { MatchDetailsScore } from "./MatchDetailsScore";
import { MatchDetailsTabs } from "./MatchDetailsTabs";

const notStartedStatus = "not_started";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    paper: {
      margin: spacing(1),
      overflow: "hidden",
    },
  }),
);

export const MatchDetails = (props: RouteComponentProps<{ id: string }>) => {
  const { id } = props.match.params;
  // @ts-ignore
  const classes = useStyles();
  const [data, setData] = React.useState({
    isLoaded: false,
    matches: null,
  });

  React.useEffect(() => {
    axios
      .get(`/api/match/${id}`)
      .then((response: AxiosResponse<IMatchDetails>) => {
        setData({
          isLoaded: true,
          matches: response.data,
        });
      });
  }, []);

  if (data.isLoaded) {
    const { matches } = data;
    const sportEvent = matches.sport_event;
    const sportEventStatus = matches.sport_event_status;
    const sportEventConditions = matches.sport_event_conditions;
    const statistics = matches.statistics;

    const competitors = sportEvent.competitors;
    const homeTeam = competitors[0].name;
    const homeTeamAbbr = competitors[0].abbreviation;
    const homeScore = sportEventStatus.home_score;
    const awayTeam = competitors[1].name;
    const awayTeamAbbr = competitors[1].abbreviation;
    const awayScore = sportEventStatus.away_score;
    const scheduledDate = new Date(sportEvent.scheduled).toDateString();
    const stadiumName = sportEvent.venue.name;
    const refereeName =
      sportEventConditions.referee && sportEventConditions.referee.name;
    const attendance = sportEventConditions.attendance;

    return (
      <Paper className={classes.paper}>
        <MatchDetailsInfo
          attendance={attendance}
          scheduledDate={scheduledDate}
          stadiumName={stadiumName}
          refereeName={refereeName}
        />

        <MatchDetailsScore
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          homeScore={homeScore}
          awayScore={awayScore}
          homeTeamAbbr={homeTeamAbbr}
          awayTeamAbbr={awayTeamAbbr}
        />

        {sportEventStatus.status !== notStartedStatus && (
          <MatchDetailsTabs statistics={statistics} />
        )}
      </Paper>
    );
  } else {
    return <Loader />;
  }
};
