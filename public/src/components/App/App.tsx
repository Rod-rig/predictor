import {CssBaseline} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import * as React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {IId, ITableProps} from '../../@types';
import {MatchListStore, TableStore, TournamentListStore} from '../../stores';
import Header from '../Header/Header';
import MatchList from '../MatchList/MatchList';
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

const table = (props: ITableProps & {match: IId}) => (
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
      type: 'results',
    })}
    {...props}
  />
);

const fixtures = (props: any) => (
  <MatchList
    store={new MatchListStore({
      type: 'fixtures',
    })}
    {...props}
  />
);

const App = ({classes}: any) => (
  <div className={classes.main}>
    <Palette>
      <CssBaseline/>
      <HashRouter>
        <React.Fragment>
          <Header/>

          <Switch>
            <Route exact={true} path='/' component={tournamentList}/>
            <Route path='/tournament/:id' component={table}/>
            <Route path='/results/:id' component={results}/>
            <Route path='/fixtures/:id' component={fixtures}/>
            <Route component={NotFound}/>
          </Switch>
        </React.Fragment>
      </HashRouter>
    </Palette>
  </div>
);

export default decorate(App);
