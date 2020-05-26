import React, { useState, useCallback } from 'react';

import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

import ListView from '../ListView/ListView';
import Title from '../Title/Title';

import './listSelect.scss';


const ListSelect = ( props ) => {

    const [listOpen, setListOpen] = useState(false);

    const addNewList = useCallback(( name ) => {
        props.addNewList(name);
    }, [props]);

    const editListName = useCallback(( name ) => {
        props.editListName(name);
    }, [props]);

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
