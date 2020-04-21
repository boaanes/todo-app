import React, { useState, useEffect, useCallback } from 'react';

import { faAngleUp, faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

import Modal from '../Modal/Modal';
import AddList from '../AddList/AddList';
import EditList from '../EditList/EditList';

import './listSelect.scss';

const mapLists = ( data, active ) => {
    let output = [];

    Object.keys(data).forEach((item, i) => {
        output.push({
            id: i,
            name: item,
            selected: (item === active) ? true : false
        });
    });

    return output;
};

const ListSelect = ( props ) => {

    const [lists, setLists] = useState(() => mapLists(props.todos, props.active));
    const [title, setTitle] = useState(props.active);
    const [listOpen, setListOpen] = useState(false);

    // making sure title is always the active list
    useEffect(() => {
        setTitle(props.active)
    }, [props]);

    const setActive = useCallback(( id, name ) => {
        setLists(
            lists.map((list) => {
                if (list.selected) list.selected = false;
                if (list.id === id) list.selected = true;
                return list;
            })
        );

        props.setActive(name);
    }, [props, lists]);

    const addNewList = useCallback(( name ) => {
        const currListNames = lists.map((list) => {return list.name});

        if (name !== null && !currListNames.includes(name)) {
            props.addNewList(name);
            setLists(mapLists(props.todos, name));
            setListOpen(false);
        }
    }, [props, lists]);

    const editListName = useCallback(( name ) => {
        const currListNames = lists.map((list) => {return list.name})

        if (name !== null && !currListNames.includes(name)) {
            props.editListName(name);
            setLists(mapLists(props.todos, name));
            setListOpen(false);
        }
    }, [props, lists]);

    const deleteList = useCallback((id, name) => {
        if (listOpen) {
            setLists(prevLists => prevLists.filter(list => list.id !== id));
            props.deleteList(name); // TODO: use id instead of name
        }
    }, [props, listOpen]);

    return (
        <div className="wrapper">
            <div className="header">
                <div className="header-title">{title}</div>
                <div>
                    <Modal activator={({ setVisible }) => (
                        <FontAwesomeIcon
                            className="edit-icon"
                            icon={faEdit}
                            size="2x"
                            onClick={() => setVisible(true)}
                        />
                    )}>
                        <EditList onEditClick={editListName} />
                    </Modal>


                    <FontAwesomeIcon
                        className={(listOpen) ? "dropdown-icon-up" : "dropdown-icon-down"}
                        icon={faAngleUp}
                        size="2x"
                        onClick={() => setListOpen(prevListOpen => !prevListOpen)}
                    />
                </div>
            </div>
            <SlideDown>
                {listOpen &&
                    <>
                    <ul>
                        {lists.map((list) => (
                            <li key={list.id} style={{display: list.selected ? 'none' : ''}}>
                                <div onClick={() => setActive(list.id, list.name)}>
                                    <label>{list.name}</label>
                                </div>
                                <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteList(list.id, list.name)} />
                            </li>
                        ))}
                        <li>
                            <Modal activator={({ setVisible }) => (
                                <div className="add" onClick={() => setVisible(true)}>
                                    <FontAwesomeIcon className="add-icon" icon={faPlus} />
                                </div>
                            )}>
                                <AddList onAddClick={addNewList}/>
                            </Modal>
                        </li>
                    </ul>
                    </>
                }
            </SlideDown>
        </div>
    );

};

export default ListSelect;
