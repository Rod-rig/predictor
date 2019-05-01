import {
  createStyles,
  Paper,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import * as React from "react";

const styles = ({ spacing }: Theme) =>
  createStyles({
    paper: {
      padding: `${spacing.unit * 2}px ${spacing.unit}px`,
      "text-align": "center",
      width: "100%",
    },
    wrapper: {
      display: "flex",
      flexWrap: "nowrap",
    },
  });

interface IProps extends WithStyles<typeof styles> {}

export const StatsInfo = withStyles(styles)((props: IProps) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.paper}>
        <div>lorem query</div>
        <div>1</div>
      </Paper>
      <Paper className={classes.paper}>
        <div>lorem query</div>
        <div>3</div>
      </Paper>
      <Paper className={classes.paper}>
        <div>lorem query</div>
        <div>12</div>
      </Paper>
      <Paper className={classes.paper}>
        <div>lorem query</div>
        <div>8</div>
      </Paper>
    </div>
  );
});
