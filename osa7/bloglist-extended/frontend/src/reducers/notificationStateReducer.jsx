import { createSlice } from '@reduxjs/toolkit';

const notificationStateSlice = createSlice({
  name: 'notificationState',
  initialState: 0,
  reducers: {
    stateSuccess(state, action) {
      return 0;
    },
    stateError(state, action) {
      return -1;
    },
  },
});

export const { stateSuccess, stateError } = notificationStateSlice.actions;

export const setNotificationStateError = (time) => {
  return async (dispatch) => {
    const timeMs = time * 1000;
    dispatch(stateError());
    setTimeout(() => {
      dispatch(stateSuccess());
    }, timeMs);
  };
};

export default notificationStateSlice.reducer;
