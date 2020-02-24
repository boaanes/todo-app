import React from 'react';
import { render } from "react-dom";
import { Input } from 'semantic-ui-react';

export default class AddTodo extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    handleClick = () => {
        const { text } = this.state;
        this.props.onAddClick(text);
    };

    updateValue = ( evt, {value} ) => {
        this.setState({
            text: value
        });
    };

    render() {
        const { text } = this.state;
        
        return (
            <div className="container">
                <Input
                    className="input-field"
                    onChange={this.updateValue}
                    value={text}
                    action={{
                        icon: 'plus',
                        onClick: this.handleClick
                    }}
                    placeholder="todo..."
                />
            </div>
        );
    }
}
