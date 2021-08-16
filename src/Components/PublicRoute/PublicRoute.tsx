import React, { FunctionComponent, useContext } from "react";
import { Route } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const PublicRoute: FunctionComponent<{
  component: any;
  path: string;
  exact?: boolean;
}> = ({ component: Component, path, exact = false, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      exact
      path={path}
      {...rest}
      render={(props) => {
        return <Component {...props} auth={auth} />;
      }}
    />
  );
};

export default PublicRoute;
