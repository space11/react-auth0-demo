import auth0 from 'auth0-js';

class Auth {
  history: {
    push: (arg0: string) => void;
  };
  auth0: auth0.WebAuth;
  /**
   *
   */
  constructor(history: { push: (arg0: string) => void; }) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL as string,

      /**
       * token is an access token - authorization token
       * id_token is OpenId token - authentication token
       */
      responseType: 'token id_token',

      /**
       * OpenId will be used for authentication
       */
      scope: 'openid profile email'
    });
  }

  login = () => {
    /** This will redirect to the Auth0 login page */
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push('/');
      } else if (err) {
        this.history.push('/');
        alert(`Error ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  };

  /** With the dedicated backend server store Session details in HTTP Only Cookie as it is the most secure option
   * For SPA without a dedicated backend store Session in memory - this is recommended by Auth0.
   */
  setSession = (authResult: auth0.Auth0DecodedHash) => {
    // set the time that the access token will expire
    const expireAt = JSON.stringify((authResult.expiresIn || 0) * 1000 + new Date().getTime());

    localStorage.setItem("access_token", authResult.accessToken as string);
    localStorage.setItem("id_token", authResult.idToken as string);
    localStorage.setItem("expires_at", expireAt);
  };

  isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') as string);
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");

    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: process.env.REACT_APP_AUTH0_LOGOUT_URL
    });
  };
}

export default Auth;