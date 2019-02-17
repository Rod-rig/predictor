import { observer } from "mobx-react";
import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { Loader } from "../";
import { userStore } from "../../stores";

export const PrivateRoute = observer(
  class extends React.Component<{ component: any }, {}> {
    public render() {
      const { component: Component, ...rest } = this.props;

      if (userStore.isLoggedIn === true) {
        const renderComponent = () => <Component {...rest} />;
        return <Route render={renderComponent} />;
      } else if (userStore.isLoggedIn === false) {
        const renderRedirect = () => <Redirect to="/login" />;
        return <Route render={renderRedirect} />;
      } else {
        const renderLoader = () => <Loader />;
        return <Route render={renderLoader} />;
      }
    }
  },
);
