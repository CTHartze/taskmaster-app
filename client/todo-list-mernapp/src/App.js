import {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [itemText, setItemText] = useState('')

  //add new item to database
  const addItem = async () => {
    try{
      const res = await axios.post('http://localhost:5500/api/item', {item: itemText})
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="App">
      <h1>Task Master</h1>
      <form className="form" onSubmit={()}>
        <input type="text" placeholder='Add Task Item' onChange={e => {setItemText(e.target.value)} } value={itemText}/>
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        <div className="todo-item">
          <p className="item-content">this is item 1</p>
          <button className="update-item">Edit</button>
          <button className="delete-item">Remove</button>
        </div>
        <div className="todo-item">
          <p className="item-content">this is item 2</p>
          <button className="update-item">Edit</button>
          <button className="delete-item">Remove</button>
        </div>
        <div className="todo-item">
          <p className="item-content">this is item 3</p>
          <button className="update-item">Edit</button>
          <button className="delete-item">Remove</button>
        </div>
      </div>
    </div>
  );
}

export default App;
