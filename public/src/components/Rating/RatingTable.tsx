import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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

export const RatingTable = (props: { rating: IUser[] }) => {
  const { rating } = props;

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Total Predictions</TableCell>
            <TableCell>Correct Predictions</TableCell>
            <TableCell>Success Rate, %</TableCell>
            <TableCell>1X2 Success Rate, %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rating.map((u: IUser, index: number) => (
            <TableRow key={`${u.name}-${u.stats.successRate}`}>
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
