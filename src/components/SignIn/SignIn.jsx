import React, { useState, useContext, useCallback } from 'react';
import firebase from '../../firebase.config';
import { Link } from 'react-router-dom';

const SignIn = ({ login, setError }) => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const logIn = ( evt ) => {
        login(email, pwd);
        evt.preventDefault();

        setEmail('');
        setPwd('');
    };

    return (
        <div className="login-container">
            <form onSubmit={logIn} id="form-signin" style={{display: 'flex'}}>
                <input
                    type="email"
                    className="input-field"
                    autoComplete="email"
                    value={email}
                    placeholder="email"
                    onChange={( evt ) => setEmail(evt.target.value)}
                />
                <input
                    type="password"
                    className="input-field"
                    autoComplete="current-password"
                    value={pwd}
                    placeholder="password"
                    onChange={( evt ) => setPwd(evt.target.value)}
                />
            </form>
            <button
                type="submit"
                form="form-signin"
                className="header-btn"
            >Sign in</button>
            <p>or</p>
            <Link to="/signup">
                <button className="header-btn">Sign up</button>
            </Link>
        </div>
    );
};

export default SignIn;
