import React, { useState } from 'react';
import './app.scss';

import MainContainer from './components/MainContainer/MainContainer';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';

const App = () => {

    const [visible, setVisible] = useState(true);

    return (
        <div className="container">
            <MainContainer />
            <Footer />
            {visible &&
                <div className="modal-container">
                    <Modal />
                </div>
            }
        </div>
    );
};

export default App;
