import PropTypes from 'prop-types';
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

Notification.propTypes = {
  message: PropTypes.string,
  state: PropTypes.number.isRequired,
};

export default Notification;
