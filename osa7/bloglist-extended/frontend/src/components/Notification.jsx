import { useSelector } from 'react-redux';

const Notification = () => {
  const message = useSelector(({ notification }) => {
    return notification;
  });
  const state = useSelector(({ notificationState }) => {
    return notificationState;
  });
  if (message === null) {
    return null;
  }
  if (state === 0) {
    return <div className='notificationSuccess'>{message}</div>;
  } else {
    return <div className='notificationError'>{message}</div>;
  }
};

export default Notification;
