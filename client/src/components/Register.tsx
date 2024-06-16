import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUserData, setIsAuth } from '../features/userSlice';

const SERVER_API_ROUTE: string = 'http://localhost:5000';

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector((state: RootState) => state.user);

  // taking values from user input
  const [inputs, setInputs] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const { name, lastName, email, password, repeatPassword } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //managing password visibility

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword((prevShowRepeatPassword) => !prevShowRepeatPassword);
  };

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  //managing On submit button
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Check if passwords match
      if (password !== repeatPassword) {
        setPasswordsMatch(false);
      } else {
        setPasswordsMatch(true);

        const body = { name, lastName, email, password };

        const response = await fetch(`${SERVER_API_ROUTE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const parseRes = await response.json();
        console.log(parseRes);
        if (parseRes.token) {
          localStorage.setItem('token', parseRes.token);

          toast.success('User created successfully!!!');

          dispatch(setIsAuth(true));
          dispatch(fetchUserData());
        } else {
          dispatch(setIsAuth(false));
          toast.error(parseRes);
        }
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
      <h1 className='text-center my-5'>Register</h1>
      <Form onSubmit={onSubmitForm}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formLastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            name='lastName'
            placeholder='Last name'
            value={lastName}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            value={email}
            onChange={onChange}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
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

        <Form.Group className='mb-3' controlId='formRepeatPassword'>
          <Form.Label>Repeat password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showRepeatPassword ? 'text' : 'password'}
              name='repeatPassword'
              placeholder='Repeat password'
              value={repeatPassword}
              onChange={onChange}
            />
            <Button
              variant='outline-secondary'
              onClick={toggleRepeatPasswordVisibility}
            >
              {showRepeatPassword ? 'Hide' : 'Show'}
            </Button>
          </InputGroup>
        </Form.Group>

        {/* Conditional rendering of the password mismatch alert */}
        {!passwordsMatch && (
          <Alert variant='danger'>Passwords do not match.</Alert>
        )}

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <p>
        Already have an account? <Link to='/login'>Click here</Link> to login
      </p>
    </Fragment>
  );
};

export default Register;
