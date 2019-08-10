import { Hidden, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import * as React from "react";
import { TeamLogo } from "../TeamLogo";

interface IProps {
  homeTeamAbbr: string;
  awayTeamAbbr: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
}

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

export const MatchDetailsScore = (props: IProps) => {
  // @ts-ignore
  const classes = useStyles();
  const {
    homeTeamAbbr,
    awayTeamAbbr,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
  } = props;

  return (
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
  );
};
