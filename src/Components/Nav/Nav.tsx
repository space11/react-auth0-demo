import React from 'react';
import { Link } from "react-router-dom";
import Auth from '../../Auth';

export default function Nav(props: { auth: Auth; }) {
  const { isAuthenticated, login, logout } = props.auth;
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li>
          <button onClick={isAuthenticated() ? logout : login}>{isAuthenticated() ? "Log Out" : "Log In"}</button>
        </li>
      </ul>
    </nav>
  );
}
