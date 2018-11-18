import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {userStore} from '../../stores';

export const PrivateRoute = ({component: Component, ...rest}: any) => {
  const renderComponent = (props: any) => {
    return userStore.isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: {from: props.location},
        }}
      />
    );
  };

  return (
    <Route render={renderComponent} {...rest}/>
  );
};
