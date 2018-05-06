import {Avatar, TableCell, TableRow} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import * as React from 'react';

export interface IRow {
  logo?: string;
  [index: string]: string | number;
}

interface IProps {
  chars: string[];
  classes?: any;
  logo?: string;
  row: IRow;
}

const decorate = withStyles(({breakpoints, spacing}) => ({
  'cell': {
    '&:last-child': {
      [breakpoints.down('sm')]: {
        paddingRight: 0.75 * spacing.unit,
      },
    },
    'text-align': 'center',
    [breakpoints.down('sm')]: {
      paddingLeft: 0.75 * spacing.unit,
      paddingRight: 0.75 * spacing.unit,
    },
  },
  'd': {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  'goals-against': {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  'goals-for': {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  'img': {
    '& img': {
      'object-fit': 'contain',
    },
    'border-radius': 0,
    'display': 'inline-block',
    'height': 25,
    'marginRight': 5,
    'verticalAlign': 'middle',
    'width': 25,
  },
  'info': {
    alignItems: 'center',
    display: 'flex',
  },
  'l': {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  'matches': {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  'name': {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  'shortName': {
    display: 'inline',
    [breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  'teamName': {
    'text-align': 'left',
  },
  'w': {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

export const Row = decorate((props: IProps) => {
  const {classes, row} = props;
  return (
    <TableRow hover={true} className='row'>
      {
        props.chars.map((val, i): JSX.Element => {
          const rowClassName = val.split(' ').join('-');
          if (val !== 'teamName') {
            return (
              <TableCell
                key={i}
                padding='checkbox'
                className={`${classes.cell} ${classes[rowClassName] ? classes[rowClassName] : ''}`}
              >
                {row[val]}
              </TableCell>
            );
          } else {
            return (
              <TableCell key={i} padding='checkbox' className={`${classes.cell} ${classes.teamName}`}>
                <div className={classes.info}>
                  <Avatar
                    src={row.logo}
                    alt={row[val] + '\'s logo'}
                    className={classes.img}
                  />
                  <span className={classes.name}>{row[val]}</span>
                  <span className={classes.shortName}>{row.shortName}</span>
                </div>
              </TableCell>
            );
          }
        })
      }
    </TableRow>
  );
});
