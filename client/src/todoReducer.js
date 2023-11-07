function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function todosReducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      const newTodo = {
        title: action.title,
        description: action.description,
        author: action.author,
        dateCreated: action.dateCreated,
        completed: action.completed,
        id: action.id,
      };
      return [newTodo, ...state];
    case "TOGGLE_TODO":
      return state.map((item) => {
        if (item.id === action.id) {
          const updatedTodo = {
            ...item,
            completed: !item.completed,
            dateCompleted: action.cdate,
          };
          return updatedTodo;
        }
        return item;
      });
    case "DELETE_TODO":
      let newState = [...state];
      const newState1 = newState.filter((item) => item.id !== action.id);

      return newState1;
    case "FETCH_TODOS":
      return action.todos;

    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todolist: todosReducer(state.todolist, action),
  };
}
