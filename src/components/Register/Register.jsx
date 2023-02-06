import React, { useState } from 'react';
import './Register.css';

const Register = ({ onRouteChange, loadUser }) => {
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const onNameChange = (event) => {
        setRegisterName(event.target.value);
    }
    
    const onEmailChange = (event) => {
        setRegisterEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setRegisterPassword(event.target.value);
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter')
            onSubmitRegister();
    }

    const onSubmitRegister = () => {
        fetch('http://localhost:3001/register',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: registerName,
                email: registerEmail,
                password: registerPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user){
                loadUser(user)
                onRouteChange('home')
            }
        })
    }

  return (
    <div className='card-border'>
    <div className="main-container">
        <div className="form-container">
            <fieldset id="sign_up">
                <legend className="title">Register</legend>
                <div className="email-input">
                    <label htmlFor="name">Name</label>
                    <input id="name" 
                        type="text"
                        onKeyDown={handleKeyDown}
                        onChange={onNameChange}/>
                </div>
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
                onClick={onSubmitRegister}
                type="submit" 
                value="Register">Register</button>
            </div>
        </div>
    </div>
</div>
  )
}

export default Register;