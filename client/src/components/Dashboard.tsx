import React, { Fragment } from 'react';

interface DashboardProps {
  setAuth: (isAuthenticated: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setAuth }) => {
  return (
    <Fragment>
      <h1>Dashboard</h1>
      <button onClick={() => setAuth(false)}>Log out</button>
    </Fragment>
  );
};

export default Dashboard;
