import React from 'react';
import Item from './Item';
import "./Table.css";

function Table(props) {
    const { data, fetchData, setInput, isActive, setActive } = props;
    const renderTable = () => {
        return data.map(item => {
            return <Item isActive={isActive} setActive={setActive} item={item} fetchData={fetchData} setInput={setInput} />
        })
    }
    return (
        <div className="table-wrap">
            <h4 className="mb-4" >To-Do List</h4>
            <table className="table table-bordered table-hover table-stripped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        renderTable()
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;