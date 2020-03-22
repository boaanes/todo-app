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
    if (data !== null && data.length !== 0) return [data, Object.keys(data)[0]];
    else return [{"Todo-list" : []}, "Todo-list"];
}

const MainContainerHooks = ( props ) => {

    const [todos, setTodos] = useState(() => getInitialState()[0]);
    const [active, setActive] = useState(() => getInitialState()[1]);

    const saveData = useCallback(() => {
        localStorage.setItem('store', JSON.stringify(todos));
    }, [todos]);

    const newTodo = useCallback(( text ) => {
        if (text !== '') {
            console.log("adding: " + text);
            const id = (todos[active].length === 0) ? 0 : todos[active][todos[active].length - 1].id + 1;
            const newList = todos[active].concat(new Todo(id, text, false));
            setTodos({ ...todos, active: newList});
        }
    }, [todos, active]);


    const checkTodo = useCallback(( id ) => {
        console.log("check" + id);
        setTodos(( prevTodos ) => {
            prevTodos[active].forEach(( todo ) => {
                if (todo.id === id) todo.completed = !todo.completed;
            });
            return prevTodos;
        });
    }, [active]);

    const deleteTodo = useCallback(( id ) => {
        console.log("delete" + id);
        const newList = todos[active].filter(todo => todo.id !== id);
        setTodos({ ...todos, active: newList});
    }, [todos, active]);

    return(
        <div className="app">
            <ListSelect
                lists={todos}
                active={active}
                setActive={setActive}
                addNewList={( name ) => {
                    setTodos(prevTodos => {
                        prevTodos[name] = [];
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
            />
            <br />
            <Summary
                todoCount={todos[active].length}
                completedCount={todos[active].filter(todo => todo.completed === true).length}
            />
            <br />
            <AddTodo onAddClick={newTodo} />
            <TodoList
                todoItems={todos[active]}
                onDeleteClick={deleteTodo}
                onCheckClick={checkTodo}
            />
        </div>
    );
};

export default MainContainerHooks;
