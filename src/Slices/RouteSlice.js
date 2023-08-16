import { createSlice } from "@reduxjs/toolkit";
import Users from "../Components/Users";
import Albums from "../Components/Albums";
import Todo from "../Components/Todo";
import Posts from "../Components/Posts";

const initialState = {
    component: <Users />
}

export const routeSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        albums: (state) => {
            state.component = <Albums />
        },
        todos: (state) => {
            state.component = <Todo />
        },
        posts: (state) => {
            state.component = <Posts />
        },
    },
})

export const { albums, todos, posts } = routeSlice.actions
export default routeSlice.reducer