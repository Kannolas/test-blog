import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authReducer'
import postsReducer from './postsReducer'
import usersReducer from './usersReducer'
export default configureStore({
reducer:{
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
}
})