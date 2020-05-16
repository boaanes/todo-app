import React, { useEffect } from 'react';

import './mainContainer.scss';

import ListSelect from '../ListSelect/ListSelect';
import AddTodo from '../AddTodo/AddTodo';
import TodoList from '../TodoList/TodoList';
import Todo from './Todo';
import Summary from '../Summary/Summary';

const MainContainer = ({ getInitialState, saveData, todos, setTodos, active, setActive }) => {

    useEffect(() => {
        saveData();
    });

    const updateActive = ( name ) => {
        setActive(name);
    };

    const updateList = ( list, newList ) => {
        setTodos({...todos, [list]: newList});
    };

    const newTodo = ( text ) => {
        if (text !== '') {
            const id = (todos[active].length === 0) ? 0 : todos[active][todos[active].length - 1].id + 1;
            const newList = todos[active].concat(new Todo(id, text, false));
            updateList(active, newList);
        }
    };

    const checkTodo = ( id ) => {
        const newList = todos[active];
        newList.forEach(( todo ) => {
            if (todo.id === id) todo.completed = !todo.completed;
        });

        updateList(active, newList);
    };

    const deleteTodo = ( id ) => {
        const newList = todos[active].filter(todo => todo.id !== id);
        updateList(active, newList);
    };

    const editListName = ( name ) => {
        if (name !== active) {
            Object.defineProperty(todos, name, Object.getOwnPropertyDescriptor(todos, active));
            delete todos[active];
            setActive(name);
        }
    };

    return (
        <div className="main-container">
            <ListSelect
                todos={todos}
                active={active}
                setActive={updateActive}
                addNewList={( name ) => {
                    setTodos(prevTodos => {
                        prevTodos[name] = [];
                        setActive(name);
                        saveData();
                        return prevTodos;
                    });
                }}
                deleteList={( name ) => {
                    setTodos(prevTodos => {
                        delete prevTodos[name];
                        return prevTodos;
                    });
                }}
                editListName={editListName}
                saveData={saveData}
            />
            <br/>
            <Summary
                todoCount={todos[active].length}
                completedCount={todos[active].filter(todo => todo.completed === true).length}
            />
            <AddTodo onAddClick={newTodo} />
            <TodoList
                todoItems={todos[active]}
                onDeleteClick={deleteTodo}
                onCheckClick={checkTodo}
            />
        </div>
    );
};

export default MainContainer;
