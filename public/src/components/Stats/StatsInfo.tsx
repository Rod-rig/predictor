import {
  createStyles,
  Paper,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import * as React from "react";
import { dict } from "../../dict";

const styles = ({ breakpoints, spacing, typography }: Theme) =>
  createStyles({
    number: {
      fontSize: typography.fontSize * 2,
    },
    paper: {
      padding: `${spacing.unit * 2}px ${spacing.unit}px`,
      "text-align": "center",
      width: "50%",
      [breakpoints.up("sm")]: {
        width: "100%",
      },
    },
    text: {
      fontSize: typography.fontSize,
    },
    wrapper: {
      display: "flex",
      flexWrap: "wrap",
      marginBottom: spacing.unit,
      [breakpoints.up("sm")]: {
        flexWrap: "nowrap",
      },
    },
  });

interface IProps extends WithStyles<typeof styles> {}

export const StatsInfo = withStyles(styles)((props: IProps) => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.paper}>
        <Typography
          className={classes.text}
          variant="body1"
          gutterBottom={true}
        >
          {dict.predictions_success}
        </Typography>
        <div className={classes.number}>3</div>
      </Paper>
      <Paper className={classes.paper}>
        <Typography
          className={classes.text}
          variant="body1"
          gutterBottom={true}
        >
          {dict.predictions_total}
        </Typography>
        <div className={classes.number}>1</div>
      </Paper>
      <Paper className={classes.paper}>
        <Typography
          className={classes.text}
          variant="body1"
          gutterBottom={true}
        >
          {dict.predictions_correct}
        </Typography>
        <div className={classes.number}>12</div>
      </Paper>
      <Paper className={classes.paper}>
        <Typography
          className={classes.text}
          variant="body1"
          gutterBottom={true}
        >
          {dict.predictions_pending}
        </Typography>
        <div className={classes.number}>8</div>
      </Paper>
    </div>
  );
});
