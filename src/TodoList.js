import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { useState } from "react";
export default function TodoList({ todolist, handleCheckBoxToggle }) {
 
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
          {todolist.map((p) => (
              <Todo {...p} key={uuidv4()} handleCheckBoxToggle={ handleCheckBoxToggle} />
      ))}
    </div>
  );
}
