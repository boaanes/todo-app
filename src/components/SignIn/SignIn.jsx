import React, { useState, useContext } from 'react';
import firebase from '../../firebase.config';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../App';

const NewSignIn = () => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const Auth = useContext(AuthContext);

    const logIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, pwd).then(res => {
            if (res.user) Auth.setLoggedIn(true);
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });

        setEmail('');
        setPwd('');
    }

    return (
        <div className="login-container">
            <input
                type="email"
                className="input-field"
                value={email}
                placeholder="email"
                onChange={( evt ) => setEmail(evt.target.value)}
            />
            <input
                type="password"
                className="input-field"
                value={pwd}
                placeholder="password"
                onChange={( evt ) => setPwd(evt.target.value)}
            />
            <button className="header-btn" onClick={() => logIn()}>Sign in</button>
            <p>or</p>
            <Link to="/signup">
                <button className="header-btn">Sign up</button>
            </Link>
        </div>
    );
};

export default NewSignIn;
