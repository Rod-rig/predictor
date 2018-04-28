import {TableCell, TableHead, TableRow, TableSortLabel, Tooltip} from 'material-ui';
import * as React from 'react';

import './TableHeadContainer.css';

interface IHead {
  chars: string[];
  order?: any;
  sort?: string;
  sortHandle?: any;
}

const TableHeadContainer = (props: IHead) => {
  return (
    <TableHead className='table-head'>
      <TableRow>
        {props.chars.map(
          (name: string, index: number) => {
            const thClassName = name.split(' ').join('-');
            return <TableCell
              key={index}
              sortDirection={props.order === 'asc' ? 'desc' : 'asc'}
              padding='checkbox'
              className={`table-head__cell table-head__${thClassName}`}
              type='head'
            >
              <Tooltip title='Sort' enterDelay={300}>
                <TableSortLabel
                  active={props.sort === name}
                  direction={props.order}
                  onClick={props.sortHandle}
                >
                  {name}
                </TableSortLabel>
              </Tooltip>
            </TableCell>;
          },
        )}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadContainer;
