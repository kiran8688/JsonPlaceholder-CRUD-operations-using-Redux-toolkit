import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const showPhotosSlice = createAsyncThunk("photos", async (id) => {
  console.log(id);
  return await axios
    .get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
    .then((response) => response.data);
});
export const createPhotoSlice = createAsyncThunk("createPhoto", async () => {
  return await axios
    .post(`https://jsonplaceholder.typicode.com/albums/photos`)
    .then((response) => response.data);
});
export const updatePhotoSlice = createAsyncThunk("updatePhoto", async (id) => {
  return await axios
    .patch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
    .then((response) => response.data);
});
export const deletePhotoSlice = createAsyncThunk("deletePhoto", async (id) => {
  return await axios
    .delete(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
    .then((response) => response.data);
});

const initialState = {
  photosList: [],
  loading: false,
  error: null,
  createdPhoto: {},
  updatedPhoto:{},
  deletedPhoto: {}
};

export const PhotoSlice = createSlice({
  name: "photos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(showPhotosSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showPhotosSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.photosList = action.payload;
      state.error = "";
    });
    builder.addCase(showPhotosSlice.rejected, (state, action) => {
      state.loading = false;
      state.photosList = [];
      state.error = action.error.message;
    });
    builder.addCase(createPhotoSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPhotoSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.createdPhoto = action.payload;
      state.error = "";
    });
    builder.addCase(createPhotoSlice.rejected, (state, action) => {
      state.loading = false;
      state.createdPhoto = {};
      state.error = action.error.message;
    });
    builder.addCase(updatePhotoSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePhotoSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedPhoto = action.payload;
      state.error = "";
    });
    builder.addCase(updatePhotoSlice.rejected, (state, action) => {
      state.loading = false;
      state.updatedPhoto = {};
      state.error = action.error.message;
    });
    builder.addCase(deletePhotoSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePhotoSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedPhoto = action.payload;
      state.error = "";
    });
    builder.addCase(deletePhotoSlice.rejected, (state, action) => {
      state.loading = false;
      state.deletedPhoto = {};
      state.error = action.error.message;
    });
  },
});
export default PhotoSlice.reducer;
