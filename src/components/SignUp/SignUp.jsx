import React, { useState, useContext } from 'react';
import firebase from '../../firebase.config';

import { AuthContext } from '../../App';

import './signUp.scss'

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const Auth = useContext(AuthContext);

    const createUser = () => {
        firebase.auth().createUserWithEmailAndPassword(email, pwd).then(res => {
            if (res.user) Auth.setLoggedIn(true);
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });

        setEmail('');
        setPwd('');
        setConfirmPwd('');
    };

    return (
        <div className="main-container">
            <h1>Sign up:</h1>
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
            <div className="form-container">
                <input
                    type="password"
                    className="input-field"
                    value={confirmPwd}
                    placeholder="confirm password"
                    onChange={( evt ) => setConfirmPwd(evt.target.value)}
                />
            </div>
            <div className="center-btn-div">
                <button className="signin-btn" onClick={() => createUser()}>Sign up</button>
            </div>
        </div>
    );

};

export default SignUp;
