import {TableCell, TableRow} from 'material-ui';
import * as React from 'react';

export interface IRow {
  [index: string]: string;
}

interface IProps {
  row: IRow;
}

export const Row = (props: IProps) => {
  return (
    <TableRow hover={true}>
      <TableCell>{props.row.position}</TableCell>
      <TableCell>{props.row.teamName}</TableCell>
      <TableCell>{props.row.matches}</TableCell>
      <TableCell>{props.row.w}</TableCell>
      <TableCell>{props.row.d}</TableCell>
      <TableCell>{props.row.l}</TableCell>
      <TableCell>{props.row.goals}</TableCell>
      <TableCell>{props.row.points}</TableCell>
    </TableRow>
  );
};
