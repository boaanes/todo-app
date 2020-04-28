import React from 'react';

import { faAngleUp, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from '../Modal/Modal';
import EditList from '../EditList/EditList';

import './header.scss';

const Header = ( props ) => {

    return (
        <div className="header">
            <div className="header-title">{props.title}</div>
            <div>
                <Modal activator={({ setVisible }) => (
                    <FontAwesomeIcon
                        className="edit-icon"
                        icon={faEdit}
                        size="2x"
                        onClick={() => setVisible(true)}
                    />
                )}>
                    <EditList onEditClick={props.editListName} />
                </Modal>
                <FontAwesomeIcon
                    className={(props.listOpen) ? "dropdown-icon-up" : "dropdown-icon-down"}
                    icon={faAngleUp}
                    size="2x"
                    onClick={() => props.setListOpen(prevListOpen => !prevListOpen)}
                />
            </div>
        </div>
    );
};

export default Header;
