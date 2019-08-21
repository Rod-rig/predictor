import {
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

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    highlight: {
      backgroundColor: palette.secondary.main,
      color: palette.common.white,
      fontWeight: "bold",
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
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell
              sortDirection={orderBy === "totalPredictions" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "totalPredictions"}
                direction={order}
                onClick={createSortHandler("totalPredictions")}
              >
                Total Predictions
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "correctPredictions" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "correctPredictions"}
                direction={order}
                onClick={createSortHandler("correctPredictions")}
              >
                Correct Predictions
              </TableSortLabel>
            </TableCell>
            <TableCell
              sortDirection={orderBy === "successRate" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "successRate"}
                direction={order}
                onClick={createSortHandler("successRate")}
              >
                Success Rate, %
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
                1X2 Success Rate, %
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
              <TableRow hover={true} key={`${u.name}-${u.stats.successRate}`}>
                <TableCell className={tdClassName}>{index + 1}</TableCell>
                <TableCell className={tdClassName}>{u.name}</TableCell>
                <TableCell className={tdClassName}>
                  {u.stats.totalPredictions}
                </TableCell>
                <TableCell className={tdClassName}>
                  {u.stats.correctPredictions}
                </TableCell>
                <TableCell className={tdClassName}>
                  {u.stats.successRate}
                </TableCell>
                <TableCell className={tdClassName}>
                  {u.stats.oneXTwoSuccessRate}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};
