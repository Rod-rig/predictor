import {withStyles} from '@material-ui/core';
import * as React from 'react';
import {Link} from 'react-router-dom';

const styles = {
  img: {
    display: 'block',
    maxWidth: '100%',
  },
  logo: {
    maxWidth: 50,
  },
};

const Logo = (props: any) => {
  const {classes} = props;

  return (
    <div className={classes.logo}>
      <Link to='/'>
        <img className={classes.img} src='https://avatars2.githubusercontent.com/u/11474330' alt='logo'/>
      </Link>
    </div>
  );
};

export default withStyles(styles)(Logo);
