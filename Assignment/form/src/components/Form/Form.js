import React, { useRef, useState } from 'react';
import './Form.css';

function Form() {

    const nameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();

    const [validationMsg, setValidationMsg] = useState({
        name : "",
        email : "",
        password : ""
    });

    const submit = (event) => {
        event.preventDefault();
        let form = event.target;

        let msg = {};

        if (form['name'].value.length < 4){
           msg.name = "At least 4 characters required";
           form['name'].classList.add('invalid');
        } else {
            form['name'].classList.remove('invalid');
            form['name'].classList.add('valid');
        }

        if (form['password'].value.length < 6){
            msg.password = "At least 6 characters required";
            form['password'].classList.add('invalid');
        } else {
            form['password'].classList.remove('invalid');
            form['password'].classList.add('valid');
        }

        if (!/^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*$/.test(form['email'].value)){
            msg.email = "Email is invalid";
            form['email'].classList.add('invalid');
        } else {
            form['email'].classList.remove('invalid');
            form['email'].classList.add('valid');
        }

        setValidationMsg(msg);
    }

    return (
        <form id="form" onSubmit={submit} noValidate>
            <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input name="name" type="text" className="form-control" id="name" placeholder="Name" ref={nameInput} />
                <div className="invalid text-danger">
                    {validationMsg.name}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input name="email" type="email" className="form-control" id="email" placeholder="example@..." ref={emailInput} />
                <div className="invalid text-danger">
                    {validationMsg.email}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input name="password" type="password" className="form-control" id="password" placeholder="Password" ref={passwordInput} />
                <div className="invalid text-danger">
                    {validationMsg.password}
                </div>
            </div>
            <div className="form-group d-flex flex-column">
                <button type="submit" className="btn btn-danger">Create User</button>
            </div>
        </form>
    );
}

export default Form;