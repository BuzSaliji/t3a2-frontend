import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/161783673_padded_logo.png'; 
import { slide as Menu } from 'react-burger-menu';
import './Navbar.css'; 

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <img src={logo} alt="Court Connect Logo" className="navbar-logo" />
            </Link>
            <Menu right>
                <Link to="/login" className="menu-item">Login</Link>
                <Link to="/register" className="menu-item">Register</Link>
                {/* Add more links */}
            </Menu>
        </nav>
    );
}

export default Navbar;