import React from 'react';

import { faAngleUp, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from '../Modal/Modal';
import EditList from '../EditList/EditList';

import './title.scss';

const Title = ( props ) => {

    return (
        <div className="title">
            <div className="title-text">{props.title}</div>
            <div className="title-btns">
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
                <div className="title-btns-wrapper">
                    <FontAwesomeIcon
                        className={(props.listOpen) ? "dropdown-icon-up" : "dropdown-icon-down"}
                        icon={faAngleUp}
                        size="2x"
                        onClick={() => props.setListOpen(prevListOpen => !prevListOpen)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Title;
