import {Table, TableBody} from 'material-ui';
import * as React from 'react';
import {IRow, Row} from '../Row/Row';
import TableHeadContainer from '../TableHeadContainer/TableHeadContainer';

interface IProps {
  table: object[];
}

interface IState {
  order: 'asc' | 'desc';
  sort: string;
  table: object[];
}

class TableContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      order: 'asc',
      sort: 'position',
      table: props.table,
    };
    this.sort = this.sort.bind(this);
  }

  public sort(e: any) {
    const key = e.target.textContent;
    if (this.state.sort === key) {
      this.setState({
        order: this.state.order === 'asc' ? 'desc' : 'asc',
      });
    } else {
      this.setState({
        order: 'asc',
        sort: e.target.textContent,
      });
    }
  }

  public render() {
    const state = this.state;
    const sortedTable = state.table.sort((a: any, b: any) => {
      if (this.state.order === 'asc') {
        return a[state.sort] - b[state.sort];
      } else {
        return b[state.sort] - a[state.sort];
      }
    });

    return (
      <div>
        <Table>
          <TableHeadContainer
            orderBy={Object.keys(state.table[0])}
            order={state.order}
            sort={state.sort}
            sortHandle={this.sort}
          />
          <TableBody>
            {
              sortedTable.map((row: IRow, index: number): JSX.Element => {
                return <Row
                  key={index}
                  row={row}
                />;
              })
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default TableContainer;
