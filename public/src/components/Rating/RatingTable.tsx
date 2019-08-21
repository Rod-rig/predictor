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
import { userStore } from "../../stores";

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
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <Hidden xsDown={true}>
              <TableCell
                sortDirection={orderBy === "totalPredictions" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "totalPredictions"}
                  direction={order}
                  onClick={createSortHandler("totalPredictions")}
                >
                  <Hidden smDown={true}>Total Predictions</Hidden>
                  <Hidden mdUp={true}>TP</Hidden>
                </TableSortLabel>
              </TableCell>
            </Hidden>
            <Hidden xsDown={true}>
              <TableCell
                sortDirection={orderBy === "correctPredictions" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "correctPredictions"}
                  direction={order}
                  onClick={createSortHandler("correctPredictions")}
                >
                  <Hidden smDown={true}>Correct Predictions</Hidden>
                  <Hidden mdUp={true}>CP</Hidden>
                </TableSortLabel>
              </TableCell>
            </Hidden>
            <TableCell
              sortDirection={orderBy === "successRate" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "successRate"}
                direction={order}
                onClick={createSortHandler("successRate")}
              >
                <Hidden smDown={true}>Success Rate, %</Hidden>
                <Hidden mdUp={true}>SR</Hidden>
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "successRate" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "oneXTwoSuccessRate"}
                direction={order}
                onClick={createSortHandler("oneXTwoSuccessRate")}
              >
                <Hidden smDown={true}>1X2 Success Rate, %</Hidden>
                <Hidden mdUp={true}>1X2</Hidden>
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
                  <TableCell>{u.stats.totalPredictions}</TableCell>
                </Hidden>
                <Hidden xsDown={true}>
                  <TableCell>{u.stats.correctPredictions}</TableCell>
                </Hidden>
                <TableCell>{u.stats.successRate}</TableCell>
                <TableCell>{u.stats.oneXTwoSuccessRate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};
