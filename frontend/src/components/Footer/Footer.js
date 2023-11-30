import React from 'react';

function Footer() {
  return (
    <footer className='footer section'>
      <p className='text footer__copyright'>© {new Date().getFullYear()}, PROSEPT</p>
    </footer>
  );
}
export default Footer;
