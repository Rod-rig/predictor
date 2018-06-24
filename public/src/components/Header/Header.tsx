import {AppBar, IconButton, Theme, Toolbar, withStyles, withTheme} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import * as React from 'react';
import {Logo} from '../';

const styles = ({breakpoints, spacing}: Theme) => ({
  header: {
    marginBottom: spacing.unit,
    [breakpoints.up('lg')]: {
      marginBottom: spacing.unit * 3,
    },
  },
});

const HeaderElement = (props?: any) => {
  const {classes} = props;

  return (
    <AppBar position='static' className={classes.header}>
      <Toolbar>
        <IconButton color='inherit' aria-label='Menu'>
          <Menu/>
        </IconButton>
        <Logo/>
        {props.children}
      </Toolbar>
    </AppBar>
  );
};

export const Header = withStyles(styles)(withTheme()(HeaderElement));
