import MenuIcon from 'material-ui-icons/Menu';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import {withStyles, withTheme} from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import * as React from 'react';
import Logo from '../Logo/Logo';

const styles = (theme: any) => ({
  header: {
    marginBottom: theme.spacing.unit,
  },
  title: {
    marginLeft: theme.spacing.unit * 2,
  },
});

const Header = (props?: any) => {
  const {classes} = props;

  return (
    <AppBar position='static' className={classes.header}>
      <Toolbar className='header__toolbar'>
        <IconButton color='inherit' aria-label='Menu'>
          <MenuIcon/>
        </IconButton>
        <Logo/>
        <Typography className={classes.title} variant='title' color='inherit'>
          Title
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(withTheme()(Header));
