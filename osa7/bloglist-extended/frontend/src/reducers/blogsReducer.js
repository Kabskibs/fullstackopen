import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    voteBlog(state, action) {
      const id = action.payload.id;
      return state.map((a) => (a.id === id ? action.payload : a));
    },
    removeBlog(state, action) {
      const id = action.payload.id;
      return state.filter((a) => a.id !== id);
    },
  },
});

export const { setBlogs, addBlog, voteBlog, removeBlog } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const newBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch(addBlog(newBlog));
  };
};

export const addVote = (blogObject) => {
  return async (dispatch) => {
    const response = await blogService.update(blogObject);
    dispatch(voteBlog(response.data));
  };
};

export const deleteBlog = (blogObject) => {
  return async (dispatch) => {
    const response = await blogService.remove(blogObject);
    console.log('RES: ', response);
    dispatch(removeBlog(blogObject));
  };
};

export default blogsSlice.reducer;
