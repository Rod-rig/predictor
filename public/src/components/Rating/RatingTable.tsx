import {
  Hidden,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Theme,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import * as React from "react";
import { dict } from "../../dict";
import { userStore } from "../../stores";
import {
  CORRECT_PREDICTIONS,
  ONEXTWO_SUCCESS_RATE,
  SUCCESS_RATE,
  TOTAL_PREDICTIONS,
} from "./constants";

export interface IUser {
  name: string;
  stats: {
    correctPredictions: number;
    oneXTwoSuccessRate: number;
    pendingPredictions: number;
    successRate: number;
    totalPredictions: number;
  };
  hasEnoughPredictions: boolean;
}

interface IProps {
  onRequestSort: any;
  order: "asc" | "desc";
  orderBy: string;
  rating: IUser[];
}

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) =>
  createStyles({
    highlight: {
      "& td": {
        backgroundColor: palette.secondary.main,
        color: palette.common.white,
        fontWeight: "bold",
      },
    },
    paper: {
      "& td, & th": {
        paddingRight: spacing(2),
        [breakpoints.down("xs")]: {
          padding: spacing(1),
        },
      },
      margin: spacing(1),
    },
  }),
);

export const RatingTable = (props: IProps) => {
  const { onRequestSort, order, orderBy, rating } = props;
  // @ts-ignore
  const classes = useStyles();

  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>,
  ) => {
    onRequestSort(event, property);
  };

  return (
    <Paper className={classes.paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{dict.rating.rank}</TableCell>
            <TableCell>{dict.rating.name}</TableCell>
            <Hidden xsDown={true}>
              <TableCell
                sortDirection={orderBy === TOTAL_PREDICTIONS ? order : false}
              >
                <TableSortLabel
                  active={orderBy === TOTAL_PREDICTIONS}
                  direction={order}
                  onClick={createSortHandler(TOTAL_PREDICTIONS)}
                >
                  <Hidden smDown={true}>{dict.rating.total}</Hidden>
                  <Hidden mdUp={true}>{dict.rating.totalAbbr}</Hidden>
                </TableSortLabel>
              </TableCell>
            </Hidden>
            <Hidden xsDown={true}>
              <TableCell
                sortDirection={orderBy === CORRECT_PREDICTIONS ? order : false}
              >
                <TableSortLabel
                  active={orderBy === CORRECT_PREDICTIONS}
                  direction={order}
                  onClick={createSortHandler(CORRECT_PREDICTIONS)}
                >
                  <Hidden smDown={true}>{dict.rating.correct}</Hidden>
                  <Hidden mdUp={true}>{dict.rating.correctAbbr}</Hidden>
                </TableSortLabel>
              </TableCell>
            </Hidden>
            <TableCell sortDirection={orderBy === SUCCESS_RATE ? order : false}>
              <TableSortLabel
                active={orderBy === SUCCESS_RATE}
                direction={order}
                onClick={createSortHandler(SUCCESS_RATE)}
              >
                <Hidden smDown={true}>{dict.rating.success}</Hidden>
                <Hidden mdUp={true}>{dict.rating.successAbbr}</Hidden>
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === SUCCESS_RATE ? order : false}>
              <TableSortLabel
                active={orderBy === ONEXTWO_SUCCESS_RATE}
                direction={order}
                onClick={createSortHandler(ONEXTWO_SUCCESS_RATE)}
              >
                <Hidden smDown={true}>{dict.rating.onextwo}</Hidden>
                <Hidden mdUp={true}>{dict.rating.onextwoAbbr}</Hidden>
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rating.map((u: IUser, index: number) => {
            const tdClassName = classNames({
              [classes.highlight]: u.name === userStore.name,
            });
            return (
              <TableRow
                className={tdClassName}
                hover={true}
                key={`${u.name}-${u.stats.successRate}`}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{u.name}</TableCell>
                <Hidden xsDown={true}>
                  <TableCell>{u.stats[TOTAL_PREDICTIONS]}</TableCell>
                </Hidden>
                <Hidden xsDown={true}>
                  <TableCell>{u.stats[CORRECT_PREDICTIONS]}</TableCell>
                </Hidden>
                <TableCell>{u.stats[SUCCESS_RATE]}</TableCell>
                <TableCell>{u.stats[ONEXTWO_SUCCESS_RATE]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};
