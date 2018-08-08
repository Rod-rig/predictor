import {CssBaseline, Theme, withStyles} from '@material-ui/core';
import * as React from 'react';
import {HashRouter, match, Route, RouteProps, Switch} from 'react-router-dom';
import {Header, Login, MatchList, Nav, NotFound, Palette, Prediction, TableView, TournamentList} from '../';
import {IMatchListProps, IPredictionStore, ITableProps} from '../../@types';
import {MatchListStore, PredictionStore, TableStore, TournamentListStore} from '../../stores';

type IId = match<{ id: string }>;

const decorate = withStyles(({typography}: Theme) => ({
  main: {
    fontFamily: typography.fontFamily,
  },
}));

const tournamentList = () => <TournamentList store={new TournamentListStore()}/>;

/* istanbul ignore next */
const table = (props: ITableProps & { match: IId }) => (
  <TableView
    store={new TableStore({
      chars: ['rank', 'team', 'played', 'win', 'draw', 'loss', 'goals_for',
        'goals_against', 'goal_diff', 'points'],
      id: props.match.params.id,
      // order: 'asc',
      // sortName: 'rank',
      // range: [0, 5],
    })}
  />
);

/* istanbul ignore next */
const results = (props: IMatchListProps & { match: IId }) => (
  <MatchList
    store={new MatchListStore({
      id: props.match.params.id,
      type: 'results',
    })}
    {...props}
  />
);

/* istanbul ignore next */
const fixtures = (props: IMatchListProps & { match: IId }) => (
  <MatchList
    store={new MatchListStore({
      id: props.match.params.id,
      type: 'fixtures',
    })}
    {...props}
  />
);

/* istanbul ignore next */
const predictions = (props: IPredictionStore & RouteProps) => (
  <Prediction
    store={new PredictionStore({
      filter: props.location.search,
    })}
  />
);

const routes = [
  {
    component: tournamentList,
    exact: true,
    path: '/',
  },
  {
    component: Login,
    path: '/login',
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
    component: predictions,
    path: '/predictions',
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
