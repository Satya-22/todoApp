export default function Logout({ user, dispatchUser }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatchUser({ type: "LOGOUT" });
      }}
    >
      Logged in as: &nbsp;<b>{user}</b>&nbsp;
      <br />
      <br />
      <input type="submit" value="Logout" />
    </form>
  );
}
