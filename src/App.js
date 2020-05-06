import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import firebase from './firebase.config';

import './app.scss';

import MainContainer from './components/MainContainer/MainContainer';
import SignUp from './components/SignUp/SignUp';
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
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <MainContainer />
                        </Route>
                        <Route path="/signup">
                            <SignUp />
                        </Route>
                    </Switch>
                </Router>
                <Footer />
            </div>
        </AuthContext.Provider>
    );
};

export default App;
