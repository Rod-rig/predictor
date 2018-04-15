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
  id: string;
  match: {
    params: {
      id: string;
    };
  };
}

class TableContainer extends React.Component<IProps, IState> {
  private id: string;
  constructor(props: IProps) {
    super(props);
    this.id = this.props.match.params.id ? this.props.match.params.id : this.props.id;
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

  public componentDidMount() {
    const tableUrl = `${ghUrl}/2017-2018/england/${this.props.match.params.id}/table.json`;
    axios.get(tableUrl)
      .then((res: AxiosResponse) => {
        this.setState({
          table: [...res.data],
        });
      })
      .catch(/* istanbul ignore next */(error) => {
        throw error;
      });
  }

  public render() {
    const chars = ['position', 'teamName', 'matches', 'w', 'd', 'l', 'goals for',
      'goals against', 'goal difference', 'points'];
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
          <TableBody>
            {
              sortedTable.map((row: IRow, index: number): JSX.Element => {
                return <Row
                  key={index}
                  row={row}
                  chars={chars}
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
