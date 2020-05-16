import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './signIn.scss';

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
        <div className="login-grid">
            <div className="login-container top">
                <form className="right" onSubmit={logIn} id="form-signin" style={{display: 'flex'}}>
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
            </div>
            <div className="login-container left">
                <button
                    type="submit"
                    form="form-signin"
                    className="header-btn"
                >sign in</button>
                <Link to="reset-password">
                    <button>reset password</button>
                </Link>
                <p>or</p>
                <Link to="/signup">
                    <button className="header-btn">sign up</button>
                </Link>
            </div>
        </div>
    );
};

export default SignIn;
