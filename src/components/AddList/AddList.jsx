import React, { useState } from 'react';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './addList.scss';

const AddList = ({ onAddClick }) => {

    const [text, setText] = useState('');

    return (
        <div className="contents">
            <input
                type="form"
                className="input-field"
                value={text}
                placeholder="new list..."
                onChange={( evt ) => setText(evt.target.value)}
            />
        <button aria-label="add" onClick={() => onAddClick(text)}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
};

export default AddList;
