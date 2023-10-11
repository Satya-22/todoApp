import { useState } from "react";
export default function CreateTodoItem({ user, handleAddTodoItem }) {
  const date = new Date();

  let currentDay = String(date.getDate()).padStart(2, "0");

  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

  let currentYear = date.getFullYear();

  let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleCreate() {
    const newTodo = {
      title,
      description,
      author: user,
      dateCreated: currentDate,
      completed: false,
    };
    handleAddTodoItem(newTodo);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <div>
        &nbsp;
        <label htmlFor="create-title">Title:</label>
        &nbsp;{" "}
        <input
          type="text"
          onChange={handleTitle}
          name="create-title"
          id="create-title"
        />
      </div>
      <br />
      <div>
        &nbsp;<label htmlFor="create-description">Description:</label>
        &nbsp;{" "}
        <input
          type="text"
          onChange={handleDescription}
          name="create-description"
          id="create-description"
        />
      </div>
      
        &nbsp;<div>Author : {user} </div> 
      &nbsp; <div>DateCreated : {currentDate}</div>&nbsp;
      <br />
      <input type="submit" value="Create" />
    </form>
  );
}
