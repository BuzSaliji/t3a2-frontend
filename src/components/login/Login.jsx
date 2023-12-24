import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import logo from '../../assets/images/Black logo - no background.png';
import whiteLogo from '../../assets/images/White logo - no background.png';
import './Login.scss';

function Login() {
    // State hooks for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Accessing the login function from UserContext
    const { login } = useContext(UserContext);

    // Hook to programmatically navigate to other routes
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevents the default form submission behavior
        console.log("Attempting to log in with:", { email, password });

        try {
            // URL for the login endpoint
            const loginUrl = `${process.env.REACT_APP_BACKEND_URL}/users/login`;
            console.log("Sending request to:", loginUrl);

            // Making a POST request to the login endpoint
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log("Response status:", response.status);

            // Handling non-OK responses
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Response data (not ok):", errorResponse);
                throw new Error('Login failed');
            }

            // Parsing the JSON response
            const data = await response.json();
            console.log('Login successful, response data:', data);

            // Checking if the response contains JWT and user ID
            if (data.jwt && data.userId) {
                // Storing user ID in local storage
                localStorage.setItem('userId', data.userId);

                // Using the login method from context and navigating to the calendar page
                login(data.user, data.jwt);
                navigate('/calendar');
                console.log('Login successful, user data:', data.user);
            } else {
                throw new Error('JWT or User ID not received');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // Rendering the login form
    return (
        <div className="login-page">
            <div className="login-container">
                <img src={logo} alt="Court Connect Logo" className="logo" />
            
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" value={email} autoComplete="username" onChange={(e) => setEmail(e.target.value)} />
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
