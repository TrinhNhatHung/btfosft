import React, { Fragment } from 'react';
import "./Form.css";

function ItemForm({ item,setActiveItem }) {

    const total = item.java + item.fe + item.react;
    var tag = <tr>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>
            <button className="btn btn-primary" onClick={()=> setActiveItem(item)}>View</button>
        </td>
    </tr>;

    if ((item.java >= 5 && item.fe >= 5 && item.react >= 5) || total / 3 >= 6.5) {
        tag = <tr className="active-item">
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
                <button className="btn btn-primary" onClick={()=> setActiveItem(item)}>View</button>
            </td>
        </tr>
    }

    return (
        <Fragment>
            {tag}
        </Fragment>
    );
}

export default ItemForm;