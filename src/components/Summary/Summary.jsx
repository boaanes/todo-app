import React from 'react';

const Summary = ({ todoCount, completedCount }) => (
    <div className="summary">
        <Text todoCount={todoCount} completedCount={completedCount} />
    </div>
);

function Text(props) {
    if (props.todoCount === 0) {
        return <p className="text">{`No Tasks!`}</p>;
    } else if (props.completedCount === props.todoCount) {
        return <p className="text">{`All tasks completed!`}</p>;
    } else {
        return <p className="text">{`${props.completedCount} out of ${props.todoCount} tasks completed`}</p>;
    }
};

export default Summary;
