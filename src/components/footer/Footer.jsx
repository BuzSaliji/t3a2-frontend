import React from 'react';
import './Footer.css'; 

function Footer() {
    return (
        <footer className="footer">
            <div className="social-media-links">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src="/path-to-facebook-icon.png" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src="/path-to-instagram-icon.png" alt="Instagram" />
                </a>
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                    <img src="/path-to-other-icon.png" alt="Other" />
                </a>
            </div>
            <p>© 2023 Court Connect. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
