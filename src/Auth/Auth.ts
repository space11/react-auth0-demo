import auth0 from 'auth0-js';

class Auth {
  history: any;
  auth0: auth0.WebAuth;
  /**
   *
   */
  constructor(history: any) {
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

}

export default Auth;