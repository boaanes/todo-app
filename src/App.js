import React from 'react';
import './app.scss';

import MainContainerHooks from './components/MainContainer/MainContainerHooks';
import Footer from './components/Footer/Footer'

const App = () => (
    <div className="container">
        <MainContainerHooks />
        <Footer />
    </div>
)

export default App;
