import React from 'react';

import './mainContainer.scss';

import AddTodo from '../AddTodo/AddTodo';
import TodoList from '../TodoList/TodoList';
import Todo from './Todo';
import Summary from '../Summary/Summary';

export default class MainContainer extends React.Component {

    constructor(props) {
        super(props);
        const data = this.loadData(); //load LocalStorage data
        this.state = {
            todos: data //set state
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
            return data;
        } else {
            return [];
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
            let newID;

            //set the appropriate id
            if (this.state.todos.length === 0) {
                newID = 0;
            } else {
                newID = this.state.todos[this.state.todos.length - 1].id + 1;
            }

            const ID = newID;
            const newTodos = this.state.todos.concat(new Todo(ID, text, false));
            this.setState(
                { todos: newTodos },
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
        this.state.todos.forEach(( todo ) => {
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
        const newTodos = this.state.todos.filter(x => x.id !== id);
        this.setState(
            { todos: newTodos },
            () => {
                this.saveData();
            }
        );
    }

    /**
     * Delete all todos
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
                    todoCount={this.state.todos.length}
                    completedCount={
                        this.state.todos.filter(x => x.completed === true).length
                    }
                />
                <AddTodo onAddClick={this.addNew} />
                <TodoList
                    todoItems={this.state.todos}
                    onDeleteClick={this.deleteTodo}
                    onCheckClick={this.checkTodo}
                />
            </div>
        );
    }
}
