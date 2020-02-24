import React from 'react';

const TodoItem = ({ id, desc, completed }) => (
    <div>
        <div className="desc"><label>{desc}</label></div>
    </div>
);

export default TodoItem;
