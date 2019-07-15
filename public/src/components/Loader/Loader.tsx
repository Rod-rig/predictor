import { CircularProgress, createStyles, Theme } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";

const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      left: "50%",
      marginLeft: spacing(-5 / 2),
      marginTop: spacing(-5 / 2),
      position: "absolute",
      top: "50%",
    },
  });

export const Loader = withStyles(styles)((props: any) => (
  <CircularProgress classes={{ root: props.classes.root }} />
));
