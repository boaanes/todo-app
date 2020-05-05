import React, { useState } from 'react';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

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
            <button className="signin-btn" onClick={() => console.log(pwd)}>Sign in</button>
        </div>
        </>
    );

};

export default SignIn;
