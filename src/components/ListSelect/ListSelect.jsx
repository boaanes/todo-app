import React from 'react';

export default class ListSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <h1>{ this.props.active }</h1>
        );
    }
}
