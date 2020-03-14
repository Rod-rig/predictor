import { Button, createStyles, Theme, withStyles } from "@material-ui/core";
import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import { dict } from "../../dict";

const styles = ({ breakpoints, spacing, palette, typography }: Theme) =>
  createStyles({
    button: {
      "&:last-child": {
        marginRight: 0,
      },
      backgroundColor: palette.common.white,
      boxShadow: "none",
      color: palette.primary.main,
      fontSize: "1.15em",
      marginRight: spacing(1),
      padding: spacing(0.5, 2, 0.25),
      textTransform: "none",
      [breakpoints.down("sm")]: {
        marginBottom: spacing(1),
      },
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

  const TableLink = (linkProps: any) => (
    <Link to={`/tournament/${id}`} {...linkProps} />
  );

  const FixturesLink = (linkProps: any) => (
    <Link to={`/fixtures/${id}`} {...linkProps} />
  );

  const ResultsLink = (linkProps: any) => (
    <Link to={`/results/${id}`} {...linkProps} />
  );

  const PredictionsLink = (linkProps: any) => (
    <Link to={`/predictions?tournament_id=${id}`} {...linkProps} />
  );

  const renderBtn = (comp: React.ElementType, text: string) => (
    <Button
      size="small"
      className={classes.button}
      component={comp}
      variant="contained"
      color="default"
    >
      {text}
    </Button>
  );

  return (
    <div>
      {renderBtn(TableLink, dict.table)}
      {renderBtn(FixturesLink, dict.fixtures)}
      {renderBtn(ResultsLink, dict.results)}
      {renderBtn(PredictionsLink, dict.prediction)}
    </div>
  );
});
