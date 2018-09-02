import * as React from 'react';
import {match, RouteProps} from 'react-router-dom';
import {IMatchListProps, IPredictionStore, ITableProps} from './@types';
import {Login, MatchList, NotFound, Prediction, Registration, TableView, TournamentList} from './components';
import {
  loginStore,
  MatchListStore,
  PredictionStore,
  registrationStore,
  TableStore,
  TournamentListStore,
} from './stores';

type IId = match<{ id: string }>;

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

const login = () => <Login store={loginStore}/>;

const registration = () => <Registration store={registrationStore}/>;

export const routes = [
  {
    component: tournamentList,
    exact: true,
    path: '/',
  },
  {
    component: login,
    exact: true,
    path: '/login',
    title: 'Login',
  },
  {
    component: registration,
    path: '/registration',
    title: 'Registration',
  },
  {
    component: table,
    path: '/tournament/:id',
    title: 'Tournament table',
  },
  {
    component: results,
    path: '/results/:id',
    title: 'Results',
  },
  {
    component: fixtures,
    path: '/fixtures/:id',
    title: 'Fixtures',
  },
  {
    component: predictions,
    path: '/predictions',
    title: 'Predictions',
  },
  {
    component: NotFound,
  },
];
