import { useState, useEffect } from "react";
import { useResource } from "react-request-hook";
import { useContext } from "react";
import { StateContext } from "./contexts";

export default function Login() {
  const [username, setUsername] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");
  function handleUsername(evt) {
    setUsername(evt.target.value);
  }
  function handlePasssword(evt) {
    setPassword(evt.target.value);
  }
  const { dispatch } = useContext(StateContext);

  const [user, login] = useResource((username, password) => ({
    url: "/login",
    method: "post",
    data: { email: username, password },
  }));

  useEffect(() => {
    if (user) {
      if (user?.data?.user) {
        console.log("login success Reached", user.data.user.email);
        dispatch({ type: "LOGIN", username: user.data.user.email });
      } else {
        console.log("login failed Reached");
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user?.error) {
      setLoginFailed(true);
    } else {
      setLoginFailed(false);
    }
  }, [user]);

  return (
    <>
      {loginFailed && (
        <span style={{ color: "red" }}>Invalid username or password</span>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(username, password);
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
        <br />
        <br />
        <label htmlFor="login-password">Password:</label>
        &nbsp;{" "}
        <input
          type="password"
          name="login-password"
          id="login-password"
          onChange={handlePasssword}
          value={password}
        />{" "}
        &nbsp; &nbsp; <br /> <br />
        <input type="submit" value="Login" disabled={username.length === 0} />
      </form>
    </>
  );
}
