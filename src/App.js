import React, { useState } from 'react';
import "./App.css";


const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const [checkId, setCheckId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(editId){
      const editTodo= todos.find((i)=>i.id === editId);
      const updatedTodos=todos.map((t)=>
        t.id === editTodo.id
        ? (t = { id: t.id, todo, status: t.status})
        : {...t}
        );
        // { id: t.id, todo:t.todo }
        setTodos(updatedTodos);
        setEditId(0);
        setTodo("");
        if(checkId){
          //handle check
        }
        return;
    }

    if (todo !== '') {
      setTodos([{id: `${todo}-${Date.now()}`, todo, status:"not started"}, ...todos])
      setTodo("");
    }
  };
  const handleDelete = (id) => {
    const delTodos = todos.filter((to)=>to.id !== id);
    setTodos([...delTodos]);
  };
  const handleCheck = (id) => {
    const checkedTodo = todos.find((t)=>t.id === id);
    const updatedTodos=todos.map((t)=>
     {
       if(t.id === id){
        return {...t, status: checkedTodo.status === "completed" ? "not started" :"completed"};
     } else {
        return {...t };
      } 
    });
    setCheckId(checkedTodo);
    setTodos(updatedTodos);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i)=>i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };
   return (
    <div className='App'>
      <div className="container">
        <h1> Todo List App </h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={todo}
            onChange={(e)=>setTodo(e.target.value)} />
          <button type="submit">{editId ? "Edit":"Go"}</button>
        </form>
        <ul className="allTodos">
          {todos.map((t) => (
              <li className={`singleTodo ${t.status}`} key={t.id}>
              <input onClick={()=>handleCheck(t.id)} type="checkbox" className="checkBox" checked={t.status ==="completed"} readOnly></input>      
              <span className="todoText" key={t.id} >{t.todo}</span>
              <span className="todoStatus">{t.status}</span>
              <button onClick={()=>handleEdit(t.id)}>Edit</button>   
              <button onClick={()=>handleDelete(t.id)}>Delete</button>
              </li>
            ))}                 
        </ul>
      
      </div>
    </div>
  )
}

export default App