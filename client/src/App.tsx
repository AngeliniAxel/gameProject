import React, { Fragment, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

import { setIsAuth } from './features/userSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import { AppDispatch, RootState } from './store';

// Define the server API route as a constant
const SERVER_API_ROUTE: string = 'http://localhost:5000';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector((state: RootState) => state.user);

  async function isAuth() {
    try {
      const response = await fetch(`${SERVER_API_ROUTE}/auth/is-verify`, {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      console.log(parseRes);

      parseRes === true
        ? dispatch(setIsAuth(true))
        : dispatch(setIsAuth(false));
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
    isAuth();
  });

  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Routes>
            <Route
              path='/login'
              element={
                !userState.isAuth ? <Login /> : <Navigate to='/dashboard' />
              }
            ></Route>
            <Route
              path='/register'
              element={
                !userState.isAuth ? <Register /> : <Navigate to='/login' />
              }
            ></Route>
            <Route
              path='/dashboard'
              element={
                userState.isAuth ? <Dashboard /> : <Navigate to='/login' />
              }
            ></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
