import { Hidden, Paper, Theme } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import Place from "@material-ui/icons/Place";
import Schedule from "@material-ui/icons/Schedule";
import { createStyles, makeStyles } from "@material-ui/styles";
import axios, { AxiosResponse } from "axios";
import classNames from "classnames";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Loader, TeamLogo } from "../";
import { IMatchDetails } from "../../@types";

const desktopSize = 64;
const mobSize = 44;
const mobBreakpoint = 370;

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) =>
  createStyles({
    competitor: {
      alignItems: "stretch",
      display: "flex",
      width: "100%",
    },
    dash: {
      fontWeight: 400,
      padding: spacing(0, 1),
    },
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
      [breakpoints.down("xs")]: {
        flexFlow: "wrap",
        padding: spacing(0.5, 1),
      },
    },
    logo: {
      alignItems: "center",
      height: desktopSize,
      justifyContent: "center",
      padding: spacing(1),
      width: desktopSize,
      [breakpoints.down(mobBreakpoint)]: {
        height: mobSize,
        width: mobSize,
      },
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
      [breakpoints.down("xs")]: {
        margin: spacing(0.5, 0),
        width: "50%",
      },
    },
    score: {
      alignItems: "center",
      backgroundColor: palette.secondary.main,
      color: palette.common.white,
      display: "flex",
      fontSize: "2.5rem",
      fontWeight: "bold",
      justifyContent: "center",
      minWidth: "140px",
      textAlign: "center",
      width: "140px",
      [breakpoints.down("sm")]: {
        fontSize: "2rem",
        minWidth: 100,
        width: 100,
      },
      [breakpoints.down("xs")]: {
        minWidth: 90,
        width: 90,
      },
      [breakpoints.down(mobBreakpoint)]: {
        fontSize: "1.5rem",
        minWidth: 80,
        width: 80,
      },
    },
    scoreBoard: {
      alignItems: "stretch",
      display: "flex",
      height: `${desktopSize}px`,
      justifyContent: "space-between",
      [breakpoints.down(mobBreakpoint)]: {
        height: mobSize,
      },
    },
    team: {
      alignItems: "center",
      background: palette.primary.main,
      color: palette.common.white,
      display: "flex",
      fontSize: "1.5rem",
      padding: spacing(0, 3),
      width: "100%",
      [breakpoints.down("sm")]: {
        fontSize: "1.25rem",
        padding: spacing(0, 2),
      },
      [breakpoints.down(mobBreakpoint)]: {
        padding: spacing(0, 1),
      },
    },
    teamAway: {
      justifyContent: "flex-end",
    },
    teamHome: {
      justifyContent: "flex-start",
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
    const sportEventStat = matches.sport_event_status;
    const sportEventConditions = matches.sport_event_conditions;

    const { competitors } = sportEvent;
    const homeTeam = competitors[0].name;
    const homeTeamAbbr = competitors[0].abbreviation;
    const homeScore = sportEventStat.home_score;
    const awayTeam = competitors[1].name;
    const awayTeamAbbr = competitors[1].abbreviation;
    const awayScore = sportEventStat.away_score;
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
        <div className={classes.scoreBoard}>
          <div className={classes.competitor}>
            <TeamLogo modClass={classes.logo} teamName={homeTeam} />
            <div className={classNames(classes.team, classes.teamHome)}>
              <Hidden xsDown={true}>{homeTeam}</Hidden>
              <Hidden smUp={true}>{homeTeamAbbr}</Hidden>
            </div>
          </div>
          <div className={classes.score}>
            {homeScore}
            <span className={classes.dash}>-</span>
            {awayScore}
          </div>
          <div className={classes.competitor}>
            <div className={classNames(classes.team, classes.teamAway)}>
              <Hidden xsDown={true}>{awayTeam}</Hidden>
              <Hidden smUp={true}>{awayTeamAbbr}</Hidden>
            </div>
            <TeamLogo modClass={classes.logo} teamName={awayTeam} />
          </div>
        </div>
      </Paper>
    );
  } else {
    return <Loader />;
  }
};
