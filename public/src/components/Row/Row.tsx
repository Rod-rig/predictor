import {Avatar, TableCell, TableRow, withStyles} from '@material-ui/core';
import * as React from 'react';

export interface IRow {
  logo?: string;
  [index: string]: any;
}

interface IProps {
  chars: string[];
  classes?: any;
  logo?: string;
  row: IRow;
}

const decorate = withStyles(({breakpoints, spacing}) => ({
  cell: {
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
  img: {
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
  info: {
    alignItems: 'center',
    display: 'flex',
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
  // shortName: {
  //   display: 'inline',
  //   [breakpoints.up('sm')]: {
  //     display: 'none',
  //   },
  // },
  team: {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  teamName: {
    'text-align': 'left',
  },
  win: {
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
          if (val !== 'team') {
            return (
              <TableCell
                key={i}
                padding='checkbox'
                className={`${classes.cell} ${classes[val] ? classes[val] : ''}`}
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
                  <span className={classes.team}>{row.team.name}</span>
                  {/*<span className={classes.shortName}>{row.shortName}</span>*/}
                </div>
              </TableCell>
            );
          }
        })
      }
    </TableRow>
  );
});
