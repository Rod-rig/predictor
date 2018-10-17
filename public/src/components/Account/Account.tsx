import {Paper, Theme, withStyles} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {observer} from 'mobx-react';
import * as React from 'react';
import {userStore} from '../../stores/UserStore';

const styles = (theme: Theme) => ({
  account: {
    alignItems: 'center',
    display: 'flex',
    padding: theme.spacing.unit,
  },
  icon: {
    height: '4em',
    width: '4em',
  },
});

export const Account = withStyles(styles)(observer((props: any) => {
  return (
    <Paper className={props.classes.account}>
      <div>
        <AccountCircle className={props.classes.icon}/>
      </div>
      <div>
        <div>Name: <b>{userStore.name}</b></div>
      </div>
    </Paper>
  );
}));