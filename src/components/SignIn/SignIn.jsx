import React, { useState } from 'react';

import './signIn.scss';
import '../MainContainer/mainContainer.scss';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    return(
        <div className="main-container">
            <h1>Sign in:</h1>
            <div className="form-container">
                <input
                    type="email"
                    className="input-field"
                    value={email}
                    placeholder="email"
                    onChange={( evt ) => setEmail(evt.target.value)}
                />
            </div>
            <div className="form-container">
                <input
                    type="password"
                    className="input-field"
                    value={pwd}
                    placeholder="password"
                    onChange={( evt ) => setPwd(evt.target.value)}
                />
            </div>
            <div className="center-btn-div">
                <button className="signin-btn" onClick={() => console.log(pwd)}>Sign in</button>
            </div>
            <p className="info-text">- or create an account -</p>
        </div>
    );
};

export default SignIn;
