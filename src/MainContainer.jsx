import React from 'react';

import { Button } from 'semantic-ui-react';

import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Todo from './Todo';
import Summary from './Summary';

export default class MainContainer extends React.Component {
        
    constructor(props) {
        super(props);
        const data = this.loadData(); //load LocalStorage data
        this.state = {
            todos: data //set state
        };
    }
    
    loadData = () => {
        const data = JSON.parse(localStorage.getItem('data'));
        if (data !== null && data.length !== 0) {
            return data;
        } else {
            return [];
        }
    };

    saveData = () => {
        localStorage.setItem('data', JSON.stringify(this.state.todos));
    };

    addNew = ( text ) => {
        if (text !== '') {
            let newID;
            
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
    };

    deleteAll = () => {
        this.setState(
            { todos: [] },
            () => {
                this.saveData();
            }
        );
    };

    render() {
        return(
            <div className="app">
                <h1>Do or do not, there is no try</h1>
                <Summary
                    todoCount={this.state.todos.length}
                    completedCount={
                        this.state.todos.filter(x => x.completed === true).length
                    }
                />
                <AddTodo onAddClick={this.addNew} />
                <TodoList todoItems={this.state.todos} />
                <Button
                    content="delete all"
                    onClick={this.deleteAll}
                />
            </div>
        );
    }
}
