import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const showPosts = createAsyncThunk("showPosts", async (id) => {
  return await axios
    .get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then((response) => response.data);
});
export const createPostSlice = createAsyncThunk("createPost", async () => {
  return await axios
    .post(`https://jsonplaceholder.typicode.com/users/posts`)
    .then((response) => response.data);
});
export const updatePostSlice = createAsyncThunk("updatePost", async (id) => {
  return await axios
    .patch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then((response) => response.data);
});
export const deletePostSlice = createAsyncThunk("deletePost", async (id) => {
  return await axios
    .delete(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then((response) => response.data);
});


const initialState = {
  postsList: [],
  loading: false,
  error: null,
  createdPost:{},
  updatedPost:{},
  deletedPost:{}
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(showPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.postsList = action.payload;
      state.error = "";
    });
    builder.addCase(showPosts.rejected, (state, action) => {
      state.loading = false;
      state.postsList = [];
      state.error = action.error.message;
    });
    builder.addCase(createPostSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPostSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.createdPost = action.payload;
      state.error = "";
    });
    builder.addCase(createPostSlice.rejected, (state, action) => {
      state.loading = false;
      state.createdPost = {};
      state.error = action.error.message;
    });
    builder.addCase(updatePostSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePostSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedPost = action.payload;
      state.error = "";
    });
    builder.addCase(updatePostSlice.rejected, (state, action) => {
      state.loading = false;
      state.updatedPost = {};
      state.error = action.error.message;
    });
    builder.addCase(deletePostSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePostSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedPost = action.payload;
      state.error = "";
    });
    builder.addCase(deletePostSlice.rejected, (state, action) => {
      state.loading = false;
      state.deletedPost = {};
      state.error = action.error.message;
    });
  },
});
export default postSlice.reducer;
