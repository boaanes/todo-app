import React, { useState, useCallback } from 'react';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './addTodo.scss';

const AddTodo = ({ onAddClick }) => {

    const [text, setText] = useState('');

    const handleClick = useCallback(() => {
        onAddClick(text);
        setText('');
    }, [onAddClick, text]);

    return (
        <div className="form-container">
            <input
                type="form"
                className="input-field"
                value={text}
                placeholder="todo..."
                onChange={( evt ) => setText(evt.target.value)}
                onKeyPress={( evt ) => {if (evt.charCode === 13 && text !== '') handleClick()}}
            />
            <button aria-label="add" onClick={handleClick}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );

};

export default AddTodo;
