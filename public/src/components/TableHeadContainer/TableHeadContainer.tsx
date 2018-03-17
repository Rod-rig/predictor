import {TableCell, TableHead, TableRow, TableSortLabel, Tooltip} from 'material-ui';
import * as React from 'react';

import './TableHeadContainer.css';

interface IHead {
  order?: any;
  sort?: string;
  sortHandle?: any;
  chars: string[];
}

const TableHeadContainer = (props: IHead) => {
  return (
    <TableHead className='table-head'>
      <TableRow>
        {props.chars.map(
          (name: string, index: number) => (
            <TableCell
              key={index}
              sortDirection={props.order === 'asc' ? 'desc' : 'asc'}
              padding='checkbox'
              className='table-head__cell'
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
            </TableCell>
          ),
        )}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadContainer;
