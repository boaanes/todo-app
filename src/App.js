import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useObject } from 'react-firebase-hooks/database';

import firebase from './firebase.config';

import './app.scss';

import MainContainer from './components/MainContainer/MainContainer';
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoadingBox from './components/LoadingBox/LoadingBox';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

const getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('todo-lists'));
    return (data !== null && data.length !== 0) ? data : {"0":{"id":0,"name":"Todo-list","items":[]}};
}

const App = () => {

    const [user, loadingUser, userError] = useAuthState(firebase.auth());
    const [todos, setTodos] = useState(() => getLocalStorage());
    const [active, setActive] = useState(Object.values(todos)[0]);

    const [loginError, setLoginError] = useState('');
    const [signUpError, setSignUpError] = useState('');
    const [resetStatus, setResetStatus] = useState('');

    const [snapshot, loadingDatabase, databaseError] = useObject(user ? firebase.database().ref('users/' + user.uid) : null);
    const [online, setOnline] = useState(false);

    useEffect(() => {
        if (!user && online) {
            setOnline(false);
            setTodos(() => getLocalStorage());
            setActive(() => Object.values(getLocalStorage())[0]);
        } else if (user && !loadingDatabase && snapshot) {
            if (snapshot.val()) {
                const json = JSON.parse(snapshot.val());
                setTodos(json);
            }
            if (!online) {
                setOnline(true);
                if (snapshot.val()) {
                    setActive(Object.values(JSON.parse(snapshot.val()))[0]);
                }
            }
        }
    }, [loadingDatabase, snapshot, user, setTodos, online, setOnline]);

    const handleError = ( err ) => {
        switch(err.code) {
            case 'auth/internal-error':
                if (err.message.includes('"status":"PERMISSION_DENIED"')) return 'permission denied, your browser shields may be breaking the website';
                else return 'Something went wrong, please try again later...';
            case 'auth/email-already-exists':
                return 'That email address is already in use';
            case 'auth/email-already-in-use':
                return 'That email address is already in use';
            case 'auth/invalid-email':
                return 'Your email address seems to be badly formatted';
            case 'auth/invalid-email-verified':
                return 'Please verify your email address';
            case 'auth/invalid-password':
                return 'Password is invalid, please try again';
            case 'auth/wrong-password':
                return 'Wrong combination of email and password, please try again';
            case 'auth/user-not-found':
                return 'Email address not found, please try again';
            default:
                return 'Something went wrong, please try again later... ' + err.code;
        }
    };

    const login = ( email, password ) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then().catch(err => setLoginError(handleError(err)));
    };

    const logout = () => {
        firebase.auth().signOut();
    };

    const createUser = ( email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then().catch(err => setSignUpError(handleError(err)));
    };

    const resetPassword = ( email ) => {
        firebase.auth().sendPasswordResetEmail(email).then(() => setResetStatus("Email sent")).catch(err => setResetStatus(handleError(err)));
    };

    const saveData = ( data ) => {
        if (user && online) {
            firebase.database().ref('users/' + user.uid).set(JSON.stringify(data));
        } else if (!user && !online) {
            localStorage.setItem('todo-lists', JSON.stringify(data));
        }
    };

    return (
        <div className="container">
            <Router>
                <Header
                    user={user}
                    login={login}
                    logout={logout}
                    error={loginError}
                    setError={setLoginError}
                />
                {userError && !user && <LoadingBox text={userError} />}
                {loadingUser && !user && <LoadingBox text="Logging in..." />}
                <Switch>
                    <Route exact path="/">
                        {databaseError && <LoadingBox text={userError} />}
                        {loadingDatabase && <LoadingBox text="Loading data..." />}
                        {!loadingDatabase && snapshot && online &&
                        <MainContainer
                            user={user}
                            getLocalStorage={getLocalStorage}
                            saveData={saveData}
                            todos={JSON.parse(snapshot.val())}
                            setTodos={(newTodos) => setTodos(newTodos)}
                            active={active}
                            setActive={setActive}
                        />}
                        {!user && !loadingUser && !online &&
                        <MainContainer
                            user={user}
                            getLocalStorage={getLocalStorage}
                            saveData={saveData}
                            todos={todos}
                            setTodos={setTodos}
                            active={active}
                            setActive={setActive}
                        />}
                    </Route>
                    <Route path="/signup">
                        <SignUp
                            user={user}
                            create={createUser}
                            firebaseError={signUpError}
                        />
                    </Route>
                    <Route path="/reset-password">
                        <ForgotPassword
                            user={user}
                            reset={resetPassword}
                            status={resetStatus}
                        />
                    </Route>
                </Switch>
            </Router>
            <Footer />
        </div>
    );
};

export default App;
