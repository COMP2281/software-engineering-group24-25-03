import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base Axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', 
});

// Thunk to handle login
export const login = createAsyncThunk(
  'api/auth/token',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/auth/token/', { username, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed Enter Valid Credentials');
    }
  }
);

export const authRefresh = createAsyncThunk(
  'api/auth/token/refresh/',
  async ({ refresh }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/auth/token/refresh/', { 'refresh': refresh });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    accessToken: null,
    refreshToken: null,
    status: 'idle', 
    error: null,
  },
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.status = 'idle';
      state.error = null;
      state.authenticated = false
    },
    setTokens(state, action) {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.authenticated = true
        localStorage.setItem('refresh', action.payload.refresh)
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.authenticated = false;
      })
      .addCase(authRefresh.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(authRefresh.fulfilled, (state, action) => {
        state.authenticated = true
        state.accessToken = action.payload.access;
        if(state.refreshToken == null){
          state.refreshToken = localStorage.getItem('refresh')
        }
        state.status = 'succeeded';

      })
      .addCase(authRefresh.rejected, (state, action) => {
        state.status = 'failed';
        state.authenticated = false;
        state.error = action.payload;
      })
  },
});

export const { logout, setTokens } = authSlice.actions;

export default authSlice.reducer;
