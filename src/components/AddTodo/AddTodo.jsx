import React, { useState, useCallback } from 'react';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './addTodo.scss';

const AddTodo = ( props ) => {

    const [text, setText] = useState('');

    const handleClick = useCallback(() => {
        props.onAddClick(text);
        setText('');
    });

    return (
        <div className="container">
            <input
                type="form"
                className="input-field"
                value={text}
                placeholder="todo..."
                onChange={( evt ) => setText(evt.target.value)}
                onKeyPress={( evt ) => {if (evt.charCode === 13 && text !== '') handleClick();}}
            />
            <button aria-label="add" onClick={handleClick}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );

};

export default AddTodo;
