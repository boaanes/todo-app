import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useObject } from 'react-firebase-hooks/database';

import firebase from './firebase.config';

import './app.scss';

import MainContainer from './components/MainContainer/MainContainer';
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// TODO: make this return last active as active
const getInitialState = () => {
    const data = JSON.parse(localStorage.getItem('store'));
    return (data !== null && data.length !== 0) ? [data, Object.keys(data)[0]] : [{"Todo-list" : []}, "Todo-list"];
}

const App = () => {

    const [user, loadingUser, userError] = useAuthState(firebase.auth());
    const [todos, setTodos] = useState({"Todo-list" : []});
    const [active, setActive] = useState("Todo-list");

    const [loginError, setLoginError] = useState('');
    const [signUpError, setSignUpError] = useState('');

    const [value, loadingDatabase, databaseError] = useObject(user ? firebase.database().ref('users/' + user.uid) : null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (user && !loadingDatabase && value && !ready) {
            const json = JSON.parse(value.node_.value_);
            setTodos(json);
            setActive(Object.keys(json)[0]);
            setReady(true);
        }
    }, [loadingDatabase, value, user, setTodos, setReady]);

    const login = ( email, password ) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then().catch((err) => {
            setLoginError(err.message);
        });
    };

    const logout = () => {
        firebase.auth().signOut();
        setReady(false);
    };

    const createUser = ( email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then().catch(err => {
            setSignUpError(err.message);
        });
    };

    const saveData = () => {
        if (user) {
            firebase.database().ref('users/' + user.uid).set(JSON.stringify(todos));
        }
    };

    return (
        <div className="container">
            {userError && !user && <div>{userError}</div>}
            {loadingUser && !user && <div>Loading user...</div>}
            <Router>
                <Header
                    user={user}
                    login={login}
                    logout={logout}
                    error={loginError}
                    setError={setLoginError}
                />
                <Switch>
                    <Route exact path="/">
                        {databaseError && <div>{databaseError}</div>}
                        {loadingDatabase && <div>Loading database..</div>}
                        {!loadingDatabase && value && ready &&
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
                        <SignUp user={user} create={createUser}/>
                    </Route>
                </Switch>
            </Router>
            <Footer />
        </div>
    );
};

export default App;
