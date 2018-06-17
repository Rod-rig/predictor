import {Table, TableBody} from '@material-ui/core';
import {observer} from 'mobx-react';
import * as React from 'react';
import {IRow, Loader, Row, TableHeadView} from '../';
import {ITable} from '../../@types';

@observer
export class TableView extends React.Component<{
  store: ITable,
}, {}> {
  public render() {
    const store = this.props.store;

    return store.isLoaded ? (
      <div>
        <Table>
          <TableHeadView
            order={store.order}
            sort={store.sort}
            sortHandle={store.sortHandler}
            chars={store.chars}
          />
          <TableBody>
            {
              store.table.map((row: IRow, index: number): JSX.Element => (
                <Row
                  key={index}
                  row={row}
                  chars={store.chars}
                />
              ))
            }
          </TableBody>
        </Table>
      </div>
    ) : (
      <Loader/>
    );
  }
}
