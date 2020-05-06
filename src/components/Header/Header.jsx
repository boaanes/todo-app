import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import firebase from '../../firebase.config';

import { AuthContext } from '../../App';

import './header.scss';

const Header = () => {

    const Auth = useContext(AuthContext);

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            Auth.setLoggedIn(false);
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        })
    };

    return (
        <div className="header">
            <div className="header-container">
                <Link to="/">
                    <button className="header-btn">Home</button>
                </Link>
                {!Auth.loggedIn &&
                <Link to="/signin">
                    <button className="header-btn">Sign In</button>
                </Link>}
                {Auth.loggedIn &&
                <Link to="/">
                    <button className="header-btn" onClick={signOut}>Sign Out</button>
                </Link>}
            </div>
        </div>
    );
};

export default Header;
