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

// TODO: make this return last active as active
const getInitialState = () => {
    const data = JSON.parse(localStorage.getItem('store'));
    return (data !== null && data.length !== 0) ? [data, Object.keys(data)[0]] : [{"Todo-list" : []}, "Todo-list"];
}

const App = () => {

    const [user, loadingUser, userError] = useAuthState(firebase.auth());
    const [todos, setTodos] = useState(() => getInitialState()[0]);
    const [active, setActive] = useState(() => getInitialState()[1]);

    const [loginError, setLoginError] = useState('');
    const [signUpError, setSignUpError] = useState('');
    const [resetStatus, setResetStatus] = useState('');

    const [value, loadingDatabase, databaseError] = useObject(user ? firebase.database().ref('users/' + user.uid) : null);
    const [online, setOnline] = useState(false);

    useEffect(() => {
        if (!user && online) {
            setOnline(false);
            setTodos(() => getInitialState()[0]);
            setActive(() => getInitialState()[1]);
        } else if (user && !loadingDatabase && value && !online) {
            // bad practice??
            if (value.node_.value_) {
                const json = JSON.parse(value.node_.value_);
                setTodos(json);
                setActive(Object.keys(json)[0]);
            } else {
                setTodos(() => getInitialState()[0]);
                setActive(() => getInitialState()[1]);
            }
            setOnline(true);
        }
    }, [loadingDatabase, value, user, setTodos, online, setOnline]);

    const login = ( email, password ) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then().catch((err) => {
            setLoginError(err.message);
        });
    };

    const logout = () => {
        firebase.auth().signOut();
    };

    const createUser = ( email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then().catch(err => {
            setSignUpError(err.message);
        });
    };

    const resetPassword = ( email ) => {
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            setResetStatus("Email sent");
        }).catch(function(error) {
            setResetStatus(error.message);
        });
    }

    const saveData = () => {
        if (user && online) {
            firebase.database().ref('users/' + user.uid).set(JSON.stringify(todos));
        } else if (!user && !online) {
            localStorage.setItem('store', JSON.stringify(todos));
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
                        {!loadingDatabase && value && online &&
                        <MainContainer
                            user={user}
                            getInitialState={getInitialState}
                            saveData={saveData}
                            todos={todos}
                            setTodos={setTodos}
                            active={active}
                            setActive={setActive}
                        />}
                        {!user && !loadingUser && !online &&
                        <MainContainer
                            user={user}
                            getInitialState={getInitialState}
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
