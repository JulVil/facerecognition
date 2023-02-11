import React, { useState } from 'react';
import './Signin.css';

const Signin = ({ onRouteChange, loadUser }) => {
    const [signinEmail, setSigninEmail] = useState('');
    const [signinPassword, setSigninPassword] = useState('');

    const onEmailChange = (event) => {
        setSigninEmail(event.target.value);
    }
    
    const onPasswordChange = (event) => {
        setSigninPassword(event.target.value);
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter')
            onSubmitSingin();
    }

    const onSubmitSingin = () => {
        fetch('http://localhost:3001/signin',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signinEmail,
                password: signinPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                loadUser(user);
                onRouteChange('home');
            }
        })
    }

  return (
    <div className='card-border'>
        <div className="main-container">
            <div className="form-container">
                <fieldset id="sign_up">
                    <legend className="title">Sign In</legend>
                    <div className="email-input">
                        <label htmlFor="email-address">Email</label>
                        <input id="email-address" 
                            type="email"
                            onKeyDown={handleKeyDown}
                            onChange={onEmailChange}/>
                    </div>
                    <div className="password-input">
                        <label htmlFor="password">Password</label>
                        <input id="password" 
                            type="password"
                            onKeyDown={handleKeyDown}
                            onChange={onPasswordChange}/>
                    </div>
                </fieldset>
                <div>
                    <button 
                    onClick={onSubmitSingin}
                    type="submit" 
                    value="Sign in">Sign in</button>
                </div>
                <div className="links-container">
                    <p onClick={() => onRouteChange('register')}>Register</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signin;