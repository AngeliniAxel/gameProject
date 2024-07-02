import React, { Fragment, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../store';
import { fetchUserData, logoutUser } from '../features/userSlice';
import { Spinner } from 'react-bootstrap';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector((state: RootState) => state.user);

  // Fetch user data when the component mounts
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  // Function to handle user logout
  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    dispatch(logoutUser());
    //setAuth(false);
    toast.success('You logged out successfully!!');
  };

  return (
    <Fragment>
      {userState.loading && <Spinner animation='border' variant='success' />}

      {userState.success && (
        <h1>Dashboard, welcome {userState.user?.name}!!</h1>
      )}

      <Button variant='primary' type='submit' onClick={logout}>
        Logout
      </Button>
    </Fragment>
  );
};

export default Dashboard;
