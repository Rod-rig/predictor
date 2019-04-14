import {
  createStyles,
  Link,
  Paper,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import Notifications from "@material-ui/icons/Notifications";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { dict } from "../../dict";

const MainLink = (props: any) => <RouterLink to="/" {...props} />;
const PredictionLink = (props: any) => (
  <RouterLink to="/predictions" {...props} />
);

const styles = ({ breakpoints, spacing }: Theme) =>
  createStyles({
    links: {
      display: "flex",
      "justify-content": "space-between",
    },
    paper: {
      margin: "auto",
      padding: spacing.unit * 2,
      "text-align": "center",
      width: "320px",
      [breakpoints.up("sm")]: {
        left: "50%",
        position: "absolute",
        top: "50%",
        transform: "translate(-50%, -50%);",
      },
    },
  });

interface IProps extends WithStyles<typeof styles> {}

export const EmptyStats = withStyles(styles)((props: IProps) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <Notifications color="primary" fontSize="large" />
      <Typography variant="h4" gutterBottom={true}>
        {dict.empty_stat_title}
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        {dict.empty_stat_descr}
      </Typography>
      <div className={classes.links}>
        <Link color="secondary" component={MainLink}>
          {dict.go_to_main_page_link}
        </Link>
        <Link color="secondary" component={PredictionLink}>
          {dict.go_to_predictions_page_link}
        </Link>
      </div>
    </Paper>
  );
});
