import React from 'react';

import './footer.scss';

const Footer = () => (
        <div className="footer">
            <div className="logo-container">
                <div className="logo-left">
                    <img
                        className="github-logo"
                        src={require('../../assets/github-logo.png')}
                        onClick={() => window.open("https://github.com/boaanes/todo-app/", '_blank').focus()}
                        alt="Github Link"
                    />
                </div>
                <div className="logo-right">
                    <img
                        className="mail-logo"
                        src={require('../../assets/mail-logo.png')}
                        onClick={() => window.open("mailto:boaanes@gmail.com", '_blank').focus()}
                        alt="Send me a mail!"
                    />
                </div>
            </div>
            <div className="signature">
                <p>Bo Aanes - 2021</p>
            </div>
        </div>
);

export default Footer;
