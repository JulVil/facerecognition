import React from 'react';
import './Signin.css';

const Signin = ({ onRouteChange }) => {
  return (
<div className='card-border'>
    <div className="main-container">
        <div className="form-container">
            <fieldset id="sign_up">
                <legend className="title">Sign In</legend>
                <div className="email-input">
                    <label htmlFor="email-address">Email</label>
                    <input id="email-address" type="email"/>
                </div>
                <div className="password-input">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password"/>
                </div>
            </fieldset>
            <div>
                <button 
                onClick={() => onRouteChange('home')}
                type="submit" 
                value="Sign in">Sign in</button>
            </div>
            <div className="links-container">
                <p onClick={() => onRouteChange('register')}>Register</p>
                <p >Forgot your password?</p>
            </div>
        </div>
    </div>
</div>
  )
}

export default Signin;