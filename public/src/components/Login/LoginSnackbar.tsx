import {createStyles, Snackbar, SnackbarContent, Theme, withStyles} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import {observer} from 'mobx-react';
import * as React from 'react';
import {dict} from '../../dict';
import {loginStore} from '../../stores';

const styles = ({palette, spacing, typography}: Theme) => createStyles({
  error: {
    backgroundColor: palette.error.dark,
  },
  msg: {
    alignItems: 'center',
    display: 'flex',
  },
  text: {
    fontSize: typography.subtitle1.fontSize,
    marginLeft: spacing.unit,
  },
});

export const LoginSnackbar = withStyles(styles)(observer((props: any) => {
  const {classes} = props;
  const message = (
    <div className={classes.msg}>
      <ErrorIcon/>
      <span className={classes.text}>{dict.login_error_msg}</span>
    </div>
  );
  return (
    <Snackbar
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      autoHideDuration={2000}
      onClose={loginStore.toggleSnackbar}
      open={loginStore.isSnackbarOpen}
    >
      <SnackbarContent className={classes.error} message={message}/>
    </Snackbar>
  );
}));
