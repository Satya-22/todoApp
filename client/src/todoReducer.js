function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        username: action.username,
        access_token: action.access_token,
      };
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
        _id: action._id,
      };
      return [newTodo, ...state];
    case "TOGGLE_TODO":
      return state.map((item) => {
        if (item._id === action._id) {
          const updatedTodo = {
            ...item,
            completed: !item.completed,
           // dateCompleted: action.cdate,
           dateCompleted: item.completed ? "" : action.cdate,
          };
          return updatedTodo;
        }
        return item;
      });
    case "DELETE_TODO":
      let newState = [...state];
      const newState1 = newState.filter((item) => item._id !== action._id);

      return newState1;
    case "FETCH_TODOS":
      return action.todos;
    
    case "CLEAR_TODOS":
      return [];

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
