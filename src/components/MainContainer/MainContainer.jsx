import React, { useState, useEffect, useCallback } from 'react';

import './mainContainer.scss';

import ListSelect from '../ListSelect/ListSelect';
import AddTodo from '../AddTodo/AddTodo';
import TodoList from '../TodoList/TodoList';
import Todo from './Todo';
import Summary from '../Summary/Summary';

// TODO: make this return last active as active
const getInitialState = () => {
    const data = JSON.parse(localStorage.getItem('store'));
    return (data !== null && data.length !== 0) ? [data, Object.keys(data)[0]] : [{"Todo-list" : []}, "Todo-list"];
}

const MainContainer = ( props ) => {

    const [todos, setTodos] = useState(() => getInitialState()[0]);
    const [active, setActive] = useState(() => getInitialState()[1]);

    useEffect(() => {
        saveData();
    });

    const saveData = useCallback(() => {
        localStorage.setItem('store', JSON.stringify(todos));
    }, [todos]);

    const newTodo = useCallback(( text ) => {
        if (text !== '') {
            const id = (todos[active].length === 0) ? 0 : todos[active][todos[active].length - 1].id + 1;
            const newList = todos[active].concat(new Todo(id, text, false));

            setTodos({...todos, [active]: newList});
        }
    }, [todos, active]);

    const checkTodo = useCallback(( id ) => {
        const newList = todos[active];
        newList.forEach(( todo ) => {
            if (todo.id === id) todo.completed = !todo.completed;
        });

        setTodos({...todos, [active]: newList})
    }, [todos, active]);

    const deleteTodo = useCallback(( id ) => {
        const newList = todos[active].filter(todo => todo.id !== id);
        setTodos({...todos, [active]: newList});
    }, [todos, active]);

    const editListName = useCallback(( name ) => {
        if (name !== active) {
            Object.defineProperty(todos, name, Object.getOwnPropertyDescriptor(todos, active));
            delete todos[active];
            setActive(name);
        }
    }, [active, todos]);

    return (
        <div className="main-container">
            <ListSelect
                lists={todos}
                active={active}
                setActive={setActive}
                addNewList={( name ) => {
                    setTodos(prevTodos => {
                        prevTodos[name] = [];
                        setActive(name);
                        return prevTodos;
                    });
                }}
                deleteList={( name ) => {
                    setTodos(prevTodos => {
                        delete prevTodos[name];
                        saveData(); // needed, because it doesnt rerender parent
                        return prevTodos;
                    });
                }}
                editListName={editListName}
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
