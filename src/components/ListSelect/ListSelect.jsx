import React, { useState, useCallback } from 'react';

import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

import ListView from '../ListView/ListView';
import Title from '../Title/Title';

import './listSelect.scss';


const ListSelect = ( props ) => {

    const [listOpen, setListOpen] = useState(false);

    // TODO: verify this
    const addNewList = useCallback(( name ) => {
        props.addNewList(name);
        setListOpen(false);
    }, [props, setListOpen]);

    const editListName = useCallback(( name ) => {
        props.editListName(name);
        setListOpen(false);
    }, [props, setListOpen]);

    const deleteList = useCallback((id) => {
        if (listOpen) {
            props.deleteList(id);
        }
    }, [props, listOpen]);

    return (
        <div className="ls-wrapper">
            <Title
                title={props.active.name}
                editListName={editListName}
                listOpen={listOpen}
                setListOpen={setListOpen}
            />
            <SlideDown>
                {listOpen &&
                <ListView
                    todos={props.todos}
                    listOpen={listOpen}
                    active={props.active}
                    setActive={props.setActive}
                    addNewList={(name) => addNewList(name)}
                    deleteList={(id) => deleteList(id)}
                />
                }
            </SlideDown>
        </div>
    );

};

export default ListSelect;
