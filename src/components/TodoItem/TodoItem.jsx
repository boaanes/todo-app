import React from 'react';
import { Checkbox, Button } from 'semantic-ui-react';

const TodoItem = ({ id, desc, completed, onDeleteClick, onCheckClick }) => (
    <div>
        <Checkbox checked={assertChecked(completed)} onChange={() => onCheckClick(id)} />
        <div className="desc"><label>{desc}</label></div>
        <Button content="delete" onClick={() => onDeleteClick(id)} />
    </div>
);

function assertChecked(completed) {
    if (completed) {
        return true;
    }
    return false;
}

export default TodoItem;
