import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../Auth';

export default function Home(props: { auth: Auth; }) {
  const { isAuthenticated, login } = props.auth;
  return (
    <div>
      <h1>Home</h1>
      {isAuthenticated() ?
        (<Link to="/profile">View Profile</Link>)
        :
        (<button onClick={login}>Log In</button>)
      }
    </div>
  );
}
