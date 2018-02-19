import {Reboot} from 'material-ui';
import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRouter from '../AppRouter/AppRouter';
import Header from '../Header/Header';

const App = () => (
    <Router>
        <div className='content'>
            <Reboot/>

            <Header/>

            <AppRouter/>
        </div>
    </Router>
);

export default App;
