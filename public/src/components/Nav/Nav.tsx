import {createStyles, Theme, Typography, withStyles} from '@material-ui/core';
import * as React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {dict} from '../../dict';

const styles = (theme: Theme) => createStyles({
  link: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.fontSize,
    textDecoration: 'none',
  },
  title: {
    marginLeft: theme.spacing.unit * 2,
  },
});

const compose = (...funcs: any[]) => {
  return funcs.reduce((a, b) => (...args: any[]) => a(b(...args)));
};

export const Nav = compose(withStyles(styles), withRouter)((props?: any) => {
  const {classes, match} = props;
  return (
    <React.Fragment>
      <Typography className={classes.title} variant='title'>
        <Link className={classes.link} to={`/fixtures/${match.params.id}`}>{dict.fixtures}</Link>
      </Typography>
      <Typography className={classes.title} variant='title'>
        <Link className={classes.link} to={`/results/${match.params.id}`}>{dict.results}</Link>
      </Typography>
      <Typography className={classes.title} variant='title'>
        <Link className={classes.link} to={`/predictions?tournament_id=${match.params.id}`}>{dict.prediction}</Link>
      </Typography>
    </React.Fragment>
  );
});
