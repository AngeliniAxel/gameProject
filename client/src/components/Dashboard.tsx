import React, { Fragment, useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';

const SERVER_API_ROUTE: string = 'http://localhost:5000';

interface DashboardProps {
  setAuth: (isAuthenticated: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setAuth }) => {
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
  });

  const updateUser = (name: string, lastName: string, email: string) => {
    setUser(() => ({
      name: name,
      lastName: lastName,
      email: email,
    }));
  };

  async function getUser() {
    try {
      const response = await fetch(`${SERVER_API_ROUTE}/dashboard`, {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      updateUser(
        parseRes.user_name,
        parseRes.user_last_name,
        parseRes.user_email
      );
    } catch (err) {
      // Ensure err is of type Error
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('Unexpected error', err);
      }
    }
  }

  useEffect(() => {
    getUser();
  });

  return (
    <Fragment>
      <h1>Dashboard, welcome {user.name}!!</h1>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Fragment>
  );
};

export default Dashboard;
