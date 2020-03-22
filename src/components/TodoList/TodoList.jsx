import React from 'react';

import TodoItem from '../TodoItem/TodoItem';

const TodoList = ( props ) => (
    <div className="todo-list">
        {props.todoItems.map(todoItem => (
            <TodoItem
                key={todoItem.id}
                id={todoItem.id}
                desc={todoItem.desc}
                completed={todoItem.completed}
                onDeleteClick={props.onDeleteClick}
                onCheckClick={props.onCheckClick}
            />
        ))}
    </div>
);

export default TodoList;
