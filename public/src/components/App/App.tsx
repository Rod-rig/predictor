import {CssBaseline, withStyles} from '@material-ui/core';
import * as React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {IId, ITableProps} from '../../@types';
import {MatchListStore, TableStore, TournamentListStore} from '../../stores';
import Header from '../Header/Header';
import MatchList from '../MatchList/MatchList';
import Nav from '../Nav/Nav';
import NotFound from '../NotFound/NotFound';
import Palette from '../Palette/Palette';
import TableView from '../TableView/TableView';
import TournamentList from '../TournamentList/TournamentList';

const decorate = withStyles(({typography}) => ({
  main: {
    fontFamily: typography.fontFamily,
  },
}));

const tournamentList = () => (
  <TournamentList store={new TournamentListStore()}/>
);

const table = (props: ITableProps & { match: IId }) => (
  <TableView
    store={new TableStore({
      chars: ['rank', 'team', 'played', 'win', 'draw', 'loss', 'goals_for',
        'goals_against', 'goal_diff', 'points'],
      id: props.match.params.id,
      order: 'asc',
      sort: 'rank',
    })}
  />
);

const results = (props: any) => (
  <MatchList
    store={new MatchListStore({
      id: props.match.params.id,
      type: 'results',
    })}
    {...props}
  />
);

const fixtures = (props: any) => (
  <MatchList
    store={new MatchListStore({
      id: props.match.params.id,
      type: 'fixtures',
    })}
    {...props}
  />
);

const routes = [
  {
    component: tournamentList,
    exact: true,
    path: '/',
  },
  {
    component: table,
    path: '/tournament/:id',
  },
  {
    component: results,
    path: '/results/:id',
  },
  {
    component: fixtures,
    path: '/fixtures/:id',
  },
  {
    component: NotFound,
  },
];

const App = ({classes}: any) => (
  <div className={classes.main}>
    <Palette>
      <CssBaseline/>
      <HashRouter>
        <React.Fragment>
          <Header>
            <Route path='/:title/:id' component={Nav}/>
          </Header>

          <Switch>
            {
              routes.map((route, index: number) => (
                <Route
                  key={index}
                  exact={route.exact}
                  component={route.component}
                  path={route.path}
                />
              ))
            }
          </Switch>
        </React.Fragment>
      </HashRouter>
    </Palette>
  </div>
);

export default decorate(App);
