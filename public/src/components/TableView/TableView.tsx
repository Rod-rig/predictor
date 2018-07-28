import {createStyles, Paper, Table, TableBody, Theme, withStyles, WithStyles} from '@material-ui/core';
import {observer} from 'mobx-react';
import * as React from 'react';
import {Loader, Row, TableHeadView} from '../';
import {IGroup, ITable, ITeam} from '../../@types';

const styles = ({breakpoints, palette, spacing, typography}: Theme) => createStyles({
  group: {
    ...typography.title,
    backgroundColor: palette.secondary.main,
    color: palette.common.white,
    fontSize: '',
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px`,
  },
  paper: {
    marginBottom: spacing.unit,
    [breakpoints.up('lg')]: {
      margin: `0 ${spacing.unit * 3}px ${spacing.unit * 3}px`,
    },
  },
});

interface IProps extends WithStyles<typeof styles> {
  store: ITable;
}

export const TableView = withStyles(styles)(observer(class extends React.Component<IProps, {}> {
  public render() {
    const {classes, store} = this.props;

    return store.isLoaded ? (
      store.table.map((group: IGroup, key: number) => {
        return (
          <Paper key={key} className={classes.paper}>
            {group.name ?
              <div className={classes.group}>Group {group.name}</div> : /* istanbul ignore next */
              undefined}
            <Table>
              <TableHeadView
                order={store.table[key].order}
                sortName={store.table[key].sortName}
                sortHandle={store.sortHandler.bind(store, key)}
                chars={store.chars}
              />
              <TableBody>
                {
                  group.team_standings.map((row: ITeam, index: number): JSX.Element => (
                    <Row
                      key={index}
                      row={row}
                      chars={store.chars}
                    />
                  ))
                }
              </TableBody>
            </Table>
          </Paper>
        );
      })
    ) : (
      <Loader/>
    );
  }
}));
