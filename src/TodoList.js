import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export default function TodoList({ todolist, handleCheckBoxToggle, handleDeleteTodo }) {
  return (
    <div>
      {todolist.map((p) => (
        <Todo
          {...p}
          key={uuidv4()}
          handleCheckBoxToggle={handleCheckBoxToggle}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </div>
  );
}
