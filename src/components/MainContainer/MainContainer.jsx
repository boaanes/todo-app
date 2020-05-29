import React, { useCallback } from 'react';

import './mainContainer.scss';

import ListSelect from '../ListSelect/ListSelect';
import AddTodo from '../AddTodo/AddTodo';
import TodoList from '../TodoList/TodoList';
import Todo from './Todo';
import Summary from '../Summary/Summary';

const MainContainer = ({ getLocalStorage, saveData, todos, setTodos, active, setActive }) => {

    const updateActive = useCallback(( id ) => {
        setActive(todos[id]);
    }, [setActive, todos]);

    const updateList = useCallback(( id, newList ) => {
        setTodos({...todos, [String(id)]: newList});
        setActive(newList);
        saveData({...todos, [String(id)]: newList});
    }, [todos, setTodos, setActive, saveData]);

    const newTodo = ( text ) => {
        if (text !== '') {
            const items = active.items;
            const id = (items.length === 0) ? 0 : items.slice(-1)[0].id + 1;
            const newList = {"id":active.id,"name":active.name,"items":items.concat(new Todo(id, text, false))};
            updateList(active.id, newList);
        }
    };

    const checkTodo = ( id ) => {
        const newList = active.items;
        newList.forEach(( todo ) => {
            if (todo.id === id) todo.completed = !todo.completed;
        });

        updateList(active.id, {"id":active.id,"name":active.name,"items":newList});
    };

    const deleteTodo = ( id ) => {
        const newList = active.items.filter(todo => todo.id !== id);
        updateList(active.id, {"id":active.id,"name":active.name,"items":newList});
    };

    const editListName = ( name ) => {
        if (name !== active.name) {
            const newList = {"id":active.id,"name":name,"items":active.items};
            updateList(active.id, newList);
        }
    };

    // TODO: make new list active
    const addNewList = useCallback(( name ) => {
        const id = parseInt(Object.keys(todos).slice(-1)[0]) + 1;
        setTodos(prevTodos => {
            prevTodos[id] = {"id":id,"name":name,"items":[]};
            saveData(prevTodos);
            return prevTodos;
        });
    }, [todos, setTodos, saveData]);

    const deleteList = useCallback(( id ) => {
        const current = JSON.parse(JSON.stringify(todos));
        delete current[id];
        setTodos(current);
        saveData(current);
    }, [todos, setTodos, saveData]);

    return (
        <div className="main-container">
            <ListSelect
                todos={todos}
                active={active}
                setActive={( id ) => updateActive(id)}
                addNewList={( name ) => addNewList(name)}
                deleteList={( id ) => deleteList(id)}
                editListName={( name ) => editListName(name)}
            />
            <Summary
                todoCount={active.items.length}
                completedCount={active.items.filter(todo => todo.completed === true).length}
            />
            <AddTodo onAddClick={newTodo} />
            <TodoList
                todoItems={active.items}
                onDeleteClick={deleteTodo}
                onCheckClick={checkTodo}
            />
        </div>
    );
};

export default MainContainer;
