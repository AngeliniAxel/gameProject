import React, { Fragment, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

import { setIsAuth } from './features/userSlice';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './style/styles.scss';

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
import Footer from './components/Footer/Footer';
import { AppDispatch, RootState } from './store';
import { Navbar } from 'react-bootstrap';
import NavBar from './components/NavBar/NavBar';

// Define the server API route as a constant
const SERVER_API_ROUTE: string = 'http://localhost:5000';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const userState = useSelector((state: RootState) => state.user);

  async function isAuth() {
    try {
      const response = await fetch(`${SERVER_API_ROUTE}/auth/is-verify`, {
        method: 'GET',
        headers: { accessToken: localStorage.accessToken },
        credentials: 'include',
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
      <NavBar />
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
      <Footer />
    </Fragment>
  );
}

export default App;
