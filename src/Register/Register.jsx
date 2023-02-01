import React from 'react';
import './Register.css';

const Register = ({ onRouteChange }) => {
  return (
    <div className='card-border'>
    <div className="main-container">
        <div className="form-container">
            <fieldset id="sign_up">
                <legend className="title">Register</legend>
                <div className="email-input">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text"/>
                </div>
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
                value="Register">Register</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default Register;