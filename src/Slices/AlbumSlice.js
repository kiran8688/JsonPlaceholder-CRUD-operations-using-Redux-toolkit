import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const showAlbumSlice = createAsyncThunk("albums", async (id) => {
  console.log(id);
  return await axios
    .get(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
    .then((response) => response.data);
});
export const createAlbumSlice = createAsyncThunk("createAlbum", async () => {
  return await axios
    .post(`https://jsonplaceholder.typicode.com/users/albums`)
    .then((response) => response.data);
});
export const updateAlbumSlice = createAsyncThunk("updateAlbum", async (id) => {
  return await axios
    .patch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
    .then((response) => response.data);
});
export const deleteAlbumSlice = createAsyncThunk("deleteAlbum", async (id) => {
  return await axios
    .delete(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
    .then((response) => response.data);
});


const initialState = {
  albumsList: [],
  loading: false,
  error: null,
  createdAlbum: {},
  updatedAlbum:{},
  deletedAlbum: {}
};

export const AlbumSlice = createSlice({
  name: "albums",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(showAlbumSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showAlbumSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.albumsList = action.payload;
      state.error = "";
    });
    builder.addCase(showAlbumSlice.rejected, (state, action) => {
      state.loading = false;
      state.albumsList = [];
      state.error = action.error.message;
    });
    builder.addCase(createAlbumSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAlbumSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.createdAlbum = action.payload;
      state.error = "";
    });
    builder.addCase(createAlbumSlice.rejected, (state, action) => {
      state.loading = false;
      state.createdAlbum = [];
      state.error = action.error.message;
    });
    builder.addCase(updateAlbumSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAlbumSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedAlbum = action.payload;
      state.error = "";
    });
    builder.addCase(updateAlbumSlice.rejected, (state, action) => {
      state.loading = false;
      state.updatedAlbum = [];
      state.error = action.error.message;
    });
    builder.addCase(deleteAlbumSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAlbumSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedAlbum = action.payload;
      state.error = "";
    });
    builder.addCase(deleteAlbumSlice.rejected, (state, action) => {
      state.loading = false;
      state.deletedAlbum = [];
      state.error = action.error.message;
    });
  },
});
export default AlbumSlice.reducer;
