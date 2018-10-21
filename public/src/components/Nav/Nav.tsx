import {Button, createStyles, Theme, withStyles} from '@material-ui/core';
import * as React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {dict} from '../../dict';

const styles = (theme: Theme) => createStyles({
  containedSecondary: {
    marginRight: theme.spacing.unit,
    textTransform: 'none',
  },
  link: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.fontSize,
    textDecoration: 'none',
  },
  title: {
    display: 'inline-block',
    marginLeft: theme.spacing.unit * 2,
  },
});

const compose = (...funcs: any[]) => {
  return funcs.reduce((a, b) => (...args: any[]) => a(b(...args)));
};

export const Nav = compose(withStyles(styles), withRouter)((props?: any) => {
  const {classes, match} = props;
  const {id} = match.params;
  const TableLink = (linkProps: any) => <Link to={`/tournament/${id}`} {...linkProps}/>;
  const FixturesLink = (linkProps: any) => <Link to={`/fixtures/${id}`} {...linkProps}/>;
  const ResultsLink = (linkProps: any) => <Link to={`/results/${id}`} {...linkProps}/>;
  const PredictionsLink = (linkProps: any) => <Link to={`/predictions?tournament_id=${id}`} {...linkProps}/>;
  const renderBtn = (comp: React.ReactType, text: string) => (
    <Button
      size='small'
      className={classes.containedSecondary}
      component={comp}
      variant='contained'
      color='secondary'
    >
      {text}
    </Button>
  );

  return (
    <React.Fragment>
      {renderBtn(TableLink, dict.table)}
      {renderBtn(FixturesLink, dict.fixtures)}
      {renderBtn(ResultsLink, dict.results)}
      {renderBtn(PredictionsLink, dict.prediction)}
    </React.Fragment>
  );
});
