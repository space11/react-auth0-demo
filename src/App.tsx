import React, { useState } from 'react';
import { Redirect, Route, useHistory } from "react-router-dom";
import Auth from './Auth/Auth';
import Callback from './Components/Callback';
import Courses from './Components/Courses';
import Home from './Components/Home';
import Nav from './Components/Nav';
import Private from './Components/Private';
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
        <Route path="/profile"
          render={
            props =>
              auth.isAuthenticated() ?
                <Profile auth={auth} {...props} />
                : <Redirect to="/" />
          } />
        <Route path="/public" component={Public} />
        <Route path="/private"
          render={
            props =>
              auth.isAuthenticated() ?
                <Private auth={auth} {...props} />
                : <Redirect to="/" />
          } />
        <Route path="/courses"
          render={
            props =>
              auth.isAuthenticated() && auth.hasUserScopes(['read:courses']) ?
                <Courses auth={auth} {...props} />
                : <Redirect to="/" />
          } />
      </div>
    </>
  );
};

export default App;
