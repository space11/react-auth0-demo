import auth0 from 'auth0-js';
import * as H from 'history';

const REDIRECT_ON_LOGIN = 'redirect_on_login';

class Auth {
  history: H.History;
  auth0: auth0.WebAuth;
  userProfile: any;
  requestedScopes = 'openid profile email read:courses';

  /**
   *
   */
  constructor(history: H.History) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      /**
       * token is an access token - authorization token
       * id_token is OpenId token - authentication token
       */
      responseType: 'token id_token',

      /**
       * OpenId will be used for authentication
       */
      scope: this.requestedScopes
    });
  }

  login = () => {
    localStorage.setItem(REDIRECT_ON_LOGIN, JSON.stringify(this.history.location));
    /** This will redirect to the Auth0 login page */
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        const redirectLocation = localStorage.getItem(REDIRECT_ON_LOGIN) === 'undefined'
          ? '/'
          : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN) as string);
        this.history.push(redirectLocation);
      } else if (err) {
        this.history.push('/');
        alert(`Error ${err.error}. Check the console for further details.`);
        console.log(err);
      }

      localStorage.removeItem(REDIRECT_ON_LOGIN);
    });
  };

  /** With the dedicated backend server store Session details in HTTP Only Cookie as it is the most secure option
   * For SPA without a dedicated backend store Session in memory - this is recommended by Auth0.
   */
  setSession = (authResult: auth0.Auth0DecodedHash) => {
    // set the time that the access token will expire
    const expireAt = JSON.stringify((authResult.expiresIn || 0) * 1000 + new Date().getTime());

    // if there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user.
    // Otherwise use the scopes as requested. If no scopes were requested, 
    // set it to nothing
    const scopes = authResult.scope || this.requestedScopes || '';

    localStorage.setItem("access_token", authResult.accessToken as string);
    localStorage.setItem("id_token", authResult.idToken as string);
    localStorage.setItem("expires_at", expireAt);
    localStorage.setItem("scopes", JSON.stringify(scopes));
  };

  isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') as string);
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("scopes");

    this.userProfile = null;

    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: process.env.REACT_APP_AUTH0_LOGOUT_URL
    });
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found.');
    }
    return accessToken;
  };

  getProfile = (cb: (arg0: any, arg1: any) => void) => {
    if (this.userProfile) {
      return cb(this.userProfile, undefined);
    }

    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }

      cb(profile, err);
    });
  };


  hasUserScopes(scopes: string[]): boolean {
    const grantedScopes = (JSON.parse(localStorage.getItem('scopes') as string) || "").split(" ");
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}

export default Auth;