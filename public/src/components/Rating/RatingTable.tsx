import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import * as React from "react";

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

export const RatingTable = (props: IProps) => {
  const { onRequestSort, order, orderBy, rating } = props;
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
          {rating.map((u: IUser, index: number) => (
            <TableRow hover={true} key={`${u.name}-${u.stats.successRate}`}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.stats.totalPredictions}</TableCell>
              <TableCell>{u.stats.correctPredictions}</TableCell>
              <TableCell>{u.stats.successRate}</TableCell>
              <TableCell>{u.stats.oneXTwoSuccessRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
