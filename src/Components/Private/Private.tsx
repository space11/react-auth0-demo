import React, { useEffect, useState } from 'react';
import Auth from '../../Auth';


const fetchMessage = (accessToken: string, setMessageFn: (arg1: string) => void) => {
  fetch('/private', {
    headers: { Authorization: `Bearer ${accessToken}` }
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
    .then(response => setMessageFn(response.message))
    .catch(error => setMessageFn(error.message));
};

export default function Private(props: { auth: Auth; }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMessage(props.auth.getAccessToken(), setMessage);
    return () => {
    };
  }, [props.auth]);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
