import React from 'react';
import { SocialIcon } from 'react-social-icons';
import './Footer.css';

function Footer() {
    const iconStyle = { height: 20, width: 20 }; // Adjust the size as needed

    return (
        <footer className="footer">
            <div className="social-media-links">
                <SocialIcon url="https://www.facebook.com" style={iconStyle} bgColor="#abedd8" fgColor="#2b2b2b" />
                <SocialIcon url="https://www.instagram.com" style={iconStyle} bgColor="#abedd8" fgColor="#2b2b2b" />
                <SocialIcon url="https://www.twitter.com" style={iconStyle} bgColor="#abedd8" fgColor="#2b2b2b" />
            </div>
            <p>© 2023 Court Connect. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
