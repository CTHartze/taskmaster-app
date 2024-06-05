import './App.css';

function App() {
  return (
    <div className="App">
      <form>
        <input type="text" placeholder='Add Task Item' />
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
