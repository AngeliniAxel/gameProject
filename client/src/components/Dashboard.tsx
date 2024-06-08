import React, { Fragment, useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';

// Define the server API route as a constant
const SERVER_API_ROUTE: string = 'http://localhost:5000';

// Define the props for the Dashboard component
interface DashboardProps {
  setAuth: (isAuthenticated: boolean) => void;
}

// Define the User interface to type the user state
interface User {
  name: string;
  lastName: string;
  email: string;
}

const Dashboard: React.FC<DashboardProps> = ({ setAuth }) => {
  // Initialize the user state with default values
  const [user, setUser] = useState<User>({
    name: '',
    lastName: '',
    email: '',
  });

  // Function to update the user state
  const updateUser = (name: string, lastName: string, email: string) => {
    setUser(() => ({
      name: name,
      lastName: lastName,
      email: email,
    }));
  };

  // Function to fetch user data from the server, memoized with useCallback
  const getUser = useCallback(async () => {
    try {
      const response = await fetch(`${SERVER_API_ROUTE}/dashboard`, {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      // Update the user state with the response data
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
  }, []); // Empty dependency array ensures this function is created only once

  // useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    getUser();
  }, [getUser]); // Include getUser in the dependency array

  // Function to handle user logout
  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
  };

  return (
    <Fragment>
      <h1>Dashboard, welcome {user.name}!!</h1>

      <Button variant='primary' type='submit' onClick={logout}>
        Logout
      </Button>
    </Fragment>
  );
};

export default Dashboard;
