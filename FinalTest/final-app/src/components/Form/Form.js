import axios from 'axios';
import React, { useState } from 'react';
import validation from '../../utils/validation';
import './Form.css';

function Form({fetchData}) {

    const [input, setInput] = useState({
        name: "",
        score: "",
        priority: ""
    })

    const [validationMsg, setValidationMsg] = useState({
        name: "",
        score: "",
        priority: ""
    });

    const changeField = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const submitForm = async (event) => {
        event.preventDefault();
        let check = validation(input, setValidationMsg);
        if (check) {
            await axios.post(`http://localhost:3001/tasks`, input);
            fetchData();
            setValidationMsg({
                name: "",
                score: "",
                priority: ""
            })   
            setInput({
                name: "",
                score: "",
                priority: ""
            })     
        }
    }

    return (
        <div className="container">
            <h1>Task Form</h1>
            <form className="form" onSubmit={submitForm} noValidate>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Task Name</label>
                    <input name="name" type="text" className="form-control" id="name" value={input.name} onChange={changeField} />
                    <div className="text-danger">
                        {validationMsg.name}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="score" className="form-label">Score</label>
                            <input name="score" type="number" min={1} max={10} className="form-control" id="score" value={input.score} onChange={changeField} />
                            <div className="text-danger">
                                {validationMsg.score}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="priority " className="form-label">Priority</label>
                            <select className="form-select" id="priority" name="priority" value={input.priority} onChange={changeField}>
                                <option value="" defaultChecked>Choose --priority</option>
                                <option value="important">Important</option>
                                <option value="medium">Medium</option>
                                <option value="normal">Normal</option>
                            </select>
                            <div className="text-danger">
                                {validationMsg.priority}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Add new task</button>
                </div>
            </form>
        </div>
    );
}

export default Form;