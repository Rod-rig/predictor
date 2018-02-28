import {Reboot} from 'material-ui';
import * as React from 'react';
import Header from '../Header/Header';
import Palette from '../Palette/Palette';
import TableContainer from '../TableContainer/TableContainer';

const table = require('../../services/england-table.json');

const App = () => (
  <Palette>
    <Reboot/>
    <Header/>
    <TableContainer table={table}/>
  </Palette>
);

export default App;
