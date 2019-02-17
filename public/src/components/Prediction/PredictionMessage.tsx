import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import Done from "@material-ui/icons/Done";
import * as React from "react";
import { dict } from "../../dict";

const styles = ({ palette }: Theme) =>
  createStyles({
    btn: {
      color: palette.common.white,
    },
    btnWrap: {
      justifyContent: "center",
    },
    dialog: {
      backgroundColor: green[600],
    },
    icon: {
      color: palette.common.white,
      display: "block",
      fontSize: 100,
      margin: "auto",
    },
    text: {
      color: palette.common.white,
      fontSize: "2.25rem",
      textTransform: "uppercase",
    },
  });

interface IProps extends WithStyles<typeof styles> {
  handleClose: () => void;
  open: boolean;
}

export const PredictionMessage = withStyles(styles)((props: IProps) => {
  const { classes, handleClose, open } = props;
  return (
    <Dialog
      classes={{
        paper: classes.dialog,
      }}
      open={open}
      keepMounted={true}
      onClose={handleClose}
    >
      <DialogContent>
        <Done className={classes.icon} />
        <DialogContentText className={classes.text}>
          {dict.success}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.btnWrap}>
        <Button className={classes.btn} onClick={handleClose}>
          {dict.continueText}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
