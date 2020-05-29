import React, { useState, useCallback } from 'react';

import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './editList.scss';

const EditList = ({ onEditClick, setVisible }) => {

    const [text, setText] = useState('');

    const handleClick = useCallback(() => {
        if (text !== '') {
            setVisible(false);
            onEditClick(text)
        }
    }, [onEditClick, setVisible, text]);

    return (
        <div className="contents">
            <div className="editlist-header">
                <p>Edit list name</p>
                <FontAwesomeIcon className="editlist-close-icon" icon={faTimes} onClick={() => setVisible(false)} />
            </div>
            <div className="form-container">
                <input
                    type="form"
                    value={text}
                    placeholder="new list name..."
                    onChange={( evt ) => setText(evt.target.value)}
                    onKeyPress={( evt ) => {if (evt.charCode === 13 && text !== '') handleClick()}}
                    autoFocus={true}
                />
            <button aria-label="add" className="icon-btn" onClick={handleClick}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            </div>
        </div>
    );
};

export default EditList;
