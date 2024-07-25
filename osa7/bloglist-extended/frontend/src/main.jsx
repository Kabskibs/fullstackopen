import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './App';

import notificationReducer from './reducers/notificationReducer';
import notificationStateReducer from './reducers/notificationStateReducer';

import './index.css';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    notificationState: notificationStateReducer,
  },
});

console.log('STORE STATE: ', store.getState());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
