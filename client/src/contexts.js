import { createContext } from "react";

export const StateContext = createContext({
  state: {},
  dispatch: () => { },
});

//export const AddTodoContext = createContext(null);

// export const postListContext = createContext({
//     postlist: [],
//     toggleDispatch: () => { },
//     deleteDispatch: () => { },  
// });