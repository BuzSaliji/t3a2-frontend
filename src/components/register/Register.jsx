import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Black logo - no background.png';
import './Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            username,
            email,
            password,
        };

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/users`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                }
            );

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            console.log(data);

            // TODO: Redirect to Calendar page

        } catch (error) {
            console.error('Registration error', error);
        }
        
    };

    return (
        <div className="register-container">
            <img src={logo} alt="Court Connect Logo" className="logo" />
            <h1>Register</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/">Log In!</Link></p>
            </form>
        </div>
    );
}

export default Register;
