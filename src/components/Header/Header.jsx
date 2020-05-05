import React from 'react';
import { Link } from "react-router-dom";

import { faListUl, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './header.scss';

const Header = () => {
    return (
        <div className="header">
            <div className="header-container">
                <Link to="/">
                    <button className="header-btn">Home</button>
                </Link>
                <Link to="/signin">
                    <button className="header-btn">Sign In</button>
                </Link>
            </div>
        </div>
    );
};

export default Header;
