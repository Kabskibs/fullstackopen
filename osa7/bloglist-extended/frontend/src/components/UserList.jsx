import { useSelector } from 'react-redux';

import User from './User';

const UserList = () => {
  const users = useSelector(({ users }) => {
    return users.toSorted();
  });

  return (
    <div>
      <h2>Users</h2>
      <div className='divUserTable'>
        <div className='divUserTableHeading'>
          <div className='divUserTableRow'>
            <div className='divUserTableHead'></div>
            <div className='divUserTableHead'>blogs created</div>
          </div>
        </div>
        <div className='divUserTableBody'>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
