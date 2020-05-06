import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import firebase from './firebase.config';

import './app.scss';

import MainContainer from './components/MainContainer/MainContainer';
import Authentication from './components/Authentication/Authentication';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export const AuthContext = React.createContext(null);

const App = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) setLoggedIn(true);
        else setLoggedIn(false);
    });

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            <div className="container">
                <p>Is logged in? {JSON.stringify(loggedIn)}</p>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <MainContainer />
                        </Route>
                        <Route path="/signin">
                            <Authentication />
                        </Route>
                    </Switch>
                </Router>
                <Footer />
            </div>
        </AuthContext.Provider>
    );
};

export default App;
