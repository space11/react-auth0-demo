import { History } from 'history';
import React, { Component } from 'react';
import { Redirect, Route } from "react-router-dom";
import Auth from './Auth/Auth';
import Home from './Components/Home';
import Nav from './Components/Nav';
import Profile from './Components/Profile';
import Callback from './Components/Callback';
import Public from './Components/Public';
import Private from './Components/Private';

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
        <Nav auth={this.auth} />
        <div className="body">
          <Route path="/" exact render={(props) => <Home auth={this.auth} {...props} />} />
          <Route path="/callback" render={(props) => <Callback auth={this.auth} {...props} />} />
          <Route path="/profile"
            render={
              props =>
                this.auth.isAuthenticated() ?
                  <Profile auth={this.auth} {...props} />
                  : <Redirect to="/" />
            } />
          <Route path="/public" component={Public} />
          <Route path="/private" render={props => <Private auth={this.auth} {...props} />} />
        </div>
      </>
    );
  }
}
