import auth0 from 'auth0-js';

export default class Auth {
  history: any;
  auth0: auth0.WebAuth;
  /**
   *
   */
  constructor(history: any) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
      clientID: process.env.REACT_APP_AUTH0_CLIENTID as string,
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
}