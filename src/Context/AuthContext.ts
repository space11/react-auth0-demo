import React from 'react';
import Auth from '../Auth/Auth';

export interface IAuthContext { auth: Auth; };

// const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);
const AuthContext = React.createContext<Auth>({} as Auth);
export default AuthContext;