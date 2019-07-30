import { Paper, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import axios, { AxiosResponse } from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Loader } from "../";
import { IMatchDetails } from "../../@types";

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    info: {
      backgroundColor: palette.common.black,
      color: palette.common.white,
      padding: spacing(1),
    },
    paper: {
      margin: spacing(1),
      overflow: "hidden",
    },
  }),
);

export const MatchDetails = (props: RouteComponentProps<{ id: string }>) => {
  const { id } = props.match.params;
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
    const sportEventConditions = matches.sport_event_conditions;

    const scheduledDate = sportEvent.scheduled;
    const stadiumName = sportEvent.venue.name;
    const refereeName = sportEventConditions.referee.name;
    const attendence = sportEventConditions.attendance;

    return (
      <Paper className={classes.paper}>
        <div className={classes.info}>
          <span>{scheduledDate}</span>
          <span>{refereeName}</span>
          <span>{stadiumName}</span>
          <span>{attendence}</span>
        </div>
      </Paper>
    );
  } else {
    return <Loader />;
  }
};
