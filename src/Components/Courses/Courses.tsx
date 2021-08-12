import React, { useEffect, useState } from 'react';
import Auth from '../../Auth';

interface Course {
  id: number;
  title: string;
}

const fetchMessage = (accessToken: string, setMessageFn: (arg1: Course[]) => void) => {
  fetch('/courses', {
    headers: { Authorization: `Bearer ${accessToken}` }
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
    .then(response => setMessageFn(response.courses))
    .catch(error => setMessageFn(error.message));
};

export default function Courses(props: { auth: Auth; }) {
  const [courses, setCourses] = useState<Course[]>();

  useEffect(() => {
    fetchMessage(props.auth.getAccessToken(), setCourses);
    return () => {
    };
  }, [props.auth]);

  if (!courses) { return <h1>Loading...</h1>; }
  return (
    <ul>
      {courses?.map(course => {
        return <li key={course.id}>{course.title}</li>;
      })}
    </ul>
  );
}
