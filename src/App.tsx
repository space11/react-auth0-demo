import { History } from 'history';
import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Auth from './Auth/Auth';
import Home from './Components/Home';
import Nav from './Components/Nav';
import Profile from './Components/Profile';


interface AppProps {
  history: History;
}
export default class App extends Component<AppProps> {
  auth: Auth;
  /**
   *
   */
  constructor(props: AppProps) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  render() {
    return (
      <>
        <Nav />
        <div className="body">
          <Route path="/" exact render={(props) => <Home auth={this.auth} {...props} />} />
          <Route path="/profile" component={Profile} />
        </div>
      </>
    );
  }
}
