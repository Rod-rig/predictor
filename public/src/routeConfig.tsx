import * as React from "react";
import { match, RouteComponentProps, RouteProps } from "react-router-dom";
import { IPredictionStore, IStatsProps, ITableProps } from "./@types";
import {
  Account,
  FixturesList,
  Login,
  MatchDetails,
  MatchList,
  NotFound,
  Prediction,
  Rating,
  Registration,
  Stats,
  TableView,
  TournamentList,
} from "./components";
import {
  DataRetriever,
  loginStore,
  PredictionStore,
  registrationStore,
  StatsStore,
  TableStore,
  TournamentListStore,
} from "./stores";

type IId = match<{ id: string }>;

const tournamentList = () => (
  <TournamentList store={new TournamentListStore()} />
);

/* istanbul ignore next */
const table = (props: ITableProps & { match: IId }) => (
  <TableView
    store={
      new TableStore({
        chars: [
          "rank",
          "team",
          "played",
          "win",
          "draw",
          "loss",
          "goals_for",
          "goals_against",
          "goal_diff",
          "points",
        ],
        id: props.match.params.id,
        // order: 'asc',
        // sortName: 'rank',
        // range: [0, 5],
      })
    }
  />
);

/* istanbul ignore next */
const results = (props: { match: IId }) => (
  <MatchList
    store={
      new DataRetriever({
        url: `/api/results/${props.match.params.id}`,
      })
    }
    {...props}
  />
);

/* istanbul ignore next */
const fixtures = (props: { match: IId }) => (
  <FixturesList
    store={
      new DataRetriever({
        url: `/api/tournament-schedule/${props.match.params.id}`,
      })
    }
    {...props}
  />
);

/* istanbul ignore next */
const predictions = (props: IPredictionStore & RouteProps) => (
  <Prediction
    store={
      new PredictionStore({
        filter: props.location.search,
      })
    }
  />
);

const login = () => <Login store={loginStore} />;

const registration = () => <Registration store={registrationStore} />;

/* istanbul ignore next */
const stats = (props: IStatsProps & { match: IId }) => {
  return (
    <Stats
      store={
        new StatsStore({
          url: "/predictions",
        })
      }
      {...props}
    />
  );
};

const matchDetails = (props: RouteComponentProps<{ id: string }>) => (
  <MatchDetails id={props.match.params.id} />
);

const rating = () => <Rating />;

export const routes = [
  {
    component: tournamentList,
    exact: true,
    path: "/",
  },
  {
    component: login,
    exact: true,
    path: "/login",
  },
  {
    component: registration,
    path: "/registration",
  },
  {
    component: table,
    path: "/tournament/:id",
  },
  {
    component: results,
    path: "/results/:id",
  },
  {
    component: fixtures,
    path: "/fixtures/:id",
  },
  {
    component: predictions,
    isProtected: true,
    path: "/predictions",
  },
  {
    component: Account,
    isProtected: true,
    path: "/account",
  },
  {
    component: stats,
    isProtected: true,
    path: "/stats",
  },
  {
    component: matchDetails,
    path: "/match/:id",
  },
  {
    component: rating,
    exact: true,
    path: "/rating",
  },
  {
    component: NotFound,
  },
];
