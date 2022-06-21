import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import Form from './components/Form/Form';
import TaskList from './components/TaskList/TaskList';
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);

  const fetchData = async ()=> {
      const res = await axios.get("http://localhost:3001/tasks");
      setData(res.data);
  }

  useEffect(() => {
      fetchData();
  },[]);

  const todoTask = data.filter(task => !task.done);

  const doneTask = data.filter(task => task.done);

  return (
    <div className="App m-5">
      <Form fetchData={fetchData} />
      <div className="container-fluid">
        <h3 className="mt-5">Task List</h3>
        <div className="row mt-3 content">
          <div className="col-4">
            <TaskList title="To-Do" fetchData={fetchData} tasks={todoTask} />
          </div>
          <div className="col-4">
            <TaskList title="Done" fetchData={fetchData} tasks={doneTask} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
