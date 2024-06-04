import React, { Fragment, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface RegisterProps {
  setAuth: (isAuthenticated: boolean) => void;
}

// taking values from user input

const Register: React.FC<RegisterProps> = ({ setAuth }) => {
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

  return (
    <Fragment>
      <h1 className='text-center my-5'>Register</h1>
      <Form>
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

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default Register;
