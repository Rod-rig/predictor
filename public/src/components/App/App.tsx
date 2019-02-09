import {createStyles, CssBaseline, Theme, withStyles} from '@material-ui/core';
import * as React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Header, Palette, PrivateRoute} from '../';
import {routes} from '../../routeConfig';

const styles = ({typography}: Theme) => createStyles({
  main: {
    fontFamily: typography.fontFamily,
  },
});

export const App = withStyles(styles)((props: any) => {
  return (
    <div className={props.classes.main}>
      <Palette>
        <CssBaseline/>
        <HashRouter>
          <React.Fragment>
            <Header/>
            <Switch>
              {
                routes.map((route, index: number) => {
                  const Component = route.isProtected ? PrivateRoute : Route;
                  return (
                    <Component
                      key={index}
                      exact={route.exact}
                      component={route.component}
                      path={route.path}
                    />
                  );
                })
              }
            </Switch>
          </React.Fragment>
        </HashRouter>
      </Palette>
    </div>
  );
});
