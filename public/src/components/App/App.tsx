import {CssBaseline, Theme, withStyles} from '@material-ui/core';
import * as React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Header, Nav, Palette} from '../';
import {routes} from '../../routeConfig';

const decorate = withStyles(({typography}: Theme) => ({
  main: {
    fontFamily: typography.fontFamily,
  },
}));

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
