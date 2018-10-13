import {Typography} from '@material-ui/core';
import * as React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {routes} from '../../routeConfig';

const Title = (title: string) => {
  return (
    <Typography variant='h6' color='inherit'>
      {title}
    </Typography>
  );
};

export const HeaderTitle = () => {
  return (
    <HashRouter>
      <Switch>
        {
          routes.map((route, index: number) => (
            <Route
              key={index}
              exact={route.exact}
              component={Title.bind(this, route.title)}
              path={route.path}
            />
          ))
        }
      </Switch>
    </HashRouter>
  );
};
