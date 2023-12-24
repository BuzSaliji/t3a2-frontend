import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import logo from '../../assets/images/Black logo - no background.png';
import whiteLogo from '../../assets/images/White logo - no background.png';
import './Register.scss';

function Register() {
    // State hooks for username, email, and password
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Accessing the login function from UserContext
    const { login } = useContext(UserContext);

    // Hook to programmatically navigate to other routes
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevents the default form submission behavior

        // Constructing the user data for registration
        const userData = {
            username,
            email,
            password
        };
    
        try {
            // Sending a POST request to the backend for registration
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData), 
            });
    
            // Checking if the request was successful
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }
    
            // Handling the response data
            const data = await response.json();
            console.log(data);

            // Logging in the user after successful registration
            login(data.user, data.jwt);
            
            // Navigating to the calendar page
            navigate('/calendar');

        } catch (error) {
            console.error('Registration error:', error);
        }
    };  

    // Rendering the registration form
    return (
        <div className="register-page">
            <div className="register-container">
                <img src={logo} alt="Court Connect Logo" className="logo" />
                <h1>Register</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                    {/* Input fields for username, email, and password */}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            autoComplete="username"
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button type="submit">Register</button>
                    <p>Already have an account? <Link to="/">Log In!</Link></p>
                </form>
            </div>
            <div className="register-logo-container">
                <img src={whiteLogo} alt="Court Connect Logo" />
            </div>
        </div>
    );
}

export default Register;
