import {Reboot} from 'material-ui';
import * as React from 'react';
import Header from '../Header/Header';
import Prediction from '../Prediction/Prediction';
import TableContainer from '../TableContainer/TableContainer';

const table = require('../../services/england-table.json');

export default class App extends React.Component {
    public render() {
        return (
            <div className='content'>
                <Reboot/>
                <Header/>

                <TableContainer table={table}/>

                <form action='/predictions' method='post' style={{display: 'none'}}>
                    <input type='hidden' value={1} name='matchday'/>
                    <Prediction/>
                </form>
            </div>
        );
    }
}
