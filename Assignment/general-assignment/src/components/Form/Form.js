import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Form.css';

function Form(props) {
    const displayForm = props.displayForm;
    const fetchUser = props.fetchUser;

    const [input, setInput] = useState(displayForm.user);
    const [validationMsg, setValidationMsg] = useState({
        name: "",
        age: "",
        address: "",
        phone: ""
    });

    useEffect(() => {
        setInput(displayForm.user);
        setValidationMsg({
            name: "",
            age: "",
            address: "",
            phone: ""
        })
    }, [displayForm]);

    const validateForm = () => {
        let msg = {};
        var name = input.name.trim();
        if (name.length === 0) {
            msg.name = "Name is required";
        } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)*$/.test(name)) {
            msg.name = "Name only contains characters and 1 space between words";
        }

        var address = input.address.trim();
        if (address.length === 0) {
            msg.address = "Address is required";
        } else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)*$/.test(address)) {
            msg.address = "Address only contains characters and 1 space between words";
        }

        var phone = input.phone.trim();
        if (!/^0[0-9]{9}$/.test(phone)) {
            msg.phone = "Phone contains 10 numeric characters";
        }

        var age = parseInt(input.age);
        if (isNaN(age)) {
            msg.age = "Age is required";
        } else if (input.age <= 0) {
            msg.age = "Age must be greater than 0";
        }

        setValidationMsg(msg);
        if (Object.keys(msg).length === 0) {
            return true;
        }

        return false;
    }

    const submitForm = async (event) => {
        event.preventDefault();

        let isInvalid = validateForm();
        if (!isInvalid) {
            return;
        }

        if (displayForm.type === "create") {
            await axios.post("http://localhost:3001/users", input);
            fetchUser();
        }
        if (displayForm.type === "update") {
            await axios.put(`http://localhost:3001/users/${input.id}`, input);
            fetchUser();
        }
    }

    const changeInput = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    return (
        <form onSubmit={submitForm}>
            <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <div className="input-area">
                    <input
                        name="name" type="text" id="name" value={input.name}
                        onChange={changeInput}
                        className="form-control"
                    />
                    <div className="msg-invalid">
                        {validationMsg.name}
                    </div>
                </div>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <div className="input-area">
                    <input
                        name="age" type="number" id="age" value={input.age}
                        onChange={changeInput}
                        className="form-control"
                    />
                    <div className="msg-invalid">
                        {validationMsg.age}
                    </div>
                </div>
            </div>

            <div className="form-group mb-3">
                <label className="form-label" htmlFor="address">Address</label>
                <div className="input-area">
                    <input
                        name="address" type="text" id="address" value={input.address}
                        onChange={changeInput}
                        className="form-control"
                    />
                    <div className="msg-invalid">
                        {validationMsg.address}
                    </div>
                </div>
            </div>
            <div className="form-group mb-3">
                <label className="form-label" htmlFor="phone">Phone</label>
                <div className="input-area">
                    <input
                        name="phone" type="text" id="phone" value={input.phone}
                        onChange={changeInput}
                        className="form-control"
                    />
                    <div className="msg-invalid">
                        {validationMsg.phone}
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-success" >{displayForm.type}</button>
        </form>
    );
}

export default Form;