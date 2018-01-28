import React from 'react';
import table from 'Services/england-table';
import Row from '../Row/Row';

class TableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            table: [...table],
            sort: 'position'
        };
        this.sort = (e) => {
            this.setState({
                sort: e.target.textContent
            });
        };
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr onClick={this.sort}>
                            {
                                Object.keys(table[0]).map((title, index) => <td key={index}>{title}</td>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            table
                                .sort((a, b) => b[this.state.sort] > a[this.state.sort])
                                .map((row, index) => <Row
                                    key={index}
                                    row={row}/>)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableContainer;
