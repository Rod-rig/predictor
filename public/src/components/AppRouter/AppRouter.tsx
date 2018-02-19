import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import Prediction from '../Prediction/Prediction';
import TableContainer from '../TableContainer/TableContainer';

const table = require('../../services/england-table.json');

interface IStat {
    match: {
        params: {
            id: string;
        };
    };
}

const tableRouteCmp = () => <TableContainer table={table}/>;
const statRouteCmp = (stat: IStat) => <div>{'Statistics of ' + stat.match.params.id}</div>;

const AppRouter = () => (
    <div>
        <Switch>
            <Route exact={true} path='/' component={tableRouteCmp}/>
            <Route path='/predictions' component={Prediction}/>
            <Route path={'/statistics/:id'} component={statRouteCmp}/>
            <Route component={NotFound}/>
        </Switch>
    </div>
);

export default AppRouter;
