import React, { useCallback } from 'react';

import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderError = ({ errorMsg, setError }) => {

    const goBack = useCallback(() => {
        setError('');
    }, [setError]);

    return (
        <div style={{display: 'flex'}}>
            <p className="error-msg" style={{marginRight: '1rem'}}>{errorMsg}</p>
            <button onClick={goBack}>
                <FontAwesomeIcon
                    icon={faSignInAlt}
                    size="2x"
                    style={{transform: 'rotate(180deg)'}}
                />
            </button>
        </div>
    );
};

export default HeaderError;
