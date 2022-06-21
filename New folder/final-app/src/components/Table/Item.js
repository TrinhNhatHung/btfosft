import axios from 'axios';
import React from 'react';
import "./Table.css";

function Item(props) {
    const { item, fetchData, setInput, isActive, setActive } = props
    
    let priorityTd;

    if (item.priority === "high") {
        priorityTd = <td className="high">{item.priority}</td>
    } else if (item.priority === "medium") {
        priorityTd = <td className="medium">{item.priority}</td>
    } else {
        priorityTd = <td className="low">{item.priority}</td>
    }

    let statusTd;

    if (item.status === "inprogress"){
        statusTd = <td className="inprogress">{item.status}</td>
    } else if (item.status === "done"){
        statusTd = <td className="done">{item.status}</td>
    } else {
        statusTd = <td className="cancel">{item.status}</td>
    }

    const deleteItem = async () => {
        let result = window.confirm("Are you sure to delete this task?");
        if (result) {
            await axios.delete(`http://localhost:3001/list/${item.id}`);
            fetchData();
        }
    };

    const parseStringToDate = (date)=> {
        let strings = date.split(" ");
        let dates = strings[0].split(".");
        let times = strings[1].split(":");

        let year = parseInt(dates[0]);
        let month = parseInt(dates[1]);
        let day = parseInt(dates[2]);
        let hour = parseInt(times[0]);
        let min = parseInt(times[1]);

        let dateStr = [year, month > 9 ? month : "0" + month, day > 9 ? day : "" + day].join(".");
        let time  = [hour > 9 ? hour : "" +hour, min > 9 ? min : "" + min].join(":");
        return dateStr + " " + time;
    }

    const toggleRow = () => {
        let active = "active-row";
        setActive({
            ...isActive,
            className : active,
            id : item.id
        });
        if (active === "") {
            setInput({
                name: "",
                priority: "low",
                category : ""
            })
        } else {
            setInput(item);
        } 
    }

    return (
        <tr className={isActive.id === item.id ? isActive.className : ""} key={item.id} onClick={toggleRow}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            {priorityTd}
            {statusTd}
            <td>{parseStringToDate(item.createdAt)}</td>
            <td>{parseStringToDate(item.updatedAt)}</td>
            <td><i className="fas fa-trash-alt" onClick={deleteItem}></i></td>
        </tr>
    );
}

export default Item;