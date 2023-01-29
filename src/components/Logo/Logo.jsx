import React from 'react';
import Tilt from 'react-parallax-tilt';
import Brain from './brain.svg';
import './Logo.css';

const Logo = () => {
  return (
    <div className='logo-container'>
      <Tilt>
      <div className='tilt-container' style={{ height: '180px',width: '180px'}}>
        <img src={Brain} alt="Logo"/>
        <h3>Smart Brain</h3>
      </div>
    </Tilt>
    </div>
  )
}

export default Logo;