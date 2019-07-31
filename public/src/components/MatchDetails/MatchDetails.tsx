import { Paper, Theme } from "@material-ui/core";
import Place from "@material-ui/icons/Place";
import Person from "@material-ui/icons/Person";
import Schedule from "@material-ui/icons/Schedule";
import { createStyles, makeStyles } from "@material-ui/styles";
import axios, { AxiosResponse } from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Loader } from "../";
import { IMatchDetails } from "../../@types";

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    icon: {
      fontSize: "1rem",
      marginRight: spacing(0.5),
    },
    info: {
      alignItems: "center",
      backgroundColor: palette.common.black,
      color: palette.common.white,
      display: "flex",
      fontSize: "0.75rem",
      padding: spacing(1),
    },
    paper: {
      margin: spacing(1),
      overflow: "hidden",
    },
    row: {
      "&:first-child": {
        marginLeft: 0,
      },
      alignItems: "center",
      display: "inline-flex",
      margin: spacing(0, 0.5),
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

    const scheduledDate = new Date(sportEvent.scheduled).toDateString();
    const stadiumName = sportEvent.venue.name;
    const refereeName = sportEventConditions.referee.name;
    const attendence = sportEventConditions.attendance;

    return (
      <Paper className={classes.paper}>
        <div className={classes.info}>
          <div className={classes.row}>
            <Schedule className={classes.icon} />
            <span>{scheduledDate}</span>
          </div>
          <div className={classes.row}>
            <Person className={classes.icon} />
            <span>{refereeName}</span>
          </div>
          <div className={classes.row}>
            <Place className={classes.icon} />
            <span>{stadiumName}</span>
          </div>
          <div className={classes.row}>
            <span>Att: {attendence}</span>
          </div>
        </div>
      </Paper>
    );
  } else {
    return <Loader />;
  }
};
