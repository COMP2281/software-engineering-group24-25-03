import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// 🔹 Fetch Deleted Items
export const fetchDeletedItems = createAsyncThunk(
  'api/trash/fetchItems',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.get('/api/trash/items', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch deleted items');
    }
  }
);

// 🔹 Delete a List (move to trash)
export const deleteList = createAsyncThunk(
  'api/trash/deleteList',
  async (listId, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.delete(`/api/list/${listId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { ...response.data, listId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete list');
    }
  }
);

// 🔹 Delete a Project (move to trash)
export const deleteProject = createAsyncThunk(
  'api/trash/deleteProject',
  async (projectId, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.delete(`/api/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { ...response.data, projectId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete project');
    }
  }
);

// 🔹 Delete a Task (move to trash)
export const deleteTask = createAsyncThunk(
  'api/trash/deleteTask',
  async ({ projectId, taskId }, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.delete(`/api/project/${projectId}/task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { ...response.data, projectId, taskId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete task');
    }
  }
);

// 🔹 Restore List from Trash
export const restoreList = createAsyncThunk(
  'api/trash/restoreList',
  async (listId, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.post(
        `/api/trash/list/${listId}/restore`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { ...response.data, listId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to restore list');
    }
  }
);

// 🔹 Restore Task from Trash
export const restoreTask = createAsyncThunk(
  'api/trash/restoreTask',
  async ({ listId, taskId }, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.post(
        `/api/trash/list/${listId}/task/${taskId}/restore`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { ...response.data, listId, taskId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to restore task');
    }
  }
);

// 🔹 Empty Trash (permanently delete all)
export const emptyTrash = createAsyncThunk(
  'api/trash/emptyTrash',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.delete('/api/trash/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to empty trash');
    }
  }
);

// 🔹 Permanently Delete Item
export const permanentlyDeleteItem = createAsyncThunk(
  'api/trash/permanentlyDelete',
  async ({ itemType, itemId }, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.delete(`/api/trash/${itemType}/${itemId}/permanent`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { ...response.data, itemType, itemId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to permanently delete item');
    }
  }
);

const trashSlice = createSlice({
  name: 'trash',
  initialState: {
    deletedLists: [],   // Lists in trash
    status: 'idle',
    error: null,
    retentionDays: 30,  // Number of days items are kept in trash
  },
  reducers: {
    // Local mock actions for development/testing
    mockDeleteList: (state, action) => {
      const { list } = action.payload;
      // Create a deleted list with tasks
      state.deletedLists.push({
        id: list.listId,
        name: list.listName,
        deletedAt: new Date().toISOString(),
        tasks: []
      });
    },
    mockDeleteTask: (state, action) => {
      const { listId, task } = action.payload;
      // Find the list to add the task to
      const list = state.deletedLists.find(l => l.id === listId);
      if (list) {
        list.tasks.push({
          id: task.id,
          text: task.name,
          deletedAt: new Date().toISOString()
        });
      }
    },
    mockRestoreList: (state, action) => {
      const { listId } = action.payload;
      state.deletedLists = state.deletedLists.filter(list => list.id !== listId);
    },
    mockRestoreTask: (state, action) => {
      const { listId, taskId } = action.payload;
      const list = state.deletedLists.find(l => l.id === listId);
      if (list) {
        list.tasks = list.tasks.filter(task => task.id !== taskId);
        // If the list has no more tasks, consider removing the empty list
        if (list.tasks.length === 0) {
          state.deletedLists = state.deletedLists.filter(l => l.id !== listId);
        }
      }
    },
    setRetentionDays: (state, action) => {
      state.retentionDays = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Deleted Items Reducers
      .addCase(fetchDeletedItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDeletedItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deletedLists = action.payload || [];
      })
      .addCase(fetchDeletedItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Delete List Reducers
      .addCase(deleteList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deletedLists.push({
          id: action.payload.listId,
          name: action.payload.name || `List ${action.payload.listId}`,
          deletedAt: new Date().toISOString(),
          tasks: []
        });
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Delete Project Reducers
      .addCase(deleteProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deletedLists.push({
          id: action.payload.projectId,
          name: action.payload.name || `Project ${action.payload.projectId}`,
          deletedAt: new Date().toISOString(),
          tasks: []
        });
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Delete Task Reducers
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Find the project to add the deleted task to
        let list = state.deletedLists.find(l => l.id === action.payload.projectId);
        
        // If project doesn't exist in trash yet, create it
        if (!list) {
          list = {
            id: action.payload.projectId,
            name: `Project ${action.payload.projectId}`,
            deletedAt: new Date().toISOString(),
            tasks: []
          };
          state.deletedLists.push(list);
        }
        
        // Add the task to the project's tasks
        list.tasks.push({
          id: action.payload.taskId,
          text: action.payload.name || `Task ${action.payload.taskId}`,
          deletedAt: new Date().toISOString()
        });
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Restore List Reducers
      .addCase(restoreList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(restoreList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deletedLists = state.deletedLists.filter(
          list => list.id !== action.payload.listId
        );
      })
      .addCase(restoreList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Restore Task Reducers
      .addCase(restoreTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(restoreTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Find the list that contains the task
        const list = state.deletedLists.find(l => l.id === action.payload.listId);
        if (list) {
          // Remove the task from the list
          list.tasks = list.tasks.filter(task => task.id !== action.payload.taskId);
          
          // If the list has no more tasks, remove it from deleted lists
          if (list.tasks.length === 0) {
            state.deletedLists = state.deletedLists.filter(l => l.id !== action.payload.listId);
          }
        }
      })
      .addCase(restoreTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Empty Trash Reducers
      .addCase(emptyTrash.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(emptyTrash.fulfilled, (state) => {
        state.status = 'succeeded';
        state.deletedLists = [];
      })
      .addCase(emptyTrash.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Permanently Delete Item Reducers
      .addCase(permanentlyDeleteItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(permanentlyDeleteItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { itemType, itemId } = action.payload;
        
        if (itemType === 'list' || itemType === 'project') {
          state.deletedLists = state.deletedLists.filter(list => list.id !== itemId);
        } else if (itemType === 'task') {
          // This requires knowing which list contains the task
          // The backend should provide this information
          const listId = action.payload.listId;
          if (listId) {
            const list = state.deletedLists.find(l => l.id === listId);
            if (list) {
              list.tasks = list.tasks.filter(task => task.id !== itemId);
              
              // If the list has no more tasks, remove it
              if (list.tasks.length === 0) {
                state.deletedLists = state.deletedLists.filter(l => l.id !== listId);
              }
            }
          }
        }
      })
      .addCase(permanentlyDeleteItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  mockDeleteList,
  mockDeleteTask,
  mockRestoreList,
  mockRestoreTask,
  setRetentionDays
} = trashSlice.actions;

export default trashSlice.reducer;