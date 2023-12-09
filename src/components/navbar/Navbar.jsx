import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/161783673_padded_logo.png'; 
import { slide as Menu } from 'react-burger-menu';
import './Navbar.css'; 

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const handleStateChange = (state) => {
        setMenuOpen(state.isOpen);
    };
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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
                {/* Add more links */}
            </Menu>
        </nav>
    );
}

export default Navbar;
