import {Avatar, TableCell, TableRow} from 'material-ui';
import * as React from 'react';

import './Row.css';

export interface IRow {
  [index: string]: string;
}

interface IProps {
  chars: string[];
  logo?: string;
  row: IRow;
}

export const Row = (props: IProps) => {
  return (
    <TableRow hover={true} className='row'>
      {
        props.chars.map((val, i): JSX.Element => {
          if (val !== 'teamName') {
            return (
              <TableCell key={i} padding='checkbox' className='row__cell'>{props.row[val]}</TableCell>
            );
          } else {
            return (
              <TableCell key={i} padding='checkbox' className='row__cell'>
                <div className='row__info'>
                  <Avatar
                    src={props.row.logo}
                    alt={props.row[val] + '\'s logo'}
                    className='row__img'
                  />
                  <span className='row__name'>{props.row[val]}</span>
                  <span className='row__shortname'>{props.row.shortName}</span>
                </div>
              </TableCell>
            );
          }
        })
      }
    </TableRow>
  );
};
