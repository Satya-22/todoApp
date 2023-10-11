import React, { useState } from "react";
export default function Register({ setUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatpassword, setRepeatPassword] = useState('')

  function handleUsername(evt) { setUsername(evt.target.value) }
  function handlePasssword(evt) { setPassword(evt.target.value) }
  function handleRepeatPassword(evt) { setRepeatPassword(evt.target.value) }
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUser(username);
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
      &nbsp;{" "}
      <label htmlFor="register-password">Password:</label>
      &nbsp;{" "}
      <input
        type="password"
        value={password}
        onChange={handlePasssword}
        name="register-password"
        id="register-password"
      />
      &nbsp; <label htmlFor="register-password-repeat">Repeat password:</label>
      &nbsp;{" "}
      <input
        type="password"
        value={repeatpassword}
        onChange={handleRepeatPassword}
        name="register-password-repeat"
        id="register-password-repeat"
      />
      &nbsp;{" "}
      <input
        type="submit"
        value="Register"
        disabled={
          username.length === 0 ||
          password.length === 0 ||
          password !== repeatpassword
        }
      />
    </form>
  );
}
