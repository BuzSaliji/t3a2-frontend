import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/161783673_padded_logo.png'; 
import { slide as Menu } from 'react-burger-menu';
import './Navbar.scss'; 
import { UserContext } from '../../context/UserContext';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user } = useContext(UserContext); // Replace with your actual context

    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);
    };
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    console.log("User context data:", user);


    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <img src={logo} alt="Court Connect Logo" className="navbar-logo" />
            </Link>
            <button className="nav-toggle" onClick={toggleMenu}>
            </button>
            <Menu right isOpen={menuOpen} onStateChange={handleStateChange}>
                <Link to="/" className="menu-item" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="menu-item" onClick={() => setMenuOpen(false)}>Register</Link>
                <Link to="/calendar" className="menu-item" onClick={() => setMenuOpen(false)}>Calendar</Link>

                {user && user.isAdmin && (
                    <Link to="/admin" className="menu-item" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
                )}

                {/* Add more links */}
            </Menu>
        </nav>
    );
}

export default Navbar;
