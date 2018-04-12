import {CssBaseline} from 'material-ui';
import * as React from 'react';
import Header from '../Header/Header';
import Palette from '../Palette/Palette';
import TableContainer from '../TableContainer/TableContainer';
import TournamentList from '../TournamentList/TournamentList';

const App = () => (
  <Palette>
    <CssBaseline/>
    <Header/>
    <TableContainer/>
    <TournamentList/>
  </Palette>
);

export default App;
