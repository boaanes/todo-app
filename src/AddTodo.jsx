import React from 'react';
import { Input } from 'semantic-ui-react';

export default class AddTodo extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    handleClick = () => {
        const text = this.state.text;
        this.props.onAddClick(text);
        this.setState({
            text: ''
        });
    };

    updateValue = ( evt ) => {
        this.setState({
            text: evt.target.value
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
                        content: 'add',
                        onClick: this.handleClick
                    }}
                    placeholder="todo..."
                />
            </div>
        );
    }
}
