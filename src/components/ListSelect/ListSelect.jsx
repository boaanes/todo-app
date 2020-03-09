import React from 'react';

import { faAngleUp, faAngleDown, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import onClickOutside from "react-onclickoutside";

import './listSelect.scss'

class ListSelect extends React.Component {
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

    setActive = ( id, name ) => {
        let lists = this.state.lists.map((list) => {
            if (list.selected) list.selected = false;
            if (list.id === id) list.selected = true;
            return list;
        });

        const updated = lists;
        this.setState({
            lists: updated,
            listOpen: false,
            title: name
        });

        this.props.setActive(name);
    }

    createNewList = () => {
        const name = prompt("Enter name for new todo-list");
        const currLists = this.state.lists.map((obj) => {return obj.name});

        if (name !== null && !currLists.includes(name)) {
            this.props.addNewList(name);

            this.setState({
                lists: this.mapLists(this.props.lists, name),
                listOpen: false,
                title: name
            }, () => (this.props.setActive(name)));
        }
    }

    deleteList = ( id, name ) => {
        if (this.state.listOpen) {
            const newList = this.state.lists.filter(x => x.id !== id);
            this.setState({
                lists: newList
            });
            this.props.deleteList(name);
        }
    }

    render() {
        const{ lists, listOpen, title } = this.state

        return(
            <div className="dd-wrapper">
                <div className="dd-header" onClick={() => this.toggleList()}>
                    <div className="dd-header-title">{title}</div>
                    {listOpen
                        ? <FontAwesomeIcon className="dd-icon" icon={faAngleUp} size="2x" />
                        : <FontAwesomeIcon className="dd-icon" icon={faAngleDown} size="2x" />
                    }
                </div>
                {listOpen && <ul className="dd-list">
                    {lists.map((list) => (
                            <li
                                className="dd-list-item"
                                key={list.id}
                                style={{display: list.selected ? 'none' : ''}}
                            >
                                <div className="dd-list-div" onClick={() => (this.setActive(list.id, list.name))}>
                                    <label>{list.name}</label>
                                </div>
                                <FontAwesomeIcon className="list-delete" icon={faTrash} onClick={() => this.deleteList(list.id, list.name)} />
                            </li>
                    ))}
                    <li className="add-list" onClick={() => this.createNewList()}><FontAwesomeIcon className="add-icon" icon={faPlus} /></li>
                </ul>}
            </div>
        );
    }
}


export default onClickOutside(ListSelect);
