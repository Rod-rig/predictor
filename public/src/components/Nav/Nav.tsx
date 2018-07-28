import {Theme, Typography, withStyles, withTheme} from '@material-ui/core';
import * as React from 'react';
import {Link} from 'react-router-dom';
import {dict} from '../../dict';

const styles = (theme: Theme) => ({
  link: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.fontSize,
    textDecoration: 'none',
  },
  title: {
    marginLeft: theme.spacing.unit * 2,
  },
});

const NavElement = (props?: any) => {
  const {classes, match} = props;
  const title = match.params.title[0].toUpperCase() + match.params.title.slice(1);
  return (
    <React.Fragment>
      <Typography className={classes.title} variant='title' color='inherit'>
        {title}
      </Typography>
      <Typography className={classes.title} variant='title'>
        <Link className={classes.link} to={`/fixtures/${match.params.id}`}>{dict.fixtures}</Link>
      </Typography>
      <Typography className={classes.title} variant='title'>
        <Link className={classes.link} to={`/results/${match.params.id}`}>{dict.results}</Link>
      </Typography>
      <Typography className={classes.title} variant='title'>
        <Link className={classes.link} to={`/predictions?tournamentId=${match.params.id}`}>{dict.prediction}</Link>
      </Typography>
    </React.Fragment>
  );
};

export const Nav = withStyles(styles)(withTheme()(NavElement));
