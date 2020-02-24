import React from 'react';
import { Button } from 'semantic-ui-react';

const TodoItem = ({ id, desc, completed, onDeleteClick }) => (
    <div>
        <div className="desc"><label>{desc}</label></div>
        <Button content="delete" onClick={() => onDeleteClick(id)} />
    </div>
);

export default TodoItem;
