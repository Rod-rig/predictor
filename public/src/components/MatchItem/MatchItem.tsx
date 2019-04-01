import { ListItem, ListItemText, Theme, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import * as React from "react";
import { TeamLogo } from "../";

const decorate = withStyles(({ palette, spacing, typography }: Theme) => ({
  dash: {
    marginLeft: spacing.unit / 2,
    marginRight: spacing.unit / 2,
  },
  default: {
    backgroundColor: palette.primary.main,
  },
  green: {
    backgroundColor: green[600],
  },
  icon: {
    marginLeft: spacing.unit * 2,
    marginRight: 0,
  },
  red: {
    backgroundColor: palette.error.dark,
  },
  right: {
    justifyContent: "flex-end",
  },
  score: {
    color: palette.primary.contrastText,
    display: "flex",
    fontSize: typography.pxToRem(20),
    justifyContent: "center",
    lineHeight: typography.pxToRem(20 * 1.5),
    width: typography.pxToRem(20 * 3),
  },
  text: {
    alignItems: "center",
    display: "flex",
    flexBasis: "40%",
  },
}));

const renderScore = (
  homeScore: number,
  awayScore: number,
  status: number,
  classes: any,
): JSX.Element => {
  const statusClassName =
    status === 1 ? classes.green : status === 0 ? classes.red : classes.default;
  return (
    <div className={`${classes.score} ${statusClassName}`}>
      <div>{homeScore}</div>
      <div className={classes.dash}>:</div>
      <div>{awayScore}</div>
    </div>
  );
};

const renderEmptyScore = (classes: any): JSX.Element => (
  <div className={classes.score}>
    <div className={classes.dash}>:</div>
  </div>
);

export const MatchItem = decorate(
  (props: {
    awayLogo?: string;
    awayScore?: number;
    awayTeam: string;
    classes?: any;
    homeLogo?: string;
    homeScore?: number;
    homeTeam: string;
    status?: number;
  }) => {
    const { awayScore, awayTeam, classes, homeScore, homeTeam, status } = props;
    return (
      <ListItem button={true} divider={true}>
        <ListItemText
          className={`${classes.text} ${classes.right}`}
          disableTypography={true}
        >
          <div>{homeTeam}</div>
          <TeamLogo teamName={homeTeam} modClass={classes.icon} />
        </ListItemText>

        {!isNaN(props.homeScore)
          ? renderScore(homeScore, awayScore, status, classes)
          : renderEmptyScore(classes)}

        <ListItemText className={classes.text} disableTypography={true}>
          <TeamLogo teamName={awayTeam} />
          <div>{awayTeam}</div>
        </ListItemText>
      </ListItem>
    );
  },
);
