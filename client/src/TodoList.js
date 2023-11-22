import Todo from "./Todo";
import React from "react";
import { useContext } from "react";
import { StateContext } from "./contexts";

export default function TodoList() {
  const { state } = useContext(StateContext);
  const { todolist } = state;

  console.log("Printing todolist", todolist);

    const userBarStyle = {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#f3f4f6",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    };

  return (
    <div style={userBarStyle}>
      {todolist.length === 0 && <h2>No posts found.</h2>}
      {todolist.length > 0 &&
        todolist.map((p, i) => {
          console.log("Rendering Todo with data: ", p);
          return <Todo {...p} key={p._id || p.id} />;
        })}
    </div>
  );
}
