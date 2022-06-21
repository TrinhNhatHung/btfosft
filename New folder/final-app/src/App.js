import './App.css';
import Table from './components/Table/Table';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from './components/Form/Form';

function App() {

  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await axios.get(`http://localhost:3001/list`);
    setData(res.data);
  }

  const [isActive, setActive] = useState({
      className : "",
      id : null
  });

  useEffect(() => {
    fetchData();
  }, []);


  const [input, setInput] = useState({
      name: "",
      priority : "",
      category : ""
  });

  return (
    <div className="App">
      <div className="row container-fluid">
        <div className="col-4">
          <Form input={input} setInput={setInput} isActive={isActive} setActive={setActive} fetchData={fetchData}/>
        </div>
        <div className="col-8">
          <Table data={data} fetchData={fetchData} setInput={setInput} isActive={isActive} setActive={setActive} />
        </div>
      </div>
    </div>
  );
}

export default App;
