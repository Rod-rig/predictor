import axios, {AxiosResponse} from 'axios';
import {Table, TableBody} from 'material-ui';
import * as React from 'react';
import {IRow, Row} from '../Row/Row';
import TableHeadContainer from '../TableHeadContainer/TableHeadContainer';

const ghUrl: string = 'https://raw.githubusercontent.com/Rod-rig/epl-data/master';

interface IState {
  order: 'asc' | 'desc';
  sort: string;
  table: object[];
}

interface IProps {
  chars: string[];
  id?: string;
  match?: {
    params: {
      id: string;
    };
  };
  range?: number[];
}

class TableContainer extends React.Component<IProps, IState> {
  private readonly id: string;
  private readonly range: number[] | null;
  constructor(props: IProps) {
    super(props);
    this.id = this.props.match ? this.props.match.params.id : this.props.id;
    this.range = this.props.range ? this.props.range : null;
    this.state = {
      order: 'asc',
      sort: 'position',
      table: [],
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

  public rangeData(data: any[], from: number, to: number) {
    if (from > to) {
      [from, to] = [to, from];
    }
    const dataSize: number = data.length;
    if (from > dataSize) {
      return data;
    }
    from = from > 0 ? from - 1 : 0;
    to = to < dataSize ? to : dataSize;
    return data.slice(from, to);
  }

  public componentDidMount() {
    const tableUrl = `${ghUrl}/2017-2018/england/${this.id}/table.json`;
    axios.get(tableUrl)
      .then((res: AxiosResponse) => {
        this.setState({
          table: this.range ? [...this.rangeData(res.data, this.range[0], this.range[1])] : [...res.data],
        });
      })
      .catch(/* istanbul ignore next */(error) => {
        throw error;
      });
  }

  public renderBody(rows: object[], chars: string[]): JSX.Element[] {
    return rows.map((row: IRow, index: number): JSX.Element => (
      <Row
        key={index}
        row={row}
        chars={chars}
      />
    ));
  }

  public render() {
    const chars = this.props.chars;
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
            order={state.order}
            sort={state.sort}
            sortHandle={this.sort}
            chars={chars}
          />
          <TableBody>{this.renderBody(sortedTable, chars)}</TableBody>
        </Table>
      </div>
    );
  }
}

export default TableContainer;
