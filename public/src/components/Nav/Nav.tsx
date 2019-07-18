import { Button, createStyles, Theme, withStyles } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import { dict } from "../../dict";

const styles = ({ spacing, palette, typography }: Theme) =>
  createStyles({
    containedSecondary: {
      marginRight: spacing(1),
      textTransform: "none",
    },
    link: {
      color: palette.primary.contrastText,
      fontSize: typography.fontSize,
      textDecoration: "none",
    },
    title: {
      display: "inline-block",
      marginLeft: spacing(2),
    },
  });

const compose = (...funcs: any[]) => {
  return funcs.reduce((a, b) => (...args: any[]) => a(b(...args)));
};

export const Nav = compose(
  withStyles(styles),
  withRouter,
)((props?: any) => {
  const { classes, match } = props;
  const { id } = match.params;

  const TableLink = React.forwardRef((linkProps: any, ref) => (
    <Link to={`/tournament/${id}`} ref={ref} {...linkProps} />
  ));

  const FixturesLink = React.forwardRef((linkProps: any, ref) => (
    <Link to={`/fixtures/${id}`} ref={ref} {...linkProps} />
  ));

  const ResultsLink = React.forwardRef((linkProps: any, ref) => (
    <Link to={`/results/${id}`} ref={ref} {...linkProps} />
  ));

  const PredictionsLink = React.forwardRef((linkProps: any, ref) => (
    <Link to={`/predictions?tournament_id=${id}`} ref={ref} {...linkProps} />
  ));

  const renderBtn = (comp: React.ReactType<ButtonProps>, text: string) => (
    <Button
      size="small"
      className={classes.containedSecondary}
      component={comp}
      variant="contained"
      color="secondary"
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
