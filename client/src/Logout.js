import React, { useContext } from "react";
import { StateContext } from "./contexts";

export default function Logout() {
  const { state, dispatch:dispatchUser } = useContext(StateContext);
  const { user } = state;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatchUser({ type: "LOGOUT" });
        dispatchUser({ type: "CLEAR_TODOS" });
      }}
    >
      Logged in as: &nbsp;<b>{user.username}</b>&nbsp;
      <br />
      <br />
      <input type="submit" value="Logout" />
    </form>
  );
}
