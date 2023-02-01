import React from 'react';
import './Navbar.css';

const Navbar = ({ onRouteChange, isSignedIn }) => {
  if(isSignedIn) {
    return (
      <nav className='navbar-container'>
          <p onClick={() => onRouteChange('signin')} className='signout'>Sign Out</p>
      </nav>
    );
  } else {
    return(
        <nav className='navbar-container'>
            <p onClick={() => onRouteChange('signin')} className='signout'>Sign in</p>
            <p onClick={() => onRouteChange('register')} className='signout'>Register</p>
        </nav>
    );
  }
}

export default Navbar;