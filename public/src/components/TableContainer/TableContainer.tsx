import * as React from 'react';
import table from "../../services/england-table.json";
import {IRow, Row} from '../Row/Row';

interface IState {
    sort: string;
    table: object[];
}

class TableContainer extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            sort: 'position',
            table: [...table],
        };
        this.sort = this.sort.bind(this);
    }
    public sort(e: any) {
        this.setState({
            sort: e.target.textContent,
        });
    }

    public render() {
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
                            table
                                .map((row: IRow, index: number): JSX.Element => <Row
                                    key={index}
                                    row={row}
                                />)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableContainer;
