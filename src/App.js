import React from 'react';
import './App.css';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect, useState} from 'react';
function App() {
  const dispatch = useDispatch();
  const [todolist, setTodolist] = useState();
  const [inputValue, setInputvalue] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const todo = useSelector((state) => state.todolist);

useEffect(()=>{
  setTodolist(todo);
},[todo])

  const inputChange =(e)=>{
    setInputvalue(e.target.value);
  }
  const addTodolist =()=>{
    if(isEditMode){
      dispatch({type:"edit", payload:{id:selectedTask.id, item:inputValue}});
      setInputvalue("")
      setIsEditMode(false)
      return
    }
    dispatch({type:"add", payload:{id:parseInt(todolist.length+1), item:inputValue}});
    setInputvalue("")
  }
  const deleteTodolist =(e,id)=>{
    setSelectedTask("")
    setIsEditMode(false)
    dispatch({type:"delete", payload:{id:id, item:inputValue}})
  }
  const editTodolist =(e,task)=>{
    setIsEditMode(true);
    setSelectedTask(task);
    setInputvalue(task.item)
  }
  return (
    <div className="App">
        <div  className="todo-list">
            <div className="tolist-header">
                <h1>Todo List</h1>
            </div>
            <div className="todolist-body">

              <div className="todolist-control">
                  <input type="text" value={inputValue} onChange={inputChange}></input>
                  <button type="button" onClick={addTodolist} className="btn button-add"> {isEditMode ? "Save Task":"Add list item"}  </button>
              </div>
           
              <div className="todolist-item">
                  <ul className="list">
                    { todolist && 
                      todolist.map(item=>(
                        <li key={item.id} className="item">
                          <span>{item.item}</span>
                        <button type="button" onClick={(e)=>deleteTodolist(e,item.id)}>Delete</button>
                        <button type="button" onClick={(e)=>editTodolist(e,item)}>Edit</button>
                        </li>
                      ))
                    }
                  </ul>
              </div>
            </div>
        </div>
    </div>
  );
}

export default App;
