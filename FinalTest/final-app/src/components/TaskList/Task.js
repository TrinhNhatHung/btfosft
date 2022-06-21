import axios from 'axios';
import React, { useState } from 'react';
import "./Task.css";
import validation from '../../utils/validation';

function Task(props) {
    const { task, fetchData } = props;

    const [input, setInput] = useState(task);

    const [validationMsg, setValidationMsg] = useState({
        name: "",
        score: "",
        priority: ""
    });

    const [updateMode, setUpdateMode] = useState(false);

    const deleteTask = async () => {
        await axios.delete(`http://localhost:3001/tasks/${task.id}`);
        fetchData();
    }

    const toggleDone = async () => {
        let tmpTask = {
            ...task,
            done: !task.done
        };
        await axios.put(`http://localhost:3001/tasks/${task.id}`, tmpTask);
        fetchData();
    }

    const triggerUpdateMode = () => {
        setUpdateMode(true);
    }

    const changeField = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    };

    const updateTask = async ()=> {
        let check = validation(input, setValidationMsg);
        if (check){
            await axios.put(`http://localhost:3001/tasks/${task.id}`, input);
            setUpdateMode(false);
            fetchData();
        }
    }

    var taskDiv = <div className={task.priority}>
        <div className="actions">
            {!task.done && <i class="fas fa-edit m-1" onClick={triggerUpdateMode}></i>}
            <i class="fas fa-times text-danger m-1" onClick={deleteTask}></i>
        </div>
        <div className="content-task">
            <p className="task-name">{task.name}</p>
            <div className="d-flex justify-content-between">
                <p>Priority: {task.priority}</p>
                <p>Score: {task.score}</p>
            </div>
        </div>
        {task.done ? <button className="btn btn-primary" onClick={toggleDone}>Undone todo</button> :
            <button className="btn btn-primary" onClick={toggleDone}>Done</button>}
    </div>

    if (updateMode) {
        taskDiv = <div className={task.priority + " update"}>
            <div className="actions">
                <i className="fas fa-check m-1" onClick={updateTask}></i>
                <i className="fas fa-times text-danger m-1" onClick={deleteTask}></i>
            </div>
            <div className="content-task">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Task Name</label>
                    <input name="name" type="text" className="form-control" id="name" value={input.name} onChange={changeField} />
                    <div className="text-danger">
                        {validationMsg.name}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="priority" className="form-label">Priority</label>
                    <select className="form-select" id="priority" name="priority" value={input.priority} onChange={changeField}>
                        <option value="important">Important</option>
                        <option value="medium">Medium</option>
                        <option value="normal">Normal</option>
                    </select>
                    <div className="text-danger">
                        {validationMsg.priority}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="score" className="form-label">Score</label>
                    <input name="score" type="number" min={1} max={10} className="form-control" id="score" value={input.score} onChange={changeField} />
                    <div className="text-danger">
                        {validationMsg.score}
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" onClick={()=> alert("please update the task firstly")}>Done</button>
        </div>
    }

    return (
        <>{taskDiv}</>

    );
}

export default Task;