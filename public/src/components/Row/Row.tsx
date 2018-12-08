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

const decorate = withStyles(({breakpoints, palette, spacing}) => ({
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
  edge: {
    '& td': {
      borderColor: palette.grey[50],
    },
    'backgroundColor': palette.grey[300],
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
  middle: {
    backgroundColor: palette.grey[200],
  },
  played: {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  row: {
    backgroundColor: palette.common.white,
  },
  // shortName: {
  //   display: 'inline',
  //   [breakpoints.up('sm')]: {
  //     display: 'none',
  //   },
  // },
  // team: {
  //   [breakpoints.down('xs')]: {
  //     display: 'none',
  //   },
  // },
  teamName: {
    'text-align': 'left',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  top: {
    backgroundColor: palette.grey[400],
  },
  win: {
    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

const renderAvatar = (logo: string, altText: string, className: string) => {
  return logo ? (
    <Avatar src={logo} alt={altText + '\'s logo'} className={className}/>
  ) : undefined;
};

const highlightCell = (stage: string) => {
  if (stage === 'Champions League' || stage === 'Champions League Qualification' || stage === 'Relegation') {
    return 'edge';
  } else if (stage === 'Europa League' || stage === 'Europa League Qualification' || stage === 'Playoffs') {
    return 'middle';
  } else {
    return 'row';
  }
};

export const Row = decorate((props: IProps) => {
  const {classes, row} = props;
  const rowClass = highlightCell(row.current_outcome);
  const topClass = row.rank === 1 && row.current_outcome !== 'Playoffs' ? classes.top : '';
  const rowProps = {
    className: `${classes[rowClass]} ${topClass}`,
    hover: !row.current_outcome,
  };
  return (
    <TableRow {...rowProps}>
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
                  {renderAvatar(row.logo, row[val], classes.img)}
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
