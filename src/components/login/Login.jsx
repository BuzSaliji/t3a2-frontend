import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Black logo - no background.png';

import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      console.log(data);
      
  
    } catch (error) {
      console.error('Login error', error);
      
    }
  };

  return (
    
    <div className="login-container">
      <h1>Welcome To</h1>
      <div className="logo-container">
      <img src={logo} alt="Court Connect Logo" className="logo" />

      </div>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        <p className="signup-link">Not registered? <a href="/register">Sign up!</a></p>
      </form>
    </div>
  );
}


export default Login;

