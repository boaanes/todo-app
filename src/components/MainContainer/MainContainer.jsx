import React from 'react';

import './mainContainer.scss';

import ListSelect from '../ListSelect/ListSelect';
import AddTodo from '../AddTodo/AddTodo';
import TodoList from '../TodoList/TodoList';
import Todo from './Todo';
import Summary from '../Summary/Summary';

export default class MainContainer extends React.Component {

    constructor(props) {
        super(props);
        const raw = this.loadData(); //load LocalStorage data
        const data = raw[0];
        const initList = raw[1];
        this.state = {
            todos: data, //set state
            active: initList
        };
        this.saveData();
    }

    /**
     * Load the data from LocalStorage
     * If there is no data in LocalStorage, return an empty array
     * Otherwise return the JSON data
     */
    loadData = () => {
        const data = JSON.parse(localStorage.getItem('store'));
        if (data !== null && data.length !== 0) {
            return [data, Object.keys(data)[0]];
        } else {
            return [{"Todo-list" : []}, "Todo-list"];
        }
    }

    /**
     * Saves the data to LocalStorage
     */
    saveData = () => {
        localStorage.setItem('store', JSON.stringify(this.state.todos));
    }

    /**
     * Add a new todo item to the list
     */
    addNew = ( text ) => {
        if (text !== '') {
            const currList = this.state.todos[this.state.active];
            let newID;
            //set the appropriate id
            if (currList.length === 0) {
                newID = 0;
            } else {
                newID = currList[currList.length - 1].id + 1;
            }

            const ID = newID;
            const newList = this.state.todos[this.state.active].concat(new Todo(ID, text, false));
            let newData = this.state.todos;
            newData[this.state.active] = newList;
            const updated = newData;
            this.setState(
                { todos: updated },
                () => {
                    this.saveData();
                }
            );
        }
    }

    /**
     * Handle checkbox-click
     */
    checkTodo = ( id ) => {
        this.state.todos[this.state.active].forEach(( todo ) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
        });

        this.setState(
            { todos: this.state.todos },
            () => {
                this.saveData();
            }
        );
    }

    /**
     * Delete a todo given the id
     */
    deleteTodo = ( id ) => {
        const newList = this.state.todos[this.state.active].filter(x => x.id !== id);
        let newData = this.state.todos;
        newData[this.state.active] = newList;
        const updated = newData;
        this.setState(
            { todos: updated },
            () => {
                this.saveData();
            }
        );
    }

    /**
     * Delete all todos
     * currently not used at all
     */
    deleteAll = () => {
        this.setState(
            { todos: [] },
            () => {
                this.saveData();
            }
        );
    }

    /**
    *  Set active dropdown list
    */
    setActive = ( name ) => {
        this.setState(
            { active: name },
            () => {
                this.saveData();
            }
        );
    }

    addNewList = ( name ) => {
        let currentState = this.state.todos;
        currentState[name] = []

        const updated = currentState;
        this.setState(
            { todos: updated },
            () => {
                this.saveData();
            }
        );
    }

    deleteList = ( name ) => {
        let newTodos = this.state.todos;
        delete newTodos[name];

        const updated = newTodos;
        this.setState(
            { todos: updated, active: this.state.active },
            () => {
                this.saveData();
            }
        );
    }

    render() {
        const {todos, active} = this.state;

        return(
            <div className="app">
                <ListSelect
                    lists={todos}
                    active={active}
                    setActive={this.setActive}
                    addNewList={this.addNewList}
                    deleteList={this.deleteList}
                />
                <br/>
                <Summary
                    todoCount={todos[active].length}
                    completedCount={
                        todos[active].filter(x => x.completed === true).length
                    }
                />
                <br/>
                <AddTodo onAddClick={this.addNew} />
                <TodoList
                    todoItems={todos[active]}
                    onDeleteClick={this.deleteTodo}
                    onCheckClick={this.checkTodo}
                />
            </div>
        );
    }
}
