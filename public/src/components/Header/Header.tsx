import {AppBar, IconButton, Toolbar, withStyles, withTheme} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import * as React from 'react';
import {Logo} from '../';

const styles = (theme: any) => ({
  header: {
    marginBottom: theme.spacing.unit,
  },
});

const HeaderElement = (props?: any) => {
  const {classes} = props;

  return (
    <AppBar position='static' className={classes.header}>
      <Toolbar className='header__toolbar'>
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
