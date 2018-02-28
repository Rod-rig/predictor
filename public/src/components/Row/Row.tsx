import {TableCell, TableRow} from 'material-ui';
import * as React from 'react';

export interface IRow {
  [index: string]: string;
}

interface IProps {
  row: IRow;
}

export const Row = (props: IProps) => {
  const keys = Object.keys(props.row);
  return (
    <TableRow hover={true}>
      {
        keys.map((val, i) => (
          <TableCell key={i}>{props.row[val]}</TableCell>
        ))
      }
    </TableRow>
  );
};
