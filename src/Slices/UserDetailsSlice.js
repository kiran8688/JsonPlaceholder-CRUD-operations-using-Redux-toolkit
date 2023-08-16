import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const showUserDetailSlice = createAsyncThunk(
  "userDetails",
  async (id) => {
    console.log(id);
    return await axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.data);
  }
);
export const updateUserSlice = createAsyncThunk("updateUserDetails", async (id) => {
  return await axios
    .patch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => response.data);
});
export const deleteUserSlice = createAsyncThunk("deleteUserDetails", async (id) => {
  return await axios
    .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => response.data);
});

const initialState = {
  userDetailsList: [],
  loading: false,
  error: null,
  updatedUserDetails:{},
  deletedUserDetails:{},
};

export const userDetailSlice = createSlice({
  name: "userDetails",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(showUserDetailSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showUserDetailSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.userDetailsList = action.payload;
      state.error = "";
    });
    builder.addCase(showUserDetailSlice.rejected, (state, action) => {
      state.loading = false;
      state.userDetailsList = [];
      state.error = action.error.message;
    });
    builder.addCase(updateUserSlice.pending, (state)=>{
      state.loading=true
    })
    builder.addCase(updateUserSlice.fulfilled, (state, action)=>{
      state.loading = false
      state.updatedUserDetails = action.payload
      state.error= ''
    })
    builder.addCase(updateUserSlice.rejected, (state, action)=>{
      state.loading= false
      state.updatedUserDetails = {}
      state.error = action.error.message
    })
    builder.addCase(deleteUserSlice.pending, (state)=>{
      state.loading=true
    })
    builder.addCase(deleteUserSlice.fulfilled, (state, action)=>{
      state.loading = false
      state.deletedUserDetails = action.payload
      state.error= ''
    })
    builder.addCase(deleteUserSlice.rejected, (state, action)=>{
      state.loading= false
      state.deletedUserDetails = {}
      state.error = action.error.message
    })
  },
});
export default userDetailSlice.reducer;
