import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    nullNotification(state) {
      state = null
      return state
    }
  },
})

export const { setNotification, nullNotification } = notificationSlice.actions
export default notificationSlice.reducer