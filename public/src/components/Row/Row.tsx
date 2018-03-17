import {TableCell, TableRow} from 'material-ui';
import * as React from 'react';

import './Row.css';

export interface IRow {
  [index: string]: string;
}

interface IProps {
  chars: string[];
  row: IRow;
}

export const Row = (props: IProps) => {
  return (
    <TableRow hover={true} className='row'>
      {
        props.chars.map((val, i): JSX.Element => (
          <TableCell key={i} padding='checkbox' className='row__cell'>{props.row[val]}</TableCell>
        ))
      }
    </TableRow>
  );
};
