import {CircularProgress, createStyles, Theme, WithStyles} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import * as React from 'react';

const styles = ({spacing}: Theme) => createStyles({
  root: {
    left: '50%',
    marginLeft: -5 * spacing.unit / 2,
    marginTop: -5 * spacing.unit / 2,
    position: 'absolute',
    top: '50%',
  },
});

interface IProps extends WithStyles<typeof styles> {}

export const Loader = withStyles(styles)((props: IProps) => (
  <CircularProgress classes={{root: props.classes.root}}/>
));
