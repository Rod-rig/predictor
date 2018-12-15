import {Avatar, ListItemIcon, WithStyles, withStyles} from '@material-ui/core';
import * as React from 'react';
import {logos} from '../../content/logos';

const styles = {
  logo: {
    '& img': {
      'object-fit': 'contain',
    },
    'border-radius': 0,
    'height': '1.25em',
    'width': '1.25em',
  },
};

interface IProps extends WithStyles<typeof styles> {
  teamName: string;
  modClass?: string;
}

export const TeamLogo = withStyles(styles)(({classes, teamName, modClass}: IProps) => {
  if (teamName in logos) {
    return (
      <ListItemIcon className={modClass}>
        <Avatar src={logos[teamName]} className={classes.logo}/>
      </ListItemIcon>
    );
  }
});
