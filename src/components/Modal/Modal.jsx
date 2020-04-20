import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useOnclickOutside from 'react-cool-onclickoutside';
import { CSSTransition } from 'react-transition-group';
import useKeyPress from '../../hooks/use-key-press';

import './modal.scss';

const Modal = ({ children, activator }) => {

    const [visible, setVisible] = useState(false);
    const escIsPressed = useKeyPress('Escape');
    const ref = useRef();

    useEffect(() => {
        if (escIsPressed) setVisible(false);
    }, [escIsPressed, setVisible]);

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
