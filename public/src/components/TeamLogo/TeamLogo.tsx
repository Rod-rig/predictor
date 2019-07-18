import {
  Avatar,
  ListItemIcon,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import classNames from "classnames";
import * as React from "react";
import { logos } from "../../content/logos";

const styles = ({ breakpoints }: Theme) => ({
  logo: {
    "& img": {
      "object-fit": "contain",
    },
    "border-radius": 0,
    height: "1.25em",
    width: "1.25em",
    [breakpoints.down("xs")]: {
      height: "1em",
      width: "1em",
    },
  },
  root: {
    minWidth: 0,
  },
});

interface IProps extends WithStyles<typeof styles> {
  teamName: string;
  modClass?: string;
}

export const TeamLogo = withStyles(styles)(
  ({ classes, teamName, modClass }: IProps) => {
    const src =
      teamName in logos
        ? logos[teamName]
        : "https://cdn2.iconfinder.com/data/icons/sport-items-2/512/football_soccer_badge_shield_ball_heraldic-128.png";
    const iconClassName = classNames(modClass, classes.root);
    return (
      <ListItemIcon className={iconClassName}>
        <Avatar src={src} className={classes.logo} />
      </ListItemIcon>
    );
  },
);
