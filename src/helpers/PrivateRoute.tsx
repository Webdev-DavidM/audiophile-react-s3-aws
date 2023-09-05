import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: JSX.Element,
  loggedIn: boolean
}

export default function PrivateRoute({loggedIn, children}: Props) {
  const navigate = useNavigate();
  if (!loggedIn) {
    navigate('/')
  }
  else {
    return <div>{children}</div>;
  }

  return null
}
