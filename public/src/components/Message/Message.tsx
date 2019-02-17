import {
  createStyles,
  Snackbar,
  SnackbarContent,
  Theme,
  withStyles,
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import * as React from "react";

const styles = ({ palette, spacing, typography }: Theme) =>
  createStyles({
    error: {
      backgroundColor: palette.error.dark,
    },
    msg: {
      alignItems: "center",
      display: "flex",
    },
    text: {
      fontSize: typography.subtitle1.fontSize,
      marginLeft: spacing.unit,
    },
  });

export const Message = withStyles(styles)((props: any) => {
  const { classes, open, onClose, text } = props;
  const message = (
    <div className={classes.msg}>
      <ErrorIcon />
      <span className={classes.text}>{text}</span>
    </div>
  );
  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      autoHideDuration={3000}
      onClose={onClose}
      open={open}
    >
      <SnackbarContent className={classes.error} message={message} />
    </Snackbar>
  );
});
