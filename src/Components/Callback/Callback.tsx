import React, { useEffect } from 'react';

const Callback: React.FC<{ location: any; auth: any; }> = (props) => {

  /** Handle authentication if expected values are in the URL */
  useEffect(() => {
    if (/access_token|id_token|error/.test(props.location.hash)) {
      props.auth.handleAuthentication();
    } else {
      throw new Error('Invalid callback URL');
    }
    return () => {
      // cleanup
    };
  }, [props.location, props.auth]);
  return (
    <h1>
      Loading...
    </h1>
  );
};

export default Callback;