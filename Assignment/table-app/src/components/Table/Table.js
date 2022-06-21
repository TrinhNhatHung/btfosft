import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css';

function Table() {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const recordPerPage = 10;

    const fetchData = async () => {
        let res = await axios.get(`http://localhost:3001/users`);
        setData(res.data);
    };

    useEffect(() => {
        fetchData();
    },[]);

    const formatPhone = (phone) => {
        phone = phone.replaceAll("-", "");
        phone = "(+84)" + phone.substring(1, phone.length);
        return phone;
    }

    const formatBirthday = (birthday) => {
        let strings = birthday.split("/");
        let day = parseInt(strings[0]);
        let month = parseInt(strings[1]);
        let year = parseInt(strings[2]);
        return [(day > 9 ? '' : '0') + day, (month > 9 ? '' : '0') + month, year].join("/");
    }

    const sortByField = (functional) => {
        let tmpData = [...data];
        tmpData.sort(functional);
        setData(tmpData);
    }

    const changeSortedField = (event) => {
        let value = event.target.value;
        value = parseInt(value);
        console.log(value);
        switch (value) {
            case 2: {
                sortByField((a, b) => {
                    return a.firstName.localeCompare(b.firstName);
                })
                break;
            }
            case 3: {
                sortByField((a, b) => {
                    return a.lastName.localeCompare(b.lastName);
                })
                break;
            }
            case 4: {
                sortByField((a, b) => {
                    return a.email.localeCompare(b.email);
                })
                break;
            }
            case 6: {
                sortByField((a, b) => {
                    return a.salary - b.salary;
                })
                break;
            }
            default: {
                sortByField((a, b) => {
                    return a.id - b.id;
                })
            }
        }
    }

    const filter = async (event) => {
        let value = event.target.value.toLowerCase();
        let res = await axios.get("http://localhost:3001/users");
        let data = res.data;
        data = data.filter(item => item.firstName.toLowerCase().includes(value));
        setData(data);
        setPage(1);
    }

    const changePage = (page) => {
        setPage(page);
    }

    const skipPage = (functional) => {
        let totalPage = Math.ceil(data.length / recordPerPage);
        let tmpPage = functional(page);
        if (tmpPage > 0 && tmpPage <= totalPage) {
            setPage(tmpPage);
        }
    }

    const renderPage = () => {
        let totalPage = Math.ceil(data.length / recordPerPage);
        let pages = [];
        for (let i = 1; i <= totalPage; i++) {
            if (i === page) {
                pages.push(<li className="page-item active" key={i} onClick={() => changePage(i)}><p className="page-link">{i}</p></li>);
                continue;
            }
            pages.push(<li className="page-item" key={i} onClick={() => changePage(i)}><p className="page-link">{i}</p></li>);
        }
        return pages;
    }

    const renderData = () => {
        let start = recordPerPage * (page - 1);
        let end = start + recordPerPage - 1;
        end = end >= data.length ? data.length - 1 : end;
        let rows = [];
        for (let i = start; i <= end; i++) {
            let item = data[i];
            rows.push(<tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.gender === true ? "Male" : "Female"}</td>
                <td>{formatBirthday(item.birthday)}</td>
                <td>{item.salary}</td>
                <td>{formatPhone(item.phone)}</td>
            </tr>);
        }
        return rows;
    }

    return (
        <div className="container content">
            <div className="action">
                <div className="form">
                    <label htmlFor="sorted-field" className="form-label">Order by</label>
                    <select name="sorted-field" id="sorted-field" className="form-select" onChange={changeSortedField}>
                        <option defaultValue>Select field to sort</option>
                        <option value="1">Id</option>
                        <option value="2">First Name</option>
                        <option value="3">Last Name</option>
                        <option value="4">Email</option>
                        <option value="5">Birthday</option>
                        <option value="6">Salary</option>
                    </select>
                </div>
                <div className="form">
                    <label htmlFor="search" className="form-label">Search</label>
                    <input type="text" id="search" placeholder="Search" className="form-control" onChange={filter} />
                </div>
            </div>
            <table className="table table-bordered table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Birthday</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        renderData()
                    }
                </tbody>
            </table>
            <nav aria-label="Page navigation" className="nav-pagination">
                <ul className="pagination">
                    <li
                        className="page-item"
                        onClick={() => skipPage(page => page - 1)}
                    >
                        <p className="page-link">Previous</p>
                    </li>
                    {
                        renderPage()
                    }
                    <li
                        className="page-item"
                        onClick={() => skipPage(page => page + 1)}
                    >
                        <p className="page-link">Next</p>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Table;