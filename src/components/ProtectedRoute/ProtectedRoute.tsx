import React from "react";
import { Route, Redirect } from "react-router";

const ProtectedRoute: React.FunctionComponent<any> = ({
  component: Component,
  isLoggedIn,
  redirectTo,
  ...rest
}) => {
  return isLoggedIn ? (
    <Route {...rest} render={(props: any) => <Component {...props} />} />
  ) : (
    <Redirect to={redirectTo} />
  );
};

export default ProtectedRoute;
