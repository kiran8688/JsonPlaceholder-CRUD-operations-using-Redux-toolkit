import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const showTodoSlice = createAsyncThunk("todos", async (id) => {
  console.log(id);
  return await axios
    .get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
    .then((response) => response.data);
});
export const createTodoSlice = createAsyncThunk("createTodo", async () => {
  return await axios
    .post(`https://jsonplaceholder.typicode.com/users/todos`)
    .then((response) => response.data);
});
export const updateTodoSlice = createAsyncThunk("updateTodo", async (id) => {
  return await axios
    .patch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
    .then((response) => response.data);
});
export const deleteTodoSlice = createAsyncThunk("deleteTodo", async (id) => {
  return await axios
    .delete(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
    .then((response) => response.data);
});


const initialState = {
  todoList: [],
  loading: false,
  error: null,
  createdTodo: {},
  updatedTodo:{},
  deletedTodo: {}
};

export const TodoSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(showTodoSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showTodoSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.todoList = action.payload;
      state.error = "";
    });
    builder.addCase(showTodoSlice.rejected, (state, action) => {
      state.loading = false;
      state.todoList = [];
      state.error = action.error.message;
    });
    builder.addCase(createTodoSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTodoSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.createdTodo = action.payload;
      state.error = "";
    });
    builder.addCase(createTodoSlice.rejected, (state, action) => {
      state.loading = false;
      state.createdTodo = {};
      state.error = action.error.message;
    });
    builder.addCase(updateTodoSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTodoSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedTodo = action.payload;
      state.error = "";
    });
    builder.addCase(updateTodoSlice.rejected, (state, action) => {
      state.loading = false;
      state.updatedTodo = {};
      state.error = action.error.message;
    });
    builder.addCase(deleteTodoSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodoSlice.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedTodo = action.payload;
      state.error = "";
    });
    builder.addCase(deleteTodoSlice.rejected, (state, action) => {
      state.loading = false;
      state.deletedTodo = {};
      state.error = action.error.message;
    });

  },
});
export default TodoSlice.reducer;
