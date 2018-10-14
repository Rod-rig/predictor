import {withStyles} from '@material-ui/core';
import * as React from 'react';
import {Link} from 'react-router-dom';

const styles = {
  img: {
    display: 'block',
    maxWidth: '100%',
  },
  logo: {
    maxWidth: 147,
  },
};

const LogoElement = (props: any) => {
  const {classes} = props;

  return (
    <div className={classes.logo}>
      <Link to='/'>
        <img className={classes.img} src='src/images/logo.svg' alt='logo'/>
      </Link>
    </div>
  );
};

export const Logo = withStyles(styles)(LogoElement);
