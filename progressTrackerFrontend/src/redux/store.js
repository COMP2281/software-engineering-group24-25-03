import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import userDetailsReducer from './slices/userDetailsSlice'
import dashboardSliceReducer from './slices/dashboardSlice'
export default configureStore({
    reducer:{
        auth: authReducer,
        userDetails: userDetailsReducer,
        dashboard: dashboardSliceReducer
    },
})