import { ListItem, ListItemText, Theme, withStyles } from "@material-ui/core";
import * as React from "react";
import { TeamLogo } from "../";

const decorate = withStyles(({ palette, spacing, typography }: Theme) => ({
  dash: {
    marginLeft: spacing.unit / 2,
    marginRight: spacing.unit / 2,
  },
  icon: {
    marginLeft: spacing.unit * 2,
    marginRight: 0,
  },
  right: {
    justifyContent: "flex-end",
  },
  score: {
    backgroundColor: palette.primary.main,
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
  classes: any,
): JSX.Element => (
  <div className={classes.score}>
    <div>{homeScore}</div>
    <div className={classes.dash}>:</div>
    <div>{awayScore}</div>
  </div>
);

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
  }) => {
    const { awayScore, awayTeam, classes, homeScore, homeTeam } = props;
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
          ? renderScore(homeScore, awayScore, classes)
          : renderEmptyScore(classes)}

        <ListItemText className={classes.text} disableTypography={true}>
          <TeamLogo teamName={awayTeam} />
          <div>{awayTeam}</div>
        </ListItemText>
      </ListItem>
    );
  },
);
