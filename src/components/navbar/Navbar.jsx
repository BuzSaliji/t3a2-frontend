import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/161783673_padded_logo.png'; 
import './Navbar.css'; 

function Navbar() {
    return (
        <nav className="navbar">
            <img src={logo} alt="Court Connect Logo" className="nav-logo" />
            <div className="nav-links">
                <Link to="/login" className="nav-item">Login</Link>
                <Link to="/register" className="nav-item">Register</Link>
            </div>
        </nav>
    );
}

export default Navbar;