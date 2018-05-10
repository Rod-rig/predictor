import {Table, TableBody} from 'material-ui';
import {observer} from 'mobx-react';
import * as React from 'react';
import {ITable} from '../../@types';
import {Loader} from '../Loader/Loader';
import {IRow, Row} from '../Row';
import TableHeadView from '../TableHeadView/TableHeadView';

@observer
class TableView extends React.Component<{
  store: ITable,
}, {}> {
  public render() {
    const props = this.props.store;

    return props.isLoaded ? (
      <div>
        <Table>
          <TableHeadView
            order={props.order}
            sort={props.sort}
            sortHandle={props.sortHandler}
            chars={props.chars}
          />
          <TableBody>
            {
              props.table.map((row: IRow, index: number): JSX.Element => (
                <Row
                  key={index}
                  row={row}
                  chars={props.chars}
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

export default TableView;
