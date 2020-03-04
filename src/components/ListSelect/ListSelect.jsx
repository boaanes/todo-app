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

    // TODO fix active not popping up in menu
    // and fix summary bug
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
            listOpen: false,
            title: name
        });
    }

    createNewList = () => {
        const name = prompt("Enter name for new todo-list");

        if (name !== null) {
            this.props.addNewList(name);

            const active = this.state.active;
            this.setState({
                lists: this.mapLists(this.props.lists, name),
                listOpen: false,
                title: name
            }, () => (this.props.setActive(name), console.log(this.state)));
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
                        ? <FontAwesomeIcon icon={faAngleUp} size="2x" />
                        : <FontAwesomeIcon icon={faAngleDown} size="2x" />
                    }
                </div>
                {listOpen && <ul className="dd-list">
                    {lists.map((list) => (
                        <li
                            className="dd-list-item"
                            key={list.id}
                            style={{display: list.selected ? 'none' : ''}}
                        ><label onClick={() => (this.setActive(list.id, list.name))}>{list.name}</label><FontAwesomeIcon className="list-delete" icon={faTrash} onClick={() => this.deleteList(list.id, list.name)} /></li>
                    ))}
                    <li style={{textAlign: 'center'}} onClick={() => this.createNewList()}><FontAwesomeIcon icon={faPlus} /></li>
                </ul>}
            </div>
        );
    }
}


export default onClickOutside(ListSelect);
