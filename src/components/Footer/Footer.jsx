import React from 'react';

import './footer.scss';

const Footer = () => (
        <div className="footer">
            <div className="logo-container">
                <img
                    className="github-logo"
                    src={require('../../assets/github-logo.png')}
                    onClick={() => window.open("https://github.com/boaanes/todo-app/", '_blank').focus()}
                    alt="Github Link"
                />
                <img
                    className="mail-logo"
                    src={require('../../assets/mail-logo.png')}
                    onClick={() => window.open("mailto:boaanes@gmail.com", '_blank').focus()}
                    alt="Send me a mail!"
                />
            </div>
            <div className="signature">
                <p>Bo Aanes - 2020</p>
            </div>
        </div>
);

export default Footer;
