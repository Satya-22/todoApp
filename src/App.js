
import "./App.css";
import UserBar from './UserBar'
import CreateTodoItem from './CreateTodoItem'
import { useState } from "react";
import TodoList from "./TodoList";

function App() {
  const [user, setUser] = useState('')
  const initialItems = [
    {
      title: "TODO ITEM1",
      description: "TODO ITEM1 DESC",
      author: user,
      DateCreated: Date.now,
      completed: false,
    },
    {
      title: "TODO ITEM2",
      description: "TODO ITEM2 DESC",
      author: user,
      DateCreated: Date.now,
      completed: false,
    },
  ];
 const [todolist, setTodo] = useState(initialItems)
  
  const handleAddTodoItem = (newTodo) => { 
   setTodo([newTodo, ...todolist]);
  }

  function handleCheckBoxToggle(title) { 
    let copyList = [...todolist];
    copyList.forEach((val)=>{
      if (val.title == title) {
        val.completed = !val.completed;
      }
    })
    setTodo(copyList);
  }
  
  return (
    <div>
      <br />
      <UserBar user={user} setUser={setUser} />
      <br />
      <hr></hr>
      <label>
        <h3>Create TODO : </h3>
      </label>
      <br />
      <span>&nbsp;&nbsp;</span>
      <CreateTodoItem user={user} handleAddTodoItem={handleAddTodoItem} />
      <br />
      <hr></hr>
      <div>
        <h3>Todo List</h3>
        <TodoList
          todolist={todolist}
          handleCheckBoxToggle={handleCheckBoxToggle}
        />
      </div>
    </div>
  );
}

export default App;
