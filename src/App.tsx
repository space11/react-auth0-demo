import React from 'react';
import { Route } from "react-router-dom";
import Home from './components/Home';
import Nav from './components/Nav';
import Profile from './components/Profile';

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
