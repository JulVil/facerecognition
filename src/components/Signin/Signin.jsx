import React, { useState } from 'react';
import Message from '../Message/Message';
import './Signin.css';

const Signin = ({ onRouteChange, loadUser }) => {
    const [signinEmail, setSigninEmail] = useState('');
    const [signinPassword, setSigninPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    
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
        fetch('https://smartbrain-9xn8.onrender.com/signin',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signinEmail,
                password: signinPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            setShowMessage(true)
            setTimeout(() => setShowMessage(false), 3000);
            setResponseMessage(user)
            if(user.id){
                loadUser(user);
                onRouteChange('home');
            }
        })
        .catch((err) => {
            console.error('error', err)
        })
    }
    
    return (
    <div className='wrapper'>
      <div className='card-border'>
        <div className='main-container'>
            <div className='form-container'>
                <fieldset id='sign_up'>
                    <legend className='title'>Sign In</legend>
                    <div className='email-input'>
                        <label htmlFor='email-address'>Email</label>
                        <input id='email-address' 
                            type='email'
                            onKeyDown={handleKeyDown}
                            onChange={onEmailChange}/>
                    </div>
                    <div className='password-input'>
                        <label htmlFor='password'>Password</label>
                        <input id='password' 
                            type='password'
                            onKeyDown={handleKeyDown}
                            onChange={onPasswordChange}/>
                    </div>
                </fieldset>
                <div>
                    <button 
                    onClick={onSubmitSingin}
                    type='submit' 
                    value='Sign in'>Sign in</button>
                </div>
                <div className='links-container'>
                    <p onClick={() => onRouteChange('register')}>Register</p>
                </div>
            </div>
        </div>
    </div>
        <Message type='error' showMessage={showMessage} responseMessage={responseMessage}/>
    </div>
  )
}

export default Signin;