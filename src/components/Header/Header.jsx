import React from 'react';
import { Link } from "react-router-dom";

import './header.scss';

const Header = () => {
    return (
        <div className="header">
            <div className="header-container">
                <Link to="/signin"><button class="header-btn">Sign in</button></Link>
            </div>
        </div>
    );
};

export default Header;
