import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import * as React from "react";

interface IProps {
  homeTeamStats: {
    [key: string]: number;
  };
  awayTeamStats: {
    [key: string]: number;
  };
}

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    stats: {
      fontWeight: "bold",
    },
    statsActive: {
      color: palette.secondary.main,
    },
    td: {
      fontSize: "1rem",
      padding: spacing(1),
      textAlign: "center",
      width: `${100 / 3}%`,
    },
  }),
);

export const MatchDetailsStat = (props: IProps) => {
  const { homeTeamStats, awayTeamStats } = props;
  // @ts-ignore
  const classes = useStyles();
  return (
    <Table>
      <TableBody>
        {Object.keys(homeTeamStats).map(key => {
          const label =
            key[0].toUpperCase() +
            key
              .slice(1)
              .split("_")
              .join(" ");
          const homeClassName = classNames(classes.td, classes.stats, {
            [classes.statsActive]: homeTeamStats[key] > awayTeamStats[key],
          });
          const awayClassName = classNames(classes.td, classes.stats, {
            [classes.statsActive]: homeTeamStats[key] < awayTeamStats[key],
          });
          return (
            <TableRow key={key}>
              <TableCell className={homeClassName}>
                {homeTeamStats[key]}
              </TableCell>
              <TableCell className={classes.td}>{label}</TableCell>
              <TableCell className={awayClassName}>
                {awayTeamStats[key]}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
