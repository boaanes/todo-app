import React from 'react';
import AddTodo from './AddTodo';

export default class MainContainer extends React.Component {
        
    constructor(props) {
        super(props);
        const data = this.loadData();
        this.state = {
            todos: data  
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

    addNew = ( text ) => {
       console.log(text); 
    };

    render() {
        return(
            <div className="app">
                <h1>Do or do not, there is no try</h1>
                <AddTodo onAddClick={this.addNew} />
            </div>
        );
    }
}
