import React from 'react';

import './mainContainer.scss';

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
    }

    /**
     * Load the data from LocalStorage
     * If there is no data in LocalStorage, return an empty array
     * Otherwise return the JSON data
     */
    loadData = () => {
        const data = JSON.parse(localStorage.getItem('data'));
        if (data !== null && data.length !== 0) {
            return [data, Object.keys(data)[0]];
        } else {
            return [{"default" : []}, "default"];
        }
    }

    /**
     * Saves the data to LocalStorage
     */
    saveData = () => {
        localStorage.setItem('data', JSON.stringify(this.state.todos));
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

    render() {
        return(
            <div className="app">
                <h1>Think of many things, do one.</h1>
                <Summary
                    todoCount={this.state.todos[this.state.active].length}
                    completedCount={
                        this.state.todos[this.state.active].filter(x => x.completed === true).length
                    }
                />
                <AddTodo onAddClick={this.addNew} />
                <TodoList
                    todoItems={this.state.todos[this.state.active]}
                    onDeleteClick={this.deleteTodo}
                    onCheckClick={this.checkTodo}
                />
            </div>
        );
    }
}
