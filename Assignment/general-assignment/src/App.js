import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './components/Table/Table';
import Form from './components/Form/Form';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [users, setUsers] = useState([]);

  const fetchUser = async () => {
    const res = await axios.get("http://localhost:3001/users");
    setUsers(res.data);
  };

  const [displayForm, setDisplayForm] = useState({
    isDisplay: false,
    type: null
  })

  return (
    <div className="App">
      <div className="row">
        <div className="col-7">
          <Table users={users} fetchUser={fetchUser} setDisplayForm={setDisplayForm} />
        </div>
        {
          displayForm.isDisplay
          &&
          <div className="col-5">
            <Form displayForm={displayForm} fetchUser={fetchUser} />
          </div>
        }
      </div>
    </div>
  );
}

export default App;
