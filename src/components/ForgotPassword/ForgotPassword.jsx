import React, { useState } from 'react';

const ForgotPassword = ({ user, reset, status }) => {

    const [email, setEmail] = useState('');

    const resetPassword = ( evt ) => {
        reset(email);
        setEmail('');

        evt.preventDefault();
    };

    return (
        <div className="main-container">
            <h1>Reset password</h1>
            <div>
                <form onSubmit={( evt ) => resetPassword(evt)} id="form-reset-password">
                    <input
                        type="email"
                        className="signup-field"
                        autoComplete="email"
                        value={email}
                        placeholder="email"
                        onChange={( evt ) => setEmail(evt.target.value)}
                    />
                </form>
            </div>
            <div>
                <button
                    type="submit"
                    form="form-reset-password"
                    className="center-btn"
                >Send email</button>
            </div>
            <p style={{marginTop: '1rem'}} className="error-msg">{status}</p>
        </div>
    );
};

export default ForgotPassword;
