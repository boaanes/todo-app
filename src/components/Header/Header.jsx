import React from 'react';
import { Link } from 'react-router-dom';

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SignIn from '../SignIn/SignIn';
import HeaderError from './HeaderError';

import './header.scss';

const Header = ({ user, login, logout, error, setError }) => {

    return (
        <div className="header">
            <div className="header-container left">
                <Link to="/">
                    <button className="header-btn home-btn"><FontAwesomeIcon icon={faHome} size="2x" /></button>
                </Link>
            </div>
            <div className="header-container" style={{margin: (error !== '') ? 'auto' : ''}}>
                {!user &&
                    <>
                    {error === '' &&
                        <div>
                            <SignIn login={login} />
                        </div>
                    }
                    {error !== '' &&
                        <div>
                            <HeaderError errorMsg={error} setError={setError} />
                        </div>
                    }
                    </>
                }
                {user &&
                    <div className="login-container">
                        <div style={{margin: 'auto', display: 'flex'}}>
                            <p>{user.email}</p>
                            <Link to="/">
                                <button className="header-btn" onClick={logout}>Sign Out</button>
                            </Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Header;
