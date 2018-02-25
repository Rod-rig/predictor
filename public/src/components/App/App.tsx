import {Reboot} from 'material-ui';
import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRouter from '../AppRouter/AppRouter';
import Header from '../Header/Header';
import Palette from '../Palette/Palette';

const App = () => (
  <Palette>
    <Reboot/>

    <Router>
      <div>
        <Header/>

        <AppRouter/>
      </div>
    </Router>
  </Palette>
);

export default App;
