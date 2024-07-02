import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <p>
        Want to see the code?{' '}
        <a
          href='https://github.com/AngeliniAxel/gameProject'
          rel='noreferrer'
          target='_blank'
        >
          Click here!
        </a>
      </p>
    </div>
  );
};

export default Footer;
