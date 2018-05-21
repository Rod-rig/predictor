import {TableCell, TableHead, TableRow, TableSortLabel, Tooltip} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import * as React from 'react';

interface IHead {
  chars: string[];
  classes?: any;
  order?: any;
  sort?: string;
  sortHandle?: any;
}

const decorate = withStyles(({breakpoints, spacing}) => ({
  cell: {
    '& svg': {
      margin: `${-spacing.unit}px 0 0`,
      position: 'absolute' as 'absolute',
      right: -2 * spacing.unit,
      top: '50%',
    },
    '&:last-child': {
      [breakpoints.down('sm')]: {
        paddingRight: 0.75 * spacing.unit,
      },
    },
    'min-width': 90,
    'text-align': 'center',
    [breakpoints.down('sm')]: {
      minWidth: 80,
      paddingLeft: 0.75 * spacing.unit,
      paddingRight: 0.75 * spacing.unit,
    },
    [breakpoints.down('xs')]: {
      minWidth: 70,
      paddingRight: 0.75 * spacing.unit,
    },
  },
  draw: {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  goals_against: {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  goals_for: {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  loss: {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  played: {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  rank: {
    width: 80,
  },
  team: {
    'min-width': 0,
    'text-align': 'left',
    'width': '100%',
    [breakpoints.down('xs')]: {
      width: 70,
    },
  },
  win: {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

const TableHeadView = decorate((props: IHead) => {
  const {chars, classes, order, sort, sortHandle} = props;
  return (
    <TableHead>
      <TableRow>
        {chars.map(
          (name: string, index: number) => {
            return <TableCell
              key={index}
              sortDirection={order === 'asc' ? 'desc' : 'asc'}
              padding='checkbox'
              className={`${classes.cell} ${classes[name] ? classes[name] : ''}`}
              type='head'
            >
              <Tooltip title='Sort' enterDelay={300}>
                <TableSortLabel
                  active={sort === name}
                  direction={order}
                  onClick={sortHandle}
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
});

export default TableHeadView;
