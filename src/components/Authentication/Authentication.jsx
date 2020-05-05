import React from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp';

import './authentication.scss';
import '../MainContainer/mainContainer.scss';

const Authentication = () => {

    return(
        <div className="main-container">
            <h1>Sign in:</h1>
            <SignIn />
            <p className="info-text">- or create an account -</p>
            <SignUp />
        </div>
    );
};

export default Authentication;
