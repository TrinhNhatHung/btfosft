import axios from 'axios';
import React, { Fragment, useState } from 'react';

function Item(props) {

    const { item, fetchData } = props;

    const [input, setInput] = useState(item);

    const [updateMode, setUpdateMode] = useState(false);

    const update = async (event)=> {
        event.stopPropagation();
        let check = true;
        if (!/^[a-zA-Z\s]+$/.test(input.name)){
            check = false;
        }

        if (check){
           await axios.put(`http://localhost:3001/items/${item.id}`, input);
           fetchData();
        } else {
            alert("Input is invalid");
        }
    }

    const deleteItem = async (event) => {
        event.stopPropagation();
        await axios.delete(`http://localhost:3001/items/${item.id}`);
        fetchData();
    }

    const toggleRow = (event)=> {
        setUpdateMode(!updateMode);
    }

    const focus = (event)=> {
        event.stopPropagation();
    }

    const changeInput = (event)=> {
        setInput({
            ...input,
            [event.target.name] : event.target.value
        });
    }

    var tr = <tr onClick={toggleRow}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.java}</td>
        <td>{item.fe}</td>
        <td>{item.react}</td>
        <td>
            <i className="far fa-edit m-1"></i>
            <i className="fas fa-times m-1 text-danger" onClick={deleteItem}></i>
        </td>
    </tr>;

    if (updateMode) {
        tr = <tr onClick={toggleRow}>
            <td>
                {item.id}
            </td>
            <td>
                <input name="name" type="text" class="form-control" value={input.name}  onClick={focus} onChange={changeInput} />
            </td>
            <td>
                <input name="java" type="number" min={0} max={10} class="form-control" value={input.java} onClick={focus} onChange={changeInput} />
            </td>
            <td>
                <input name="fe" type="number" min={0} max={10} class="form-control" value={input.fe} onClick={focus} onChange={changeInput} />
            </td>
            <td>
                <input name="react" type="number" min={0} max={10} class="form-control" value={input.react} onClick={focus} onChange={changeInput} />
            </td>
            <td>
                <i className="far fa-check text-success  m-1" onClick={update}></i>
                <i className="fas fa-times m-1 text-danger" onClick={deleteItem}></i>
            </td>
        </tr>;
    }

    return (
        <Fragment>
            {tr}
        </Fragment>
    );
}

export default Item;