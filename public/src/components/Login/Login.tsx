import {Button, createStyles, Paper, TextField, Theme, withStyles} from '@material-ui/core';
import {observer} from 'mobx-react';
import * as React from 'react';
import {Redirect} from 'react-router-dom';
import {dict} from '../../dict';
import {userStore} from '../../stores';

const styles = ({spacing}: Theme) => createStyles({
  paper: {
    margin: spacing.unit,
    padding: spacing.unit * 3,
  },
});

export const Login = withStyles(styles)(observer(class extends React.Component<any, any> {
  public render() {
    const {classes, store} = this.props;
    return !userStore.isLoggedIn ? (
      <Paper classes={{root: classes.paper}}>
        <form onSubmit={store.handleSubmit} autoComplete='off'>
          <TextField
            id='name'
            fullWidth={true}
            label='Name'
            value={store.user.name}
            onChange={store.handleChange.bind(this, 'name')}
            margin='normal'
            autoFocus={true}
          />
          <TextField
            id='password'
            fullWidth={true}
            label='Password'
            value={store.user.password}
            onChange={store.handleChange.bind(this, 'password')}
            margin='normal'
            type='password'
          />
          <Button
            disabled={store.user.name.length < 1 || store.user.password.length < 1}
            type='submit'
            variant='contained'
            color='secondary'
          >
            {dict.login}
          </Button>
        </form>
      </Paper>
    ) : (
      <Redirect to='/'/>
    );
  }
}));
