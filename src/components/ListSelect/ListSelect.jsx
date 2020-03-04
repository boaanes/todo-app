import React from 'react';

import { faAngleUp, faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
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

    toggleList = ( id ) => {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    }

    isActive = ( item ) => {
        this.state.lists.forEach((item) => {
            return (item.selected) ? true : false;
        });
    }

    setActive = ( id, name ) => {
        this.props.setActive(name);
        let lists = this.state.lists;

        for (var i = 0; i < lists.length; i++) {
            if (i !== id && lists[i].selected) {
                lists[i].selected = false;
            } else if (i === id) {
                lists[i].selected = true;
            }
        }

        const updated = lists;
        this.setState({
            lists: updated,
            title: name
        });

        console.log(lists);
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
                    {lists.map((list) => (
                        <li
                            className="dd-list-item"
                            key={list.id}
                            onClick={() => (this.setActive(list.id, list.name))}
                            style={{display: list.selected ? 'none' : ''}}
                        >{list.name}</li>
                    ))}
                </ul>}
            </div>
        );
    }
}
