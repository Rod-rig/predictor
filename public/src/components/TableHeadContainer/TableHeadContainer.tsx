import {TableCell, TableHead, TableRow, TableSortLabel, Tooltip} from 'material-ui';
import * as React from 'react';

interface IHead {
  orderBy: string[];
  order?: any;
  sort?: string;
  sortHandle?: any;
}

const TableHeadContainer = (props: IHead) => {
  return (
    <TableHead>
      <TableRow>
        {props.orderBy.map(
          (name: string, index: number) => (
            <TableCell key={index} sortDirection={props.order === 'asc' ? 'desc' : 'asc'}>
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
