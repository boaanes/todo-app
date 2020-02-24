import React from 'react';

import TodoItem from './TodoItem';

const TodoList = ({ todoItems }) => (
    <div className="todo-list">
        {todoItems.map(todoItem => (
            <TodoItem
                key={todoItem.id}
                id={todoItem.id}
                desc={todoItem.desc}
            />
        ))}
    </div>
);

export default TodoList;
