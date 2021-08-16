import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import Auth from "./Auth/Auth";
import Callback from "./Components/Callback";
import Courses from "./Components/Courses";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import Private from "./Components/Private";
import PrivateRoute from "./Components/PrivateRoute";
import Profile from "./Components/Profile";
import Public from "./Components/Public";
import PublicRoute from "./Components/PublicRoute";
import AuthContext from "./Context/AuthContext";

const App = () => {
  const history = useHistory();
  const [auth] = useState(() => new Auth(history));
  const [tokenRenewalComplete, setTokenRenewalComplete] = useState(false);

  // TODO: Implement check using localStorage if user is logging for the first time or logged out. Then this effect is not needed.
  useEffect(() => {
    auth.renewToken(() => setTokenRenewalComplete(true));
    return () => {
      // cleanup;
    };
  }, [auth]);

  // Show loading message until the token renewal check is completed.
  if (!tokenRenewalComplete) {
    return <h1>Loading...</h1>;
  }

  return (
    <AuthContext.Provider value={auth}>
      <Nav auth={auth} />
      <div className="body">
        <PublicRoute path="/" exact component={Home} />
        <PublicRoute path="/callback" component={Callback} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/private" component={Private} />
        <PrivateRoute
          path="/courses"
          component={Courses}
          scopes={["read:courses"]}
        />
        <Route path="/public" component={Public} />
      </div>
    </AuthContext.Provider>
  );
};

export default App;
