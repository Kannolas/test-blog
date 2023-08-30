import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: 'users',
    initialState:{
        users: [],
    },
    reducers:{
        addUser:(state, action)=>{
            state.users.push(action.payload)
        },
        addUsers:(state, action)=>{
            state.users.push(...action.payload)
        }
    }
})

export const {addUser, addUsers} = usersSlice.actions
export default usersSlice.reducer;