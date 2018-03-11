import {CssBaseline} from 'material-ui';
import * as React from 'react';
import Header from '../Header/Header';
import Palette from '../Palette/Palette';
import TableContainer from '../TableContainer/TableContainer';

const App = () => (
  <Palette>
    <CssBaseline/>
    <Header/>
    <TableContainer/>
  </Palette>
);

export default App;
