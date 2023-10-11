import React, { useState } from 'react'
export default function Login({ setUser }) {
const [ username, setUsername ] = useState('')
function handleUsername (evt) { setUsername(evt.target.value) }
return (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      setUser(username);
    }}
  >
    <label htmlFor="login-username">Username: &nbsp;</label>
    &nbsp;{" "}
    <input
      type="text"
      value={username}
      onChange={handleUsername}
      name="login-username"
      id="login-username"
    />
    &nbsp;
    <label htmlFor="login-password">Password:</label>
    &nbsp; <input
      type="password"
      name="login-password"
      id="login-password"
    />{" "}
    &nbsp; &nbsp;{" "}
    <input type="submit" value="Login" disabled={username.length === 0} />
  </form>
);
}
