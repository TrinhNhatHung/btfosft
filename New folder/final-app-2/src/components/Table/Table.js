import React from 'react';
import Item from './Item';

function Table(props) {

    const {data, fetchData} = props;

    const renderTable = ()=> {
        return data.map(item => {
            return <Item item={item} fetchData= {fetchData}/>
        })
    }

    return (
        <div>
            <h3>Students Info Table</h3>
            <table class="table table-bordered table-stripped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Java</th>
                        <th scope="col">FE</th>
                        <th scope="col">React</th>
                        <th scope="col">Action</th>
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