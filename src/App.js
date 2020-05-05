import React from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './app.scss';

import MainContainer from './components/MainContainer/MainContainer';
import SignIn from './components/SignIn/SignIn';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
    return (
        <div className="container">
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <MainContainer />
                    </Route>
                    <Route path="/signin">
                        <SignIn />
                    </Route>
                </Switch>
            </Router>
            <Footer />
        </div>
    );
};

export default App;
