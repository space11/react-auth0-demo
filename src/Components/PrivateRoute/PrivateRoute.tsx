import React, { FunctionComponent, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

const PrivateRoute: FunctionComponent<{ component: any; scopes?: string[]; path: string; }> =
  ({ component: Component, scopes, path, ...rest }) => {
    const auth = useContext(AuthContext);
    return (
      <Route
        path={path}
        {...rest}
        render={props => {
          // 1. Redirect to login ig not logged in.
          if (!auth.isAuthenticated()) {
            return (<Redirect to="/" />);
          }

          // 2. Display message if user lacks required scope(s).
          if (scopes && scopes.length > 0 && !auth.hasUserScopes(scopes)) {
            return (
              <h1>Unauthorized - You need the following scope(s) to view this page: {" "}
                {scopes.join(",")}.
              </h1>
            );
          }

          // 3. Render component
          return (<Component auth={auth} {...props} />);
        }
        }
      />

    );
  };

export default PrivateRoute;
