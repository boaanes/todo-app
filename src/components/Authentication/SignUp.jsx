import React, { useState } from 'react';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

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
            <button className="signin-btn" onClick={() => console.log(pwd)}>Sign up</button>
        </div>
        </>
    );

};

export default SignUp;
