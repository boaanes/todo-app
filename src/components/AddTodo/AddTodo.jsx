import React from 'react';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './addTodo.scss';

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
                <input
                    type="form"
                    className="input-field"
                    value={text}
                    placeholder="todo..."
                    onChange={this.updateValue}
                    onKeyPress={(e) => {
                        if (e.charCode === 13) {
                            if (this.state.text !== '') this.handleClick();
                        }
                    }}
                />
                <button role="button" aria-label="add" onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        );
    }
}
