const User = ({ user }) => {
  return (
    <div className='divUserTableRow'>
      <div className='divUserTableCellLeft'>{user.name}</div>
      <div className='divUserTableCellRight'>{user.blogs.length}</div>
    </div>
  );
};

export default User;
