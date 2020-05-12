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

    const Auth = useContext(AuthContext);

    useEffect(() => {
        if (email !== '' && pwd !== '' && confirmPwd !== '')
            if (errors.emailError === '' && errors.pwdError === '' && errors.confirmPwdError === '') {
                setValid(true);
            } else {
                setValid(false);
            }
    }, [errors, setValid, email, pwd, confirmPwd]);

    const handleChange = ( evt, type ) => {

        switch(type) {
            case 'email':
                setEmail(evt.target.value);

                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(evt.target.value)) {
                    setErrors({...errors, emailError: ''});
                } else {
                    setErrors({...errors, emailError: 'Please enter a correct email address'});
                }

                break;
            case 'pwd':
                setPwd(evt.target.value);

                if (evt.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,200}$/)) {
                    setErrors({...errors, pwdError: ''});
                } else {
                    setErrors({...errors, pwdError: 'Passwords should be at least 8 characters, one digit, one uppercase letter, and one lowercase letter.'});
                }

                break;
            case 'confirmPwd':
                setConfirmPwd(evt.target.value);

                if (evt.target.value !== pwd) {
                    setErrors({...errors, confirmPwdError: 'Passwords doesn\'t match'});
                } else {
                    setErrors({...errors, confirmPwdError: ''});
                }

                break;
            default:
                console.log('wrong form type');
                break;
        }
    };

    const createUser = () => {
        firebase.auth().createUserWithEmailAndPassword(email, pwd).then(res => {
            if (res.user) Auth.setLoggedIn(true);

            setEmail('');
            setPwd('');
            setConfirmPwd('');
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
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
                    onChange={( evt ) => handleChange(evt, 'email')}
                />
            </div>
            <p>{errors.emailError}</p>
            <div className="form-container">
                <input
                    type="password"
                    className="input-field"
                    value={pwd}
                    placeholder="password"
                    onChange={( evt ) => handleChange(evt, 'pwd')}
                />
            </div>
            <p>{errors.pwdError}</p>
            <div className="form-container">
                <input
                    type="password"
                    className="input-field"
                    value={confirmPwd}
                    placeholder="confirm password"
                    onChange={( evt ) => handleChange(evt, 'confirmPwd')}
                />
            </div>
            <p>{errors.confirmPwdError}</p>
            <div className="center-btn-div">
                <button style={{backgroundColor: valid ? '#d77a61' : '#6f6f6f', color: valid ? '#7e2626' : '#292929'}} onClick={() => createUser()}>Sign up</button>
            </div>
        </div>
    );

};

export default SignUp;
