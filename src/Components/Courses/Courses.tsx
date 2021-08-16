import React, { useEffect, useState } from 'react';
import Auth from '../../Auth';

interface Course {
  id: number;
  title: string;
}

const fetchMessage = (url: string, accessToken: string, setMessageFn: ((arg1: Course[]) => void) | ((arg1: string) => void)) => {
  fetch(`/${url}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
    .then(response => setMessageFn(response.courses ?? response.message))
    .catch(error => setMessageFn(error.message));
};

export default function Courses(props: { auth: Auth; }) {
  const [courses, setCourses] = useState<Course[]>();
  const [adminMessage, setAdminMessage] = useState<string>("");

  useEffect(() => {
    fetchMessage('courses', props.auth.getAccessToken(), setCourses);
    fetchMessage('admin', props.auth.getAccessToken(), setAdminMessage);
    return () => {
    };
  }, [props.auth]);

  if (!courses) { return <h1>Loading...</h1>; }
  return (
    <>
      <ul>
        {courses?.map(course => {
          return <li key={course.id}>{course.title}</li>;
        })}
      </ul>
      <ul>{adminMessage}</ul>
    </>
  );
}
