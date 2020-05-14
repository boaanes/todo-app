import React, { useState, useContext, useEffect } from 'react';
import firebase from '../../firebase.config';

import { AuthContext } from '../../App';

import './signUp.scss'

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [errors, setErrors] = useState({
        emailError: '',
        pwdError: '',
        confirmPwdError: ''
    });
    const [valid, setValid] = useState(false);
    const [firebaseError, setFirebaseError] = useState('');

    const Auth = useContext(AuthContext);

    useEffect(() => {
        if (email !== '' && pwd !== '' && confirmPwd !== '') {
            if (errors.emailError === '' && errors.pwdError === '' && errors.confirmPwdError === '') {
                if (pwd === confirmPwd) {
                    setValid(true);
                    return;
                } else {
                    setErrors({...errors, confirmPwdError: 'Passwords doesn\'t match'});
                }
            }
        }

        setValid(false);
    }, [errors, setErrors, setValid, email, pwd, confirmPwd]);

    const handleChange = ( evt, type ) => {

        switch(type) {
            case 'email':
                setEmail(evt.target.value);

                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(evt.target.value)) {
                    setErrors({...errors, emailError: ''});
                } else {
                    setErrors({...errors, emailError: 'please enter a correct email address'});
                }

                break;
            case 'pwd':
                setPwd(evt.target.value);

                if (evt.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,200}$/)) {
                    setErrors({...errors, pwdError: ''});
                } else {
                    setErrors({...errors, pwdError: 'passwords should be at least 8 characters, one digit, one uppercase letter, and one lowercase letter.'});
                }

                break;
            case 'confirmPwd':
                setConfirmPwd(evt.target.value);

                if (evt.target.value !== pwd) {
                    setErrors({...errors, confirmPwdError: 'passwords doesn\'t match'});
                } else {
                    setErrors({...errors, confirmPwdError: ''});
                }

                break;
            default:
                console.log('wrong form type');
                break;
        }
    };

    const createUser = ( evt ) => {
        if (valid) {
            firebase.auth().createUserWithEmailAndPassword(email, pwd).then(res => {
                if (res.user) Auth.setLoggedIn(true);

                setEmail('');
                setPwd('');
                setConfirmPwd('');
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                setFirebaseError(errorMessage);
            });
        }

        evt.preventDefault();
    };

    return (
        <div className="main-container">
            <h1>Sign up:</h1>
            {Auth.loggedIn &&
            <p>You are already signed in</p>}
            {!Auth.loggedIn && <div>
                <form onSubmit={createUser} id="form-signup">
                    <input
                        type="email"
                        className="signup-field"
                        autoComplete="email"
                        value={email}
                        placeholder="email"
                        onChange={( evt ) => handleChange(evt, 'email')}
                    />
                    <p className="error-msg">{errors.emailError}</p>
                    <input
                        type="password"
                        className="signup-field"
                        autoComplete="new-password"
                        value={pwd}
                        placeholder="password"
                        onChange={( evt ) => handleChange(evt, 'pwd')}
                    />
                    <p className="error-msg">{errors.pwdError}</p>
                    <input
                        type="password"
                        className="signup-field"
                        autoComplete="new-password"
                        value={confirmPwd}
                        placeholder="confirm password"
                        onChange={( evt ) => handleChange(evt, 'confirmPwd')}
                    />
                    <p className="error-msg">{errors.confirmPwdError}</p>
                </form>
            </div>}
            {!Auth.loggedIn && <div>
                <button
                    type="submit"
                    form="form-signup"
                    className="center-btn"
                    style={{
                        backgroundColor: valid ? '#d77a61' : '#6f6f6f',
                        color: valid ? '#7e2626' : '#292929'
                    }}
                >Sign up</button>
            </div>}
            <p className="error-msg">{firebaseError}</p>
        </div>
    );

};

export default SignUp;
