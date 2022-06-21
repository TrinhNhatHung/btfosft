import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "./components/Table/Table";
import Form from './components/Form/Form';

function App() {

  const [data, setData] = useState([]);
  const [nav ,setNav] = useState(true);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3001/items");
    setData(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const changePage = (page)=> {
      setNav(page);
  }

  const renderMain = ()=> {
     if (nav){
       return <Table data={data} fetchData={fetchData} />
     } else {
       return <Form data={data} setData={setData} fetchData={fetchData}  />
     }
  }

  return (
    <div className="App">
      <div className="row container-fluid">
        <div className="col-3 d-flex flex-column">
          <h2>Menu Item</h2>
          <button type="button" className={nav ? "btn btn-primary" : "btn"} onClick={()=> changePage(true)}>Student Manager</button>
          <button type="button" className={nav === false ? "btn btn-primary" : "btn"} onClick={()=> changePage(false)}>Search Tab</button>
        </div>
        <div className="col">
           {
             renderMain()
           }
        </div>
      </div>
    </div>
  );
}

export default App;
