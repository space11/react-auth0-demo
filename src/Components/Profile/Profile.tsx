import React, { useEffect, useState } from 'react';
import Auth from '../../Auth';

export default function Profile(props: { auth: Auth; }) {
  const [profile, setProfile] = useState<{ nickname: string; picture: string; }>();
  const [error, setError] = useState("");

  const setState = (profile: any, error: string) => {
    setProfile(profile);
    setError(error);
  };

  const loadUserProfile = () => {
    props.auth.getProfile((profile, error) => setState(profile, error));
  };


  useEffect(() => {
    loadUserProfile();

    return () => {
    };
  });

  if (error) {
    return <h1>{error}</h1>;
  }
  
  if (!profile) {
    return <h1>
      Loading...
    </h1>;
  }

  return (
    <>
      <h1>
        Profile
      </h1>

      <p>
        {profile.nickname}
      </p>
      <img style={{ maxWidth: 50, maxHeight: 50 }}
        src={profile.picture}
        alt="profile pic"
      />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  );
}