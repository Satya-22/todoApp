import React, { useContext, useEffect } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function Todo({
  title,
  description,
  author,
  dateCreated,
  completed,
  _id,
  dateCompleted,
}) {
  console.log("Todo ID Check : ", title, _id, completed, dateCompleted);
  const date = new Date();

  let currentDay = String(date.getDate()).padStart(2, "0");

  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

  let currentYear = date.getFullYear();
  let currentHour = String(date.getHours()).padStart(2, "0");
  let currentMinute = String(date.getMinutes()).padStart(2, "0");
  let currentSecond = String(date.getSeconds()).padStart(2, "0");

  // we will display the date as DD-MM-YYYY

  let currentDate = `${currentDay}-${currentMonth}-${currentYear} ${currentHour}:${currentMinute}:${currentSecond}`;
  const { state, dispatch } = useContext(StateContext);
  const { user }  = state;
  const [dtodo, deleteTodo] = useResource(
    ({
      title,
      description,
      author,
      dateCreated,
      completed,
      _id,
      dateCompleted,
    }) => ({
      url: `/todo/${_id}`,
      method: "delete",
      headers: { Authorization: `${state.user.access_token}` },
      data: {
        title,
        description,
        author,
        dateCreated,
        completed,
        _id,
        dateCompleted,
      },
    })
  );

  const [uptodo, updateTodo] = useResource(
    ({
      title,
      description,
      author,
      dateCreated,
      completed,
      _id,
      dateCompleted,
    }) => ({
      url: `/todo/${_id}`,
      method: "put",
      headers: { Authorization: `${state.user.access_token}` },
      data: {
        title,
        description,
        author,
        dateCreated,
        completed,
        _id,
        dateCompleted,
      },
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
      _id: _id,
      // dateCompleted: cdate,
      dateCompleted: completed ? "" : cdate,
    };
    updateTodo(updatedTodo);
    //  dispatch({ type: "TOGGLE_TODO", _id, cdate });
  }

  const deletedData = {
    title: title,
    description: description,
    author: author,
    dateCreated: dateCreated,
    completed: completed,
    _id: _id,
    dateCompleted: "",
  };

  function onDeleteTodo() {
    console.log("Delete Todo Reached : ", deletedData);
    console.log("ID : ", _id);
    deleteTodo(deletedData);
    // dispatch({ type: "DELETE_TODO", _id });
  }

  useEffect(() => {
    if (dtodo.isLoading === false && dtodo.data) {
      dispatch({
        type: "DELETE_TODO",
        _id
      });
    }
  }, [dtodo]);

  useEffect(() => {
    if (uptodo.isLoading === false && uptodo.data) {
      dispatch({
        type: "TOGGLE_TODO",
        _id,
        cdate: uptodo.data.dateCompleted, 
        completed: uptodo.data.completed,
      });
    }
  }, [uptodo]);

      const userBarStyle = {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f3f4f6",
        borderBottom: "1px solid #ccc",
        width: "100%",
        padding: "10px",
        margin: "0",
      };
  return (
    <div style={userBarStyle}>
      <h3> Title : {title}</h3>
      <div>Description : {description}</div>
      <br />
      <div>Author: {author}</div>
      <br />
      <div>DateCreated : {dateCreated}</div>
      <br/>
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
      <br />
    </div>
  );
}
