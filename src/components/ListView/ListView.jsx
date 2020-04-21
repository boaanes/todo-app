import React  from 'react';

import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from '../Modal/Modal';
import AddList from '../AddList/AddList';

import './listView.scss';

const ListView = ({ lists, setActive, addNewList, deleteList }) => {
    return (
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
    );
};

export default ListView;
