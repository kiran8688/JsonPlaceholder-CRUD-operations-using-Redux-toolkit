import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const showComments = createAsyncThunk("showComments", async (id) => {
  return await axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then((response) => response.data);
});
export const createCommentSlice = createAsyncThunk("createComments", async () => {
  return await axios
    .post(`https://jsonplaceholder.typicode.com/posts/comments`)
    .then((response) => response.data);
});
export const updateCommentSlice = createAsyncThunk("updateComments", async (id) => {
  return await axios
    .patch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then((response) => response.data);
});
export const deleteCommentSlice = createAsyncThunk("deleteComments", async (id) => {
  return await axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then((response) => response.data);
});


const initialState = {
  commentsList: [],
  loading: false,
  error: null,
  createdComment:{},
  updatedComment:{},
  deletedComment:{}
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(showComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showComments.fulfilled, (state, action) => {
      state.loading = false;
      state.commentsList = action.payload;
      state.error = "";
    });
    builder.addCase(showComments.rejected, (state, action) => {
      state.loading = false;
      state.commentsList = [];
      state.error = action.error.message;
    });
    builder.addCase(createCommentSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCommentSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.createdComment = action.payload;
      state.error = "";
    });
    builder.addCase(createCommentSlice.rejected, (state, action) => {
      state.loading = false;
      state.createdComment = {};
      state.error = action.error.message;
    });
    builder.addCase(updateCommentSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCommentSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedComment = action.payload;
      state.error = "";
    });
    builder.addCase(updateCommentSlice.rejected, (state, action) => {
      state.loading = false;
      state.updatedComment = {};
      state.error = action.error.message;
    });
    builder.addCase(deleteCommentSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCommentSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedComment = action.payload;
      state.error = "";
    });
    builder.addCase(deleteCommentSlice.rejected, (state, action) => {
      state.loading = false;
      state.deletedComment = {};
      state.error = action.error.message;
    });
  },
});
export default commentsSlice.reducer;
