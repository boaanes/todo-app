import React, { useState, useContext } from 'react';
import firebase from '../../firebase.config';

import { AuthContext } from '../../App';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const Auth = useContext(AuthContext);

    const logIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, pwd).then(res => {
            if (res.user) Auth.setLoggedIn(true);
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });

        setEmail('');
        setPwd('');
    }

    return (
        <>
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
            <button className="signin-btn" onClick={() => logIn()}>Sign in</button>
        </div>
        </>
    );

};

export default SignIn;
