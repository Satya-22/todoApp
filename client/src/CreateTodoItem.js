import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function CreateTodoItem() {
  const date = new Date();

  let currentDay = String(date.getDate()).padStart(2, "0");

  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

  let currentYear = date.getFullYear();

  let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

  let id = uuidv4();

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  // const [todo, createTodo] = useResource(
  //   ({ title, description, author,dateCreated,completed,id }) => ({
  //     url: "/todo",
  //     method: "post",
  //     data: { title, description, author,dateCreated,completed,id },
  //   })
  // );

  const [todo, createTodo] = useResource(
    ({ title, description, author, dateCreated, completed, _id }) => ({
      url: "/todo",
      method: "post",
      headers: { Authorization: `${state.user.access_token}` },
      data: { title, description, author, dateCreated, completed, _id },
    })
  );

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleCreate() {
    const newTodo = {
      _id: id,
      title,
      description,
      author: user.username,
      dateCreated: currentDate,
      completed: false,
      dateCompleted: "",
    };
    createTodo(newTodo);
    // dispatch({ type: "CREATE_TODO", ...newTodo });
  }
  useEffect(() => {
    if (todo.isLoading === false && todo.data) {
      dispatch({
        type: "CREATE_TODO",
        title: todo.data.title,
        description: todo.data.description,
        _id: todo.data.id,
        author: todo.data.author,
        dateCreated: todo.data.dateCreated,
        completed: todo.data.completed,
      });
    }
  }, [todo]);

  const userBarStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f3f4f6",
    width: "100%",
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <div style={userBarStyle}>
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
        &nbsp;<div>Author : {user.username} </div>
        &nbsp; <div>DateCreated : {currentDate}</div>&nbsp;
        <br />
        <input type="submit" value="Create" />
      </div>
    </form>
  );
}
