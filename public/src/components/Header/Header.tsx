import MenuIcon from 'material-ui-icons/Menu';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import {withTheme} from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import * as React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../Logo/Logo';

import './Header.css';

const Header = (props?: any) => {
  const {theme} = props;
  const styles = {
    link: {
      color: theme.palette.primary.contrastText,
    },
    title: {
      marginLeft: theme.spacing.unit * 2,
    },
  };

  return (
    <AppBar position='static' className='header'>
      <Toolbar className='header__toolbar'>
        <IconButton color='inherit' aria-label='Menu'>
          <MenuIcon/>
        </IconButton>
        <Logo/>
        <Typography style={styles.title} variant='title' color='inherit'>
          Title
        </Typography>
        <div>
          <Link style={styles.link} className='header__link' to='/predictions'>Predictions</Link>
          <Link style={styles.link} className='header__link' to='/statistics/england'>Statistics</Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withTheme()(Header);
