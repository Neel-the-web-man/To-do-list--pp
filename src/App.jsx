import { useEffect, useState } from 'react'
import './App.css'
import Navbar from "./components/navbar.jsx";
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setshowFinished] = useState(true);
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      // localStorage.clear();
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);
    }
  }, []);
  const savetoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const toggoleFinished=(e)=>{
    setshowFinished(!showfinished)
  }
  const handleEdit = (e) => {
    let id = e.currentTarget.name;
    let req_todo = todos.filter((item) => {
      return item.id === id;
    })
    setTodo(req_todo[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    savetoLS();
  }
  const handleDelete = (e) => {
    let id = e.currentTarget.name;
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
    savetoLS();
  }
  const handleSave = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("");
    savetoLS();
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
    savetoLS();
  }
  const handleCheckbox = (e) => {
    let newTodos = [...todos];
    for (let i = 0; i < todos.length; i++) {
      let id = e.target.name;
      if (todos[i].id === id) {
        newTodos[i].isCompleted = newTodos[i].isCompleted ? false : true;
        setTodos(newTodos);
        break;
      }
    }
    savetoLS();
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="title">
          itask -Manage Your Task & Be Productive
        </div>
        <div className="add-todo">
          <div className="add-label">
            Add a Todo:
          </div>
          <input type="text" onChange={handleChange} value={todo} />
          <button onClick={handleSave} disabled={todo.length<3} className="save-todo-button">Save</button>
        </div>
        <div className="cont-label">
          Your Todo's:
        </div>
        {todos.length!=0 && (<div className='finished-task-checkbox'>
            <label htmlFor="">Show Finished tasks:</label>
            <input onChange={toggoleFinished} checked={showfinished}  type="checkbox" />
          </div>)}
        {todos.length == 0 && <div className='bef-todo'>No tasks to do.....</div>}
        <div className="todos">
          {todos.map((props) => {
            return (showfinished ||!props.isCompleted)&&(
              <div className="todo" key={props.id}>
                <div className="todo -task">
                  <input name={props.id} onChange={handleCheckbox} className='todo-checkbox' checked={props.isCompleted} type="checkbox" />
                  <div className={props.isCompleted ? "todo-line-through-class" : ""} >
                    {props.todo}
                  </div>
                </div>
                <div className='todo-button-sec'>
                  <button name={props.id} className='edit-todo' onClick={handleEdit}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                      <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11 20H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button name={props.id} className='delete-todo' onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                      <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
