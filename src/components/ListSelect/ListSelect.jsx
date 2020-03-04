import React from 'react';

import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './listSelect.scss'

export default class ListSelect extends React.Component {
    constructor(props) {
        super(props);
        const data = this.mapLists(this.props.lists, this.props.active);
        this.state = {
            lists: data,
            listOpen: false,
            title: this.props.active
        }
    }

    mapLists = (data, active) => {
        let output = [];

        Object.keys(data).forEach((item, i) => {
            output.push({
                id: i,
                name: item,
                selected: (item === active) ? true : false
            });
        });

        return output;
    }

    handleClickOutside = () => {
        this.setState({
            listOpen: false
        });
    }

    toggleList = () => {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    }

    render() {
        const{ lists, listOpen, title } = this.state

        return(
            <div className="dd-wrapper">
                <div className="dd-header" onClick={() => this.toggleList()}>
                    <div className="dd-header-title">{title}</div>
                    {listOpen
                        ? <FontAwesomeIcon icon={faAngleUp} size="2x" />
                        : <FontAwesomeIcon icon={faAngleDown} size="2x" />
                    }
                </div>
                {listOpen && <ul className="dd-list">
                    {lists.map((item) => (
                        <li className="dd-list-item" key={item.id}>{item.name}</li>
                    ))}
                </ul>}
            </div>
        );
    }
}
