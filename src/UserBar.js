import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

export default function UserBar({ user, dispatchUser }) {
  if (user) {
    return <Logout user={user} dispatchUser={dispatchUser} />;
  } else {
    return (
      <>
        <h3>
          <u>
            <strong>Login/Registration </strong>
          </u>
          :
        </h3>
        &nbsp;&nbsp;
        <span>&nbsp;&nbsp;</span>
        <Login dispatchUser={dispatchUser} />
        <br />
        &nbsp;&nbsp;
        <span>&nbsp;&nbsp;</span>
        <Register dispatchUser={dispatchUser} />
      </>
    );
  }
}
