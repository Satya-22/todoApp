import React, { useState } from "react";
import { useResource } from "react-request-hook";
import { useEffect } from "react";
import { useContext } from "react";
import { StateContext } from "./contexts";

export default function Register() {
  const { dispatch: dispatchUser } = useContext(StateContext);
  const [status, setStatus] = useState("");
  const [user, register] = useResource((username, password) => ({
    url: "/auth/register",
    method: "post",
    data: { username, password,passwordConfirmation:password },
  }));

  // useEffect(() => {
  //   if (user && user.data) {
  //     dispatchUser({ type: "REGISTER", username: user.data.user.email });
  //   }
  // }, [user, dispatchUser]);

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setStatus("Registration failed, please try again later.");
      } else {
        setStatus("Registration successful. You may now login.");
      }
    }
  }, [user]);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");

  function handleUsername(evt) {
    setUserName(evt.target.value);
  }
  function handlePasssword(evt) {
    setPassword(evt.target.value);
  }
  function handleRepeatPassword(evt) {
    setRepeatPassword(evt.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // setUser(username);
        register(username, password);
        // dispatchUser({ type: "REGISTER", username: username });
      }}
    >
      <label htmlFor="register-username">Username:</label>
      &nbsp;{" "}
      <input
        type="text"
        value={username}
        onChange={handleUsername}
        name="register-username"
        id="register-username"
      />
      <br />
      <br />
      <label htmlFor="register-password">Password:</label>
      &nbsp;{" "}
      <input
        type="password"
        value={password}
        onChange={handlePasssword}
        name="register-password"
        id="register-password"
      />
      <br />
      <br />
      <label htmlFor="register-password-repeat">&nbsp;Repeat password:</label>
      &nbsp;{" "}
      <input
        type="password"
        value={repeatpassword}
        onChange={handleRepeatPassword}
        name="register-password-repeat"
        id="register-password-repeat"
      />
      <br />
      <br />
      <input
        type="submit"
        value="Register"
        disabled={
          username.length === 0 ||
          password.length === 0 ||
          password !== repeatpassword
        }
      />
      {status && <p>{status}</p>}
    </form>
  );
}
