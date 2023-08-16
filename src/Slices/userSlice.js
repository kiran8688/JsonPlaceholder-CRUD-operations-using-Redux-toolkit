import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const showUsers = createAsyncThunk("showUsers", async () => {
  return await axios
    .get(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => response.data);
});
export const createUsers = createAsyncThunk("createUsers", async () => {
  return await axios
    .post(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => response.data);
});
export const updateUsers = createAsyncThunk("updateUsers", async (id) => {
  return await axios
    .patch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => response.data);
});
export const deleteUsers = createAsyncThunk("deleteUsers", async (id) => {
  return await axios
    .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((response) => response.data);
});

const initialState = {
  usersList: [],
  loading: false,
  error: null,
  createdUser:{},
  updatedUser:{},
  deletedUser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(showUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.usersList = action.payload;
      state.error = "";
    });
    builder.addCase(showUsers.rejected, (state, action) => {
      state.loading = false;
      state.usersList = [];
      state.error = action.error.message;
    });
    builder.addCase(createUsers.pending, (state)=>{
      state.loading=true
    })
    builder.addCase(createUsers.fulfilled, (state, action)=>{
      state.loading = false
      state.createdUser = action.payload
      state.error= ''
    })
    builder.addCase(createUsers.rejected, (state, action)=>{
      state.loading= false
      state.createdUser = []
      state.error = action.error.message
    })
    builder.addCase(updateUsers.pending, (state)=>{
      state.loading=true
    })
    builder.addCase(updateUsers.fulfilled, (state, action)=>{
      state.loading = false
      state.updatedUser = action.payload
      state.error= ''
    })
    builder.addCase(updateUsers.rejected, (state, action)=>{
      state.loading= false
      state.updatedUser = []
      state.error = action.error.message
    })
    builder.addCase(deleteUsers.pending, (state)=>{
      state.loading=true
    })
    builder.addCase(deleteUsers.fulfilled, (state, action)=>{
      state.loading = false
      state.deletedUser = action.payload
      state.error= ''
    })
    builder.addCase(deleteUsers.rejected, (state, action)=>{
      state.loading= false
      state.deletedUser = []
      state.error = action.error.message
    })
  },
});
export default userSlice.reducer;
// [showUsers.pending] : (state)=>{
//     state.loading = true;
// },
// [showUsers.fulfilled] : (state, action)=>{
//     state.loading= false
//     state.users = action.payload
// },
// [showUsers.rejected] : (state, action) =>{
//     state.loading = false
//     state.error = action.payload
// }
