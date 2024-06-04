import React, { Fragment, useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// Components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Routes>
            <Route
              path='/login'
              element={
                !isAuthenticated ? (
                  <Login setAuth={setAuth} />
                ) : (
                  <Navigate to='/dashboard' />
                )
              }
            ></Route>
            <Route
              path='/register'
              element={
                !isAuthenticated ? (
                  <Register setAuth={setAuth} />
                ) : (
                  <Navigate to='/login' />
                )
              }
            ></Route>
            <Route
              path='/dashboard'
              element={
                isAuthenticated ? (
                  <Dashboard setAuth={setAuth} />
                ) : (
                  <Navigate to='/login' />
                )
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
