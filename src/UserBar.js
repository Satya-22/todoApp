import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

export default function UserBar({ user, setUser }) {
  if (user) {
    return <Logout user={user} setUser={setUser} />;
  } else {
    return (
      <>
        <label>
          <h3>Login</h3>
        </label>
        &nbsp;&nbsp;
        <span>&nbsp;&nbsp;</span>
        <Login setUser={setUser} />
        <label>
          <br />
          <h3>Register</h3>
          <br />
        </label>
        &nbsp;&nbsp;
        <span>&nbsp;&nbsp;</span>
        <Register setUser={setUser} />
      </>
    );
  }
}
