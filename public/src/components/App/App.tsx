import {Reboot} from 'material-ui';
import * as React from 'react';
import Header from '../Header/Header';
import Palette from '../Palette/Palette';
import TableContainer from '../TableContainer/TableContainer';

const App = () => (
  <Palette>
    <Reboot/>
    <Header/>
    <TableContainer/>
  </Palette>
);

export default App;
