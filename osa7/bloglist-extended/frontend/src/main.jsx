import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './App';

import notificationReducer from './reducers/notificationReducer';
import notificationStateReducer from './reducers/notificationStateReducer';
import blogsReducer from './reducers/blogsReducer';
import usersReducer from './reducers/usersReducer';

import './index.css';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    notificationState: notificationStateReducer,
    blogs: blogsReducer,
    users: usersReducer,
  },
});

console.log('STORE STATE: ', store.getState());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
