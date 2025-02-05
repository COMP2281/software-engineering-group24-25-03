import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import userDetailsReducer from './slices/userDetailsSlice'
export default configureStore({
    reducer:{
        auth: authReducer,
        userDetails: userDetailsReducer
    },
})