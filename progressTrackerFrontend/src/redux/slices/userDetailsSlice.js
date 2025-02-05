import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Base Axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', 
});

// Thunk to fetch user details with token authentication
export const fetchUserDetails = createAsyncThunk(
  'api/auth/user_details',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.get('/api/auth/user_details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user details');
    }
  }
);

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    id: null,
    user: null,
    bio: null,
    profile_picture: null,
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.id = action.payload.id;
        state.user = action.payload.user;
        state.bio = action.payload.bio;
        state.profile_picture = action.payload.profile_picture;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userDetailsSlice.reducer;
