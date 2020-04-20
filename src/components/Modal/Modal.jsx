import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useOnclickOutside from 'react-cool-onclickoutside';
import { CSSTransition } from 'react-transition-group';

import './modal.scss';

const Modal = ({ children, activator, onAddNewList }) => {

    const [visible, setVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        console.log("halla");
    });

    useOnclickOutside(ref, () => {
        setVisible(false);
    });

    const contents = (
        <div>
            <div className="overlay">
                <div className="modal" ref={ref}>
                    {React.Children.map(children, child => React.cloneElement(child, { setVisible: setVisible }))}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {activator({ setVisible })}
            {createPortal(
                <CSSTransition
                    in={visible}
                    timeout={120}
                    classNames="modal-transition"
                    unmountOnExit
                >{() => contents}</CSSTransition>,
                document.body
            )}
        </>
    );
};

export default Modal;
