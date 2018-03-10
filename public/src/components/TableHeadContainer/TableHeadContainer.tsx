import {TableCell, TableHead, TableRow, TableSortLabel, Tooltip} from 'material-ui';
import * as React from 'react';

interface IHead {
  order?: any;
  sort?: string;
  sortHandle?: any;
  chars: string[];
}

const TableHeadContainer = (props: IHead) => {
  return (
    <TableHead>
      <TableRow>
        {props.chars.map(
          (name: string, index: number) => (
            <TableCell
              key={index}
              sortDirection={props.order === 'asc' ? 'desc' : 'asc'}
              padding='checkbox'
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
