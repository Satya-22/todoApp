import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { useContext } from "react";
import { StateContext } from "./contexts";

export default function TodoList() {
  const { state } = useContext(StateContext);
  const { todolist } = state;
  
  return (
    <div >
      {todolist.map((p) => (
        <Todo
          {...p}
          key={uuidv4()}
        />
      ))}
    </div>
  );
}
