import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  withStyles,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";
import { TeamLogo } from "../";

const decorate = withStyles(
  ({ breakpoints, palette, spacing, typography }: Theme) => ({
    awayIcon: {
      marginRight: spacing(2),
      minWidth: 0,
      [breakpoints.down("xs")]: {
        marginRight: spacing(1),
      },
    },
    dash: {
      marginLeft: spacing(0.5),
      marginRight: spacing(0.5),
    },
    default: {
      backgroundColor: palette.primary.main,
    },
    green: {
      backgroundColor: green[600],
    },
    guest: {
      padding: spacing(0, 0, 0, 2),
      [breakpoints.down("xs")]: {
        margin: 0,
        padding: spacing(0, 0, 0, 1),
      },
    },
    home: {
      justifyContent: "flex-end",
      "text-align": "right",
      [breakpoints.down("xs")]: {
        margin: 0,
        paddingRight: spacing(1),
      },
    },
    homeIcon: {
      margin: spacing(0, 2),
      minWidth: 0,
      [breakpoints.down("xs")]: {
        margin: spacing(0, 0, 0, 1),
      },
    },
    logo: {
      height: 30,
      width: 30,
    },
    matchItem: {
      ...typography.subtitle1,
      [breakpoints.down("xs")]: {
        lineHeight: 1.2,
        padding: spacing(1),
      },
    },
    red: {
      backgroundColor: palette.error.dark,
    },
    score: {
      borderRadius: 4,
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
      [breakpoints.down("xs")]: {
        fontSize: typography.pxToRem(14),
        "word-break": "break-word",
      },
    },
  }),
);

const renderScore = (
  homeScore: number,
  awayScore: number,
  status: number,
  classes: any,
): JSX.Element => {
  const statusClassName =
    status === 1 ? classes.green : status === 0 ? classes.red : classes.default;
  return (
    <div className={classNames(classes.score, statusClassName)}>
      <div>{homeScore}</div>
      <div className={classes.dash}>:</div>
      <div>{awayScore}</div>
    </div>
  );
};

const renderEmptyScore = (classes: any): JSX.Element => (
  <div className={classNames(classes.score, classes.default)}>
    <div className={classes.dash}>:</div>
  </div>
);

const MatchItemLink = React.forwardRef((props: any, ref) => (
  <Link to={`/match/${props.id}`} innerRef={ref} {...props} />
));

export const MatchItem = decorate(
  (props: {
    awayLogo?: string;
    awayScore?: number;
    awayTeam: string;
    classes?: any;
    homeLogo?: string;
    homeScore?: number;
    homeTeam: string;
    id: string;
    status?: number;
  }) => {
    const {
      awayScore,
      awayTeam,
      classes,
      homeScore,
      homeTeam,
      id,
      status,
    } = props;
    return (
      <ListItem
        component={MatchItemLink}
        button={true}
        divider={true}
        className={classes.matchItem}
        id={id}
      >
        <ListItemText
          className={`${classes.text} ${classes.home}`}
          disableTypography={true}
        >
          <div>{homeTeam}</div>
          <ListItemAvatar>
            <TeamLogo
              teamName={homeTeam}
              modClass={classNames(classes.homeIcon, classes.logo)}
            />
          </ListItemAvatar>
        </ListItemText>

        {homeScore !== undefined || !isNaN(homeScore)
          ? renderScore(homeScore, awayScore, status, classes)
          : renderEmptyScore(classes)}

        <ListItemText
          className={classNames(classes.text, classes.guest)}
          disableTypography={true}
        >
          <ListItemAvatar>
            <TeamLogo
              teamName={awayTeam}
              modClass={classNames(classes.awayIcon, classes.logo)}
            />
          </ListItemAvatar>
          <div>{awayTeam}</div>
        </ListItemText>
      </ListItem>
    );
  },
);
