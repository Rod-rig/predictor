import {TableCell, TableRow} from 'material-ui';
import * as React from 'react';

export interface IRow {
  [index: string]: string;
}

interface IProps {
  chars: string[];
  row: IRow;
}

export const Row = (props: IProps) => {
  return (
    <TableRow hover={true}>
      {
        props.chars.map((val, i): JSX.Element => (
          <TableCell key={i} padding='checkbox'>{props.row[val]}</TableCell>
        ))
      }
    </TableRow>
  );
};
