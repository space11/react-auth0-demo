import React from 'react';
import { Link } from "react-router-dom";
import Auth from '../../Auth';

export default function Nav(props: { auth: Auth; }) {
  const { isAuthenticated, hasUserScopes, login, logout } = props.auth;
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/public">Public</Link></li>
        {isAuthenticated() && <li><Link to="/private">Private</Link></li>}
        {isAuthenticated()
          && hasUserScopes(["read:courses"])
          && <li><Link to="/courses">Courses</Link></li>
        }
        <li>
          <button onClick={isAuthenticated() ? logout : login}>{isAuthenticated() ? "Log Out" : "Log In"}</button>
        </li>
      </ul>
    </nav>
  );
}
