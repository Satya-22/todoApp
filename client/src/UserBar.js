import { useContext } from "react";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { StateContext } from "./contexts";

export default function UserBar() {
  const { state } = useContext(StateContext);
  const { user } = state;

  const userBarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f3f4f6",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    margin: "20px",
  };

  return (
    <div style={userBarStyle}>
      {user ? (
        <div>
          <Logout />
        </div>
      ) : (
        <div>
          <div>
            <h2 className="text-center mb-4">
              <u>
               Login
              </u>
            </h2>
            <Login />
          </div>
          
          <div>
            <h2 className="text-center mb-4"><u>Register</u></h2>
            <Register />
          </div>
        </div>
      )}
    </div>
  );
}
