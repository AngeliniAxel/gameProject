import React, { Fragment } from 'react';

interface LoginProps {
  setAuth: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  return (
    <Fragment>
      <h1>Login</h1>
      <button onClick={() => setAuth(true)}>Authenticate</button>
    </Fragment>
  );
};

export default Login;
