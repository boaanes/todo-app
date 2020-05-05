import React from 'react';

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './todoItem.scss';

const TodoItem = ({ id, desc, completed, onDeleteClick, onCheckClick }) => (
    <div className="item">
        <input type="checkbox" className="check" checked={assertChecked(completed)} id={`todoItemCheckbox-${id}`} onChange={() => onCheckClick(id)} />
        <div className="desc"><label style={{textDecoration: completed ? 'line-through': 'none', color: completed ? 'grey': ''}}  htmlFor={`todoItemCheckbox-${id}`}>{desc}</label></div>
        <button className="icon-btn" onClick={() => onDeleteClick(id)}>
            <FontAwesomeIcon icon={faTimes} />
        </button>
    </div>
);

function assertChecked(b) {
    if (b) return true; else return false;
}

export default TodoItem;
