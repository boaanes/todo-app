import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom'
import useOnclickOutside from 'react-cool-onclickoutside';

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
                {React.Children.map(children, child => React.cloneElement(child, { setVisible: setVisible }))}
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
