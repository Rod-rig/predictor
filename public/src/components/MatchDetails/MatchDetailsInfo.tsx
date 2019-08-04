import { Theme } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import Place from "@material-ui/icons/Place";
import Schedule from "@material-ui/icons/Schedule";
import { createStyles, makeStyles } from "@material-ui/styles";
import * as React from "react";
import { dict } from "../../dict";

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) =>
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
      [breakpoints.down("xs")]: {
        flexFlow: "wrap",
        padding: spacing(0.5, 1),
      },
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
  }),
);

interface IProps {
  attendance: number;
  refereeName: string;
  scheduledDate: string;
  stadiumName: string;
}

export const MatchDetailsInfo = (props: IProps) => {
  const { attendance, refereeName, scheduledDate, stadiumName } = props;
  // @ts-ignore
  const classes = useStyles();

  return (
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
        <span>
          {dict.att}: {attendance}
        </span>
      </div>
    </div>
  );
};
