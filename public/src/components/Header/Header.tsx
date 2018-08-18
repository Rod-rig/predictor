import {AppBar, Button, IconButton, Theme, Toolbar, withStyles} from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import {observer} from 'mobx-react';
import * as React from 'react';
import {Link} from 'react-router-dom';
import {Logo, Sidebar} from '../';
import {dict} from '../../dict';
import {userStore} from '../../stores';

const styles = ({breakpoints, spacing}: Theme) => ({
  header: {
    marginBottom: spacing.unit,
    [breakpoints.up('lg')]: {
      marginBottom: spacing.unit * 3,
    },
  },
  logout: {
    marginLeft: spacing.unit,
  },
  user: {
    marginLeft: 'auto',
  },
});

const LoginLink = (props: any) => <Link to='/login' {...props}/>;

export const Header = withStyles(styles)(observer(class extends React.Component<{
  classes: any;
}, {
  isSidebarOpen: boolean;
}> {
  public state = {
    isSidebarOpen: false,
  };

  public toggleSidebar(isOpen: boolean): void {
    this.setState({
      isSidebarOpen: isOpen,
    });
  }

  public render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <AppBar position='static' className={classes.header}>
          <Toolbar>
            <IconButton onClick={this.toggleSidebar.bind(this, true)} color='inherit' aria-label='Menu'>
              <Menu/>
            </IconButton>
            <Logo/>
            {this.props.children}
            <div className={classes.user}>
              {userStore.isLoggedIn ? (
                <React.Fragment>
                  <span>{userStore.name}</span>
                  <Button className={classes.logout} onClick={userStore.logout} color='inherit'>{dict.logout}</Button>
                </React.Fragment>
              ) : (
                <Button component={LoginLink} color='inherit'>{dict.login}</Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Sidebar isOpen={this.state.isSidebarOpen} toggleHandler={this.toggleSidebar.bind(this, false)}/>
      </React.Fragment>
    );
  }
}));
