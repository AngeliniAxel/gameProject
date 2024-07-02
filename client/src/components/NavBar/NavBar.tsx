import React from 'react';
import './NavBar.scss';
import { Container, Nav, Navbar } from 'react-bootstrap';

const NavBar = () => {
  return (
    <div className='NavBar'>
      <Navbar data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
        </Container>

        <Nav className='me-auto left-side'>
          <Nav.Link href='/login'>Login</Nav.Link>
          <Nav.Link href='/register'>Register</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
