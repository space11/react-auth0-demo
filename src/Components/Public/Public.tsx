import React, { useEffect, useState } from 'react';

export default function Public() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMessage();
    return () => {
    };
  }, []);

  const fetchMessage = () => {
    fetch('/public').then(response => {
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
