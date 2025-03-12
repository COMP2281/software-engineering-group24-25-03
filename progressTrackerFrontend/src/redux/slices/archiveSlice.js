import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// 🔹 Fetch Archived Lists
export const fetchArchivedLists = createAsyncThunk(
  'api/archive/fetchLists',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.get('/api/archive/lists', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch archived lists');
    }
  }
);

// 🔹 Archive a List
export const archiveList = createAsyncThunk(
  'api/archive/archiveList',
  async (listId, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.post(
        `/api/archive/list/${listId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to archive list');
    }
  }
);

// 🔹 Archive a Project
export const archiveProject = createAsyncThunk(
  'api/archive/archiveProject',
  async (projectId, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.post(
        `/api/archive/project/${projectId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to archive project');
    }
  }
);

// 🔹 Restore an Archived List
export const restoreArchivedList = createAsyncThunk(
  'api/archive/restoreList',
  async (listId, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.post(
        `/api/archive/list/${listId}/restore`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to restore archived list');
    }
  }
);

// 🔹 Restore an Archived Project
export const restoreArchivedProject = createAsyncThunk(
  'api/archive/restoreProject',
  async (projectId, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.post(
        `/api/archive/project/${projectId}/restore`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to restore archived project');
    }
  }
);

const archiveSlice = createSlice({
  name: 'archive',
  initialState: {
    archivedLists: [],    // Stores all archived lists
    archivedProjects: [], // Stores all archived projects
    status: 'idle',
    error: null,
  },
  reducers: {
    // Local mock actions for development/testing
    mockArchiveList: (state, action) => {
      const { list } = action.payload;
      state.archivedLists.push({
        ...list,
        archivedAt: new Date().toISOString()
      });
    },
    mockRestoreList: (state, action) => {
      const { listId } = action.payload;
      state.archivedLists = state.archivedLists.filter(list => list.listId !== listId);
    }
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Archived Lists Reducers
      .addCase(fetchArchivedLists.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchArchivedLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.archivedLists = action.payload.lists || [];
        state.archivedProjects = action.payload.projects || [];
      })
      .addCase(fetchArchivedLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Archive List Reducers
      .addCase(archiveList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(archiveList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.archivedLists.push({
          ...action.payload,
          archivedAt: new Date().toISOString()
        });
      })
      .addCase(archiveList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Archive Project Reducers
      .addCase(archiveProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(archiveProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.archivedProjects.push({
          ...action.payload,
          archivedAt: new Date().toISOString()
        });
      })
      .addCase(archiveProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Restore Archived List Reducers
      .addCase(restoreArchivedList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(restoreArchivedList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.archivedLists = state.archivedLists.filter(
          list => list.listId !== action.payload.listId
        );
      })
      .addCase(restoreArchivedList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Restore Archived Project Reducers
      .addCase(restoreArchivedProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(restoreArchivedProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.archivedProjects = state.archivedProjects.filter(
          project => project.projectId !== action.payload.projectId
        );
      })
      .addCase(restoreArchivedProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { mockArchiveList, mockRestoreList } = archiveSlice.actions;
export default archiveSlice.reducer;