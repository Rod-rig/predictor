import * as React from 'react';
import table from "../../services/england-table.json";
import {IRow, Row} from '../Row/Row';

interface IState {
    order: string;
    sort: string;
    table: object[];
}

class TableContainer extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            order: 'asc',
            sort: 'position',
            table: [...table],
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
        const sortedTable = table.sort((a: any, b: any) => {
            if (this.state.order === 'asc') {
                return a[state.sort] - b[state.sort];
            } else {
                return b[state.sort] - a[state.sort];
            }
        });

        return (
            <div>
                <table>
                    <thead>
                        <tr onClick={this.sort}>
                            {Object.keys(table[0]).map(
                                (title: string, index: number): JSX.Element => <td key={index}>{title}</td>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedTable.map((row: IRow, index: number): JSX.Element => {
                                return <Row
                                    key={index}
                                    row={row}
                                />;
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableContainer;
