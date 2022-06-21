import React, { useState } from 'react';
import axios from 'axios';

function Item({ user, setDisplayForm, fetchUser }) {

    const [updateMode, setUpdateMode] = useState(false);
    const [input, setInput] = useState(user);
    const [validationMsg, setValidationMsg] = useState({
        name: "",
        address: ""
    });

    const toggleUpdateMode = () => {
        setUpdateMode(!updateMode);
    }

    const displayFormUpdate = (event) => {
        setDisplayForm({
            isDisplay: true,
            type: "update",
            user: input
        });
        event.stopPropagation();
    }

    const deleteItem = async (event) => {
        event.stopPropagation();
        await axios.delete(`http://localhost:3001/users/${user.id}`);
        fetchUser();
    }

    const focusToInput = (event) => {
        event.stopPropagation();
    }

    const updateUser = async (event) => {
        event.stopPropagation();
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

        setValidationMsg(msg);

        if (Object.keys(msg).length === 0) {
            await axios.put(`http://localhost:3001/users/${user.id}`, input);
            setUpdateMode(false);
            fetchUser();
        }
    }

    const changeValue = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const itemUpdateMode = <tr onClick={toggleUpdateMode}>
        <td>{user.id}</td>
        <td>
            <input type="text" name="name" value={input.name} className="form-control" onClick={focusToInput} onChange={changeValue} />
            <div className="text-danger">{validationMsg.name}</div>
        </td>
        <td>
            <input type="text" name="address" value={input.address} className="form-control" onClick={focusToInput} onChange={changeValue} />
            <div className="text-danger">{validationMsg.address}</div>
        </td>
        <td>
            <button className="btn btn-primary" onClick={updateUser}>
                <i className="fas fa-check"></i>
            </button>
        </td>
    </tr>

    const itemNormalMode = <tr onClick={toggleUpdateMode}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.address}</td>
        <td>
            <button className="btn btn-primary" onClick={displayFormUpdate}>
                <i className="fas fa-edit"></i>
            </button>
            <button className="btn btn-danger" onClick={deleteItem}>
                <i className="fas fa-times"></i>
            </button>
        </td>
    </tr>

    const item = updateMode ? itemUpdateMode : itemNormalMode;
    return (
        item
    );
}

export default Item;