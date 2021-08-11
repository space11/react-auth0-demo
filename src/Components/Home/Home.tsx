import React from 'react';

export default function Home(props: any) {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={props.auth.login}>Log In</button>
    </div>
  );
}
