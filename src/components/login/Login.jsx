import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import logo from '../../assets/images/Black logo - no background.png';
import whiteLogo from '../../assets/images/White logo - no background.png';
import './Login.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Attempting to log in with:", { email, password });
  
      try {
          const loginUrl = `${process.env.REACT_APP_BACKEND_URL}/users/login`;
          console.log("Sending request to:", loginUrl);
          const response = await fetch(loginUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
          });
  
          console.log("Response status:", response.status);
  
          if (!response.ok) {
              const errorResponse = await response.json();
              console.error("Response data (not ok):", errorResponse);
              throw new Error('Login failed');
          }
  
          const data = await response.json();
          console.log('Login successful, response data:', data);
  
          if (data.jwt && data.userId) {
              // Store user ID in local storage
              localStorage.setItem('userId', data.userId);
  
              // Use the login method from the context after the response is successful
              login(data.user, data.jwt);
              navigate('/calendar');
          } else {
              throw new Error('JWT or User ID not received');
          }
      } catch (error) {
          console.error('Login error:', error);
      }
  };
  

    return (
        <div className="login-page">
            <div className="login-container">
                <img src={logo} alt="Court Connect Logo" className="logo" />
            
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
            <div className="logo-container">
                <img src={whiteLogo} alt="Court Connect Logo" />
            </div>
        </div>
    );
}

export default Login;
