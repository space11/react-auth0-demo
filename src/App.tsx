import React from 'react';
import { Route } from "react-router-dom";
import Home from './Components/Home';
import Nav from './Components/Nav';
import Profile from './Components/Profile';

function App() {
  return (
    <>
      <Nav />
      <div className="body">
        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
      </div>
    </>
  );
}

export default App;
