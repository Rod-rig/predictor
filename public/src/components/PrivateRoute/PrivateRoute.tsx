import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {userStore} from '../../stores';

export const PrivateRoute = ({component: Component, ...rest}: any) => {
  const renderComponent = () => {
    return userStore.isLoggedIn ? <Component/> : <Redirect to='/login'/>;
  };

  return (
    <Route render={renderComponent} {...rest}/>
  );
};
