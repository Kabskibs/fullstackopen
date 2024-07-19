import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    nullNotification(state) {
      state = null
      return state
    }
  },
})

export const { newNotification, nullNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    const timeMs = time * 1000
    dispatch(newNotification(message))
    setTimeout(() => {
      dispatch(nullNotification())
    }, timeMs);
  }
}

export default notificationSlice.reducer