import React, { useContext } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function Todo({
  title,
  description,
  author,
  dateCreated,
  completed,
  id,
  dateCompleted,
}) {
  const date = new Date();

  let currentDay = String(date.getDate()).padStart(2, "0");

  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

  let currentYear = date.getFullYear();
  let currentHour = String(date.getHours()).padStart(2, "0");
  let currentMinute = String(date.getMinutes()).padStart(2, "0");
  let currentSecond = String(date.getSeconds()).padStart(2, "0");

  // we will display the date as DD-MM-YYYY

  let currentDate = `${currentDay}-${currentMonth}-${currentYear} ${currentHour}:${currentMinute}:${currentSecond}`;
  const { dispatch } = useContext(StateContext);
  const [dtodo, deleteTodo] = useResource(
    ({ title, description, author, dateCreated, completed, id,dateCompleted }) => ({
      url: `/todos/${id}`,
      method: "delete",
      data: { title, description, author, dateCreated, completed, id,dateCompleted },
    })
  );

  const [uptodo, updateTodo] = useResource(
    ({ title, description, author, dateCreated, completed, id,dateCompleted }) => ({
      url: `/todos/${id}`,
      method: "put",
      data: { title, description, author, dateCreated, completed, id ,dateCompleted},
    })
  );

  function onCheckboxChange() {
    const cdate = currentDate;
    const updatedTodo = {
      title: title,
      description: description,
      author: author,
      dateCreated: dateCreated,
      completed: !completed,
      id: id,
      dateCompleted: cdate,
    };
    updateTodo(updatedTodo);
    dispatch({ type: "TOGGLE_TODO", id,cdate });
  }

  const deletedData = {
    title: title,
    description: description,
    author: author,
    dateCreated: dateCreated,
    completed: completed,
    id: id,
    dateCompleted: "",
  };

  function onDeleteTodo() {
    deleteTodo(deletedData);
    dispatch({ type: "DELETE_TODO", id });
  }
  
  return (
    <div>
      <h3> Title : {title}</h3>
      <div>Description : {description}</div>
      <br />
      <div>Author: {author}</div>
      <br />
      <div>DateCreated : {dateCreated}</div>
      <div>
        Completed :{" "}
        <input
          type="checkbox"
          checked={completed}
          onChange={onCheckboxChange}
        />
      </div>

      {(() => {
        if (completed) {
          return <div>dateCompleted : {dateCompleted}</div>;
        }
      })()}
      <br />
      <div>
        <button type="Button" onClick={onDeleteTodo}>
          Delete
        </button>
      </div>
      <hr></hr>
      <br />
    </div>
  );
}
