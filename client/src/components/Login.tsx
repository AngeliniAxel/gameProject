import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

const SERVER_API_ROUTE: string = 'http://localhost:5000';

interface LoginProps {
  setAuth: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  // taking values from user input
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //managing password visibility
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  //managing correct credentials
  const [correctCredentials, setCorrectCredentials] = useState({
    isCorrect: true,
    message: '',
  });

  const updateCredentials = (state: boolean, message: string) => {
    setCorrectCredentials(() => ({
      isCorrect: state,
      message: message,
    }));
  };

  //managing On submit button
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch(`${SERVER_API_ROUTE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (!parseRes.token) {
        updateCredentials(false, parseRes);
      } else {
        localStorage.setItem('token', parseRes.token);

        setAuth(true);
      }
    } catch (err) {
      // Ensure err is of type Error
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('Unexpected error', err);
      }
    }
  };

  return (
    <Fragment>
      <h1 className='text-center my-5'>Login</h1>
      <Form onSubmit={onSubmitForm}>
        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            value={email}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              value={password}
              onChange={onChange}
            />
            <Button
              variant='outline-secondary'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputGroup>
        </Form.Group>

        {/* Conditional rendering for the wrong credentials*/}
        {!correctCredentials.isCorrect && (
          <Alert variant='danger'>{correctCredentials.message}</Alert>
        )}

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <p>
        Don´t have an account? <Link to='/register'>Click here</Link> to
        register
      </p>
    </Fragment>
  );
};

export default Login;
