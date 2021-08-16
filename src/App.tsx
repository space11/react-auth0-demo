import React, { useState } from 'react';
import { Route, useHistory } from "react-router-dom";
import Auth from './Auth/Auth';
import Callback from './Components/Callback';
import Courses from './Components/Courses';
import Home from './Components/Home';
import Nav from './Components/Nav';
import Private from './Components/Private';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';
import Public from './Components/Public';

const App = () => {
  const history = useHistory();
  const [auth] = useState(() => new Auth(history));

  return (
    <>
      <Nav auth={auth} />
      <div className="body">
        <Route path="/" exact render={(props) => <Home auth={auth} {...props} />} />
        <Route path="/callback" render={(props) => <Callback auth={auth} {...props} />} />
        <PrivateRoute path="/profile" auth={auth} component={Profile} />
        <PrivateRoute path="/private" component={Private} auth={auth} />
        <PrivateRoute path="/courses" component={Courses} scopes={['read:courses']} auth={auth} />
        <Route path="/public" component={Public} />
      </div>
    </>
  );
};

export default App;
