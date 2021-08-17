## Auth0 Configuration
Some Auth0 configuration is required: Create account, create application and add required configuration.
Like callback, logout url, audience etc. 

Also consider configuring Auth0 Roles
## Required environment variables
Create `.env` file at the root level of the project.
And fill up required variables.
```shell
REACT_APP_AUTH0_DOMAIN=!!your-auth0-domain!!
REACT_APP_AUTH0_CLIENT_ID=!!your-auth0-client-id!!
REACT_APP_AUTH0_CALLBACK_URL=http://localhost:3000/callback
REACT_APP_AUTH0_LOGOUT_URL=http://localhost:3000
REACT_APP_AUTH0_AUDIENCE=http://localhost:3001
REACT_APP_API_URL=http://localhost:3001
```