import React, { useState, useEffect, useCallback } from 'react';

import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

import ListView from '../ListView/ListView';
import Header from '../Header/Header';

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
        <div className="ls-wrapper">
            <Header
                title={title}
                editListName={editListName}
                listOpen={listOpen}
                setListOpen={setListOpen}
            />
            <SlideDown>
                {listOpen &&
                <ListView
                    lists={lists}
                    listOpen={listOpen}
                    setActive={setActive}
                    addNewList={addNewList}
                    deleteList={deleteList}
                />
                }
            </SlideDown>
        </div>
    );

};

export default ListSelect;
