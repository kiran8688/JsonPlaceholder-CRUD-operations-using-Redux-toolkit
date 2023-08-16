import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import postReducer from "./Slices/PostsSlice";
import userDetailsReducer from "./Slices/UserDetailsSlice";
// import routesReducer from './Slices/RouteSlice'
import albumReducer from "./Slices/AlbumSlice";
import todoReducer from "./Slices/TodosSlice";
import photoReducer from "./Slices/PhotosSlice";
import commentReducer from './Slices/CommentsSlice'
export const store = configureStore({
  reducer: {
    // routes: routesReducer,
    users: userReducer,
    posts: postReducer,
    userDetails: userDetailsReducer,
    albums: albumReducer,
    todos: todoReducer,
    photos: photoReducer,
    comments: commentReducer,
  },
});
