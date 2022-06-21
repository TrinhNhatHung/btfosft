import React, { useEffect } from 'react';
import Item from './Item';
import './Table.css';

function Table(props) {

    const { setDisplayForm, users, fetchUser } = props;

    useEffect(() => {
        fetchUser();
    }, []);

    const openCreateForm = () => {
        setDisplayForm({
            isDisplay: true,
            type: "create",
            user: {
                name: "",
                address: "",
                phone: "",
                age: ""
            }
        })
    };

    return (
        <div>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">name</th>
                        <th scope="col">address</th>
                        <th scope="col">actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => {
                            return <Item key={user.id} user={user} setDisplayForm={setDisplayForm} fetchUser={fetchUser} />
                        })
                    }
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={openCreateForm}>Create User</button>
        </div>
    );
}

export default Table;