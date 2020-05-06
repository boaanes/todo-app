import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase.config';

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from '../../App';

import SignIn from '../SignIn/SignIn';

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
                    <button><FontAwesomeIcon icon={faHome} size="2x" /></button>
                </Link>
                {!Auth.loggedIn &&
                    <div className="right">
                        <SignIn />
                    </div>
                }
                {Auth.loggedIn &&
                    <div className="login-container right">
                        <p>logged in as: {firebase.auth().currentUser.email}</p>
                        <Link to="/">
                            <button className="header-btn" onClick={signOut}>Sign Out</button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default Header;
