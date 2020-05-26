import React from 'react';

import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from '../Modal/Modal';
import AddList from '../AddList/AddList';

import './listView.scss';

const ListView = ({ todos, active, setActive, addNewList, deleteList }) => {

    return (
        <>
        <ul>
            {Object.keys(todos).map((listID) => (
                <li key={listID} style={{display: (String(active.id) === listID) ? 'none' : ''}}>
                    <div onClick={() => setActive(listID)}>
                        <label>{todos[listID].name}</label>
                    </div>
                    <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteList(listID)} />
                </li>
            ))}
            <li>
                <Modal activator={({ setVisible }) => (
                    <div className="add" onClick={() => setVisible(true)}>
                        <FontAwesomeIcon className="add-icon" icon={faPlus} />
                    </div>
                )}>
                    <AddList onAddClick={addNewList} />
                </Modal>
            </li>
        </ul>
        </>
    );
};

export default ListView;
