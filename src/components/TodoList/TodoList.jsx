import React from 'react';

import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todoItems, onDeleteClick, onCheckClick }) => (
    <div className="todo-list">
        {todoItems.map(todoItem => (
            <TodoItem
                key={todoItem.id}
                id={todoItem.id}
                desc={todoItem.desc}
                completed={todoItem.completed}
                onDeleteClick={onDeleteClick}
                onCheckClick={onCheckClick}
            />
        ))}
    </div>
);

export default TodoList;
