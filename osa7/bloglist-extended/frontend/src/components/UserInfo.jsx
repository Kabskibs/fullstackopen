const UserInfo = ({ user, logout }) => {
  if (!user) {
    return null;
  }
  return (
    <div>
      {user.name} logged in<br></br>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default UserInfo;
