import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom'
import useOnclickOutside from 'react-cool-onclickoutside';

import AddList from '../AddList/AddList';

import './modal.scss';

const Modal = ({ children, activator, onAddNewList }) => {

    const [visible, setVisible] = useState(false);
    const ref = useRef();

    useOnclickOutside(ref, () => {
        setVisible(false);
    });

    const contents = visible && (
        <div className="overlay">
            <div ref={ref}>
                <AddList onAddClick={( text ) => {
                        if (text !== '') {
                            onAddNewList(text);
                            setVisible(false);
                        }
                    }}
                />
            </div>
        </div>
    );

    return (
        <>
            {activator({ setVisible })}
            {createPortal(contents, document.body)}
        </>
    );
};

export default Modal;
