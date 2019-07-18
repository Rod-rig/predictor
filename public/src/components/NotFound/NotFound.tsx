import {
  createStyles,
  Link,
  Paper,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { dict } from "../../dict";

const MainLink = React.forwardRef((props: any, ref) => (
  <RouterLink to="/" ref={ref} {...props} />
));

const styles = ({ breakpoints, spacing }: Theme) =>
  createStyles({
    paper: {
      margin: "auto",
      padding: spacing(2),
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

export const NotFound = withStyles(styles)((props: IProps) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" gutterBottom={true}>
        {dict.not_found_title}
      </Typography>
      <Typography variant="body1" gutterBottom={true}>
        {dict.not_found_descr}
      </Typography>
      <div>
        <Link color="secondary" component={MainLink}>
          {dict.go_to_main_page_link}
        </Link>
      </div>
    </Paper>
  );
});
