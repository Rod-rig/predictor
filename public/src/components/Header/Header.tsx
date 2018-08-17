import {AppBar, Button, IconButton, Theme, Toolbar, withStyles} from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import * as React from 'react';
import {Link} from 'react-router-dom';
import {Logo, Sidebar} from '../';
import {dict} from '../../dict';
import {loginStore} from '../../stores';

const styles = ({breakpoints, spacing}: Theme) => ({
  header: {
    marginBottom: spacing.unit,
    [breakpoints.up('lg')]: {
      marginBottom: spacing.unit * 3,
    },
  },
});

const LoginLink = (props: any) => <Link to='/login' {...props}/>;

export const Header = withStyles(styles)(class extends React.Component<any> {
  public state = {
    isSidebarOpen: false,
  };

  public toggleSidebar(isOpen: boolean): void {
    this.setState({
      isSidebarOpen: isOpen,
    });
  }

  public render() {
    return (
      <React.Fragment>
        <AppBar position='static' className={this.props.classes.header}>
          <Toolbar>
            <IconButton onClick={this.toggleSidebar.bind(this, true)} color='inherit' aria-label='Menu'>
              <Menu/>
            </IconButton>
            <Logo/>
            {this.props.children}
            {loginStore.isLoggedIn ? (
              <div>{loginStore.user.name}</div>
            ) : (
              <Button component={LoginLink} color='inherit'>{dict.login}</Button>
            )}
          </Toolbar>
        </AppBar>
        <Sidebar isOpen={this.state.isSidebarOpen} toggleHandler={this.toggleSidebar.bind(this, false)}/>
      </React.Fragment>
    );
  }
});
