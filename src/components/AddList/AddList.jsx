import React, { useState, useCallback } from 'react';

import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './addList.scss';

const AddList = ({ onAddClick, setVisible }) => {

    const [text, setText] = useState('');

    const handleClick = useCallback(() => {
        if (text !== '') {
            setVisible(false);
            onAddClick(text);
        }
    }, [onAddClick, setVisible, text]);

    return (
        <div className="contents">
            <div className="newlist-header">
                <p>Add a new list</p>
                <FontAwesomeIcon className="newlist-close-icon" icon={faTimes} onClick={() => setVisible(false)} />
            </div>
            <div className="form-container">
                <input
                    type="form"
                    value={text}
                    placeholder="new list..."
                    onChange={( evt ) => setText(evt.target.value)}
                    onKeyPress={( evt ) => {if (evt.charCode === 13 && text !== '') handleClick()}}
                    autoFocus={true}
                />
                <button aria-label="add" className="icon-btn" onClick={handleClick}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
};

export default AddList;
