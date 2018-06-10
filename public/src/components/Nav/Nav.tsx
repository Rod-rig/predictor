import {Typography, withStyles, withTheme} from '@material-ui/core';
import * as React from 'react';
import {Link} from 'react-router-dom';

const styles = (theme: any) => ({
  link: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.fontSize,
    textDecoration: 'none',
  },
  title: {
    marginLeft: theme.spacing.unit * 2,
  },
});

const Nav = (props?: any) => {
  const {classes, match} = props;
  const title = match.params.title[0].toUpperCase() + match.params.title.slice(1);
  return (
    <React.Fragment>
      <Typography className={classes.title} variant='title' color='inherit'>
        {title}
      </Typography>
      <Typography className={classes.title} variant='title'>
        <Link className={classes.link} to={`/fixtures/${match.params.id}`}>Fixtures</Link>
      </Typography>
      <Typography className={classes.title} variant='title'>
        <Link className={classes.link} to={`/results/${match.params.id}`}>Results</Link>
      </Typography>
    </React.Fragment>
  );
};

export default withStyles(styles)(withTheme()(Nav));
