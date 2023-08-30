import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: 'posts',
    initialState:{
        postList: [],
    },
    reducers:{
        addPost:(state, action)=>{
            state.postList.push(action.payload);
        },
        addPosts:(state, action)=>{
            state.postList.push(...action.payload)
        },
        clearPosts:(state, action)=>{
            state.postList = []
        },
        removePost:(state,action)=>{
        state.postList = state.postList.filter(post => post.id !== action.payload)
        },
    },
})

export const {addPost, addPosts, clearPosts, removePost} = postsSlice.actions;

export default postsSlice.reducer