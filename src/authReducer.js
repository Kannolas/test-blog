import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
name: 'auther',
initialState: {
nickname: '',
isAuth: false,
id: 0,
},
reducers:{
authSuccess: (state, action)=>{state.isAuth = true;
state.nickname = action.payload.nickname;
state.id = action.payload.id
},
logOut: (state)=>{state.isAuth = false
    state.nickname='';
    state.id = 0
}
},
})

export const {authSuccess, logOut} = authSlice.actions

export default authSlice.reducer 