import axios from 'axios';
import React, { useRef, useState } from 'react';
import Detail from '../Detail/Detail';
import ItemForm from './ItemForm';

function Form(props) {
    const { data, setData } = props;
    const [msg, setMsg] = useState("");
    const [activeItem, setActiveItem] = useState(null);

    const input = useRef();

    const renderTable = () => {
        return data.map(item => {
            return <ItemForm item={item} setActiveItem= {setActiveItem} />
        })
    }

    const search = async () => {
        let value = input.current.value;
        if (value !== "") {
            const res = await axios.get("http://localhost:3001/items");
            const dataTmp = res.data;
            let dataFilter = dataTmp.filter(item => {
                return item.name.toLowerCase().includes(value.toLowerCase());
            });
            setData(dataFilter);
            setMsg("");
        } else {
            setMsg("This field is required, please try again!");
        }

    }

    return (
        <div>
            <h1>Search Form</h1>
            <div class="form-group">
                <div className="d-flex search">
                    <input type="text" class="form-control" id="search" ref={input} />
                    <button className="btn btn-primary" onClick={search}>Search</button>
                </div>
                <div className="error">
                    {msg}
                </div>
            </div>
            <div>
                <h3>Student Info</h3>
                <table class="table table-bordered table-stripped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            renderTable()
                        }
                    </tbody>
                </table>
            </div>
            {activeItem && <Detail item={activeItem} />}
        </div>
    );
}

export default Form;