import React from 'react';
import "./Task.css";
import Task from './Task';

function TaskList(props) {

    const { tasks, title, fetchData } = props;

    const renderList = () => {
        return tasks.map(task => {
            return <Task fetchData={fetchData} task={task} />
        })
    }

    return (
        <div className="task-list">
            <h6 className="title">{title}</h6>
            {
                renderList()
            }
        </div>
    );
}

export default TaskList;