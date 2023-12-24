import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/161783673_padded_logo.png'; 
import { slide as Menu } from 'react-burger-menu';
import './Navbar.scss'; 
import { UserContext } from '../../context/UserContext';

function Navbar() {
    // State to manage the open/close state of the burger menu
    const [menuOpen, setMenuOpen] = useState(false);

    // Accessing user data from UserContext
    const { user } = useContext(UserContext);

    // Function to handle state changes of the menu (open/close)
    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);
    };
    
    // Function to toggle the menu open/close
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Logging user data for debugging purposes
    console.log("User context data:", user);

    // Rendering the navigation bar
    return (
        <nav className="navbar">
            {/* Logo and link to home */}
            <Link to="/" className="navbar-brand">
                <img src={logo} alt="Court Connect Logo" className="navbar-logo" />
            </Link>

            {/* Button to toggle the menu */}
            <button className="nav-toggle" onClick={toggleMenu}>
            </button>

            {/* Burger menu with navigation links */}
            <Menu right isOpen={menuOpen} onStateChange={handleStateChange}>
                <Link to="/" className="menu-item" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="menu-item" onClick={() => setMenuOpen(false)}>Register</Link>
                <Link to="/calendar" className="menu-item" onClick={() => setMenuOpen(false)}>Calendar</Link>

                {/* Conditionally rendering the Admin Panel link if the user is an admin */}
                {user && user.isAdmin && (
                    <Link to="/admin" className="menu-item" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
                )}

                {/* Placeholder for additional links */}
            </Menu>
        </nav>
    );
}

export default Navbar;
