import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    nickname: null,
  },
  reducers: {
    // createPost(state, action) {},
    // updatePost(state, action) {},
    // deletePost(state, action) {},
  },
});
