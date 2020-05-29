import React from 'react';

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './todoItem.scss';

const TodoItem = ({ id, desc, completed, onDeleteClick, onCheckClick }) => (
    <div className="item">
        <input type="checkbox" checked={completed} id={`todoItemCheckbox-${id}`} onChange={() => onCheckClick(id)} />
        <label style={{textDecoration: completed ? 'line-through': 'none', color: completed ? 'grey': ''}}  htmlFor={`todoItemCheckbox-${id}`}>{desc}</label>
        <div className="button-holder">
            <button className="icon-btn" onClick={() => onDeleteClick(id)}>
                <FontAwesomeIcon icon={faTimes} style={{transform: "scale(1.25)"}}/>
            </button>
        </div>
    </div>
);

export default TodoItem;
