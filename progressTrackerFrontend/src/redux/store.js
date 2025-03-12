import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import userDetailsReducer from './slices/userDetailsSlice';
import dashboardSliceReducer from './slices/dashboardSlice';
import archiveReducer from './slices/archiveSlice';
import trashReducer from './slices/trashSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    userDetails: userDetailsReducer,
    dashboard: dashboardSliceReducer,
    archive: archiveReducer,
    trash: trashReducer
  },
});