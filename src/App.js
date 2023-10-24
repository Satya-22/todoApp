import "./App.css";

import UserBar from "./UserBar";
import CreateTodoItem from "./CreateTodoItem";
import { useReducer } from "react";
import TodoList from "./TodoList";
import appReducer from "./todoReducer";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todolist: [],
  });
  const { user, todolist } = state;

  const handleAddTodoItem = (newTodo) => {
    dispatch({
      type: "CREATE_TODO",
      ...newTodo,
    });
  };

  function handleCheckBoxToggle(id) {
    dispatch({
      type: "TOGGLE_TODO",
      id,
    });
  }

  function handleDeleteTodo(id) {
    dispatch({
      type: "DELETE_TODO",
      id,
    });
  }

  if (user) {
    return (
      <div>
        <br />
        <UserBar user={user} dispatchUser={dispatch} />
        <br />
        <hr></hr>

        <label>
          <h3>
            <u>
              <strong>Create TODO</strong>
            </u>
            :
          </h3>
        </label>
        <br />
        <span>&nbsp;&nbsp;</span>

        <CreateTodoItem user={user} handleAddTodoItem={handleAddTodoItem} />

        <br />
        <hr></hr>

        <div>
          <h3>
            <u>
              <strong>Todo List</strong>
            </u>
            :
          </h3>
          <TodoList
            todolist={todolist}
            handleCheckBoxToggle={handleCheckBoxToggle}
            handleDeleteTodo={handleDeleteTodo}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <br />
        <UserBar user={user} dispatchUser={dispatch} />
        <br />
        <span>&nbsp;&nbsp;</span>
        <br />
        <hr></hr>
        <div>
          <h3>
            <u>
              <strong>Todo List</strong>
            </u>
            :
          </h3>
          <TodoList
            todolist={todolist}
            handleCheckBoxToggle={handleCheckBoxToggle}
            handleDeleteTodo={handleDeleteTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;
