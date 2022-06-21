import axios from 'axios';
import React, { useState } from 'react';
import './Form.css';
function Form(props) {

    const { input, setInput, isActive, setActive, fetchData } = props;
    const [validationMsg, setValidationMsg] = useState({
        name: "",
        category: "",
        priority: ""
    });

    const [alert, setAlert] = useState("");

    const cancelForm = () => {
        setInput({
            name: "",
            priority: "low",
            category: ""
        });
        setActive({
            ...isActive,
            className: "",
            id: null
        });

        setValidationMsg({
            name: "",
            category: "",
            priority: ""
        });

        setAlert("");
    };

    const changeField = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    };

    const formatDateToString = (date) => {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();

        let dateStr = [year, month > 9 ? month : "0" + month, day > 9 ? day : "" + day].join(".");
        let time = [hour > 9 ? hour : "" + hour, min > 9 ? min : "" + min].join(":");
        return dateStr + " " + time;
    }

    const submitForm = async (event) => {
        event.preventDefault();
        let name = input.name;
        let msg = {};
        let check = true;
        if (name.length < 10 || name.length > 100) {
            msg.name = "Name phải từ 10 đến 100 kí tự";
            check = false;
        }

        if (!['low', 'medium', 'high'].includes(input.priority)) {
            msg.priority = "Phải chọn 1 trong 3";
            check = false;

        }

        if (input.category === "") {
            msg.category = "Category là bắt buộc";
            check = false;

        }

        setValidationMsg(msg);
        if (check) {
            let date = formatDateToString(new Date());
            if (isActive.id) {
                let updateTodo = {
                    ...input,
                    updatedAt: date
                };
                await axios.put(`http://localhost:3001/list/${isActive.id}`, updateTodo);
                setAlert("Todo-task updated");
            } else {
                let newTodo = {
                    ...input,
                    status: "inprogress",
                    createdAt: date
                };
                await axios.post(`http://localhost:3001/list`, newTodo);
                setAlert("Add new Todo-task successfully");
            }
            fetchData();
        }
    }

    return (
        <div className="form border">
            <h4>Todo-Form</h4>
            {
                alert !== ""
                &&
                <div className="alert alert-success" role="alert">{alert}</div>
            }
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input name="name" type="text" className="form-control" id="name" placeholder="What need to be done" value={input.name} onChange={changeField} />
                    <div className="invalid">
                        {validationMsg.name}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Priority</label>
                    <div className="radio-group form-control">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="priority" id="low" value="low" checked={input.priority === "low"} onChange={changeField} />
                            <label className="form-check-label" htmlFor="low">Low</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="priority" id="medium" value="medium" checked={input.priority === "medium"} onChange={changeField} />
                            <label className="form-check-label" htmlFor="medium">Medium</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="priority" id="high" value="high" checked={input.priority === "high"} onChange={changeField} />
                            <label className="form-check-label" htmlFor="high">High</label>
                        </div>
                    </div>
                    <div className="invalid">
                        {validationMsg.priority}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-select" id="category" name="category" value={input.category} onChange={changeField}>
                        <option value="" defaultChecked>Choose task category</option>
                        <option value="project">Project</option>
                        <option value="personal">Personal</option>
                        <option value="homework">Homework</option>
                    </select>
                    <div className="invalid">
                        {validationMsg.category}
                    </div>
                </div>
                <div className="form-group action-group">
                    <button type="submit" className="btn btn-primary m-1">Save</button>
                    <button type="reset" className="btn btn-light m-1" onClick={cancelForm}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default Form;