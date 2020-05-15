import React from 'react';

const LoadingBox = ({ text }) => {
    return(
        <div className="main-container">
            <h3 style={{textAlign: 'center'}}>{text}</h3>
        </div>
    );
};

export default LoadingBox;
