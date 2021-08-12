import React, { useEffect, useState } from 'react';
import Auth from '../../Auth';

export default function Private(props: { auth: Auth; }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMessage();
    return () => {
    };
  }, []);

  const fetchMessage = () => {
    fetch('/private', {
      headers: { Authorization: `Bearer ${props.auth.getAccessToken()}` }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
      .then(response => setMessage(response.message))
      .catch(error => setMessage(error.message));
  };

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
