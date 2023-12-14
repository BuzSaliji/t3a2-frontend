import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

import logo from '../../assets/images/Black logo - no background.png';

import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        console.log('Response data:', data);

        // Use the login method from the context after the response is successful
        login(data.user, data.jwt);

        // Navigate to the calendar page
        navigate('/calendar');
    } catch (error) {
        console.error('Login error:', error);
    }
};

  return (
    
    <div className="login-container">
      <div className="logo-container">
      <img src={logo} alt="Court Connect Logo" className="logo" />

      </div>
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        <p className="signup-link">Not registered? <Link to="/register">Sign up!</Link></p>
      </form>
    </div>
  );
}


export default Login;

