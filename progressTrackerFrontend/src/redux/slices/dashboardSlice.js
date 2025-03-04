import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// 🔹 Fetch Lists API
export const fetchLists = createAsyncThunk(
  'api/lists/fetch',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.get('/api/list/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch lists');
    }
  }
);

// 🔹 Fetch Tasks for a Given Project ID
export const fetchProjectTasks = createAsyncThunk(
  'api/project/fetchTasks',
  async (projectId, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.get(`/api/project/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Categorize tasks based on their status
      const categorizedTasks = {
        notStarted: response.data.filter(task => task.status === 0),
        inProgress: response.data.filter(task => task.status === 1),
        completed: response.data.filter(task => task.status === 2),
      };

      return { projectId, tasks: categorizedTasks }; // Store tasks per project
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch project tasks');
    }
  }
);

// 🔹 Create a New List
export const createList = createAsyncThunk(
  'api/lists/create',
  async (listName, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.post(
        '/api/list/',
        { name: listName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: 'Failed to create list' });
    }
  }
);

// 🔹 Create a New Project in a List
export const createProject = createAsyncThunk(
  'api/project/create',
  async ({ listId, projectName }, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.post(
        `/api/projectInfo/${listId}/`,
        { name: projectName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return { listId, project: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: 'Failed to create project' });
    }
  }
);

// 🔹 Create a New Task in a Project
export const createTask = createAsyncThunk(
  'api/task/create',
  async ({ projectId, taskName, taskDescription }, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.post(
        `/api/project/${projectId}/`,
        { name: taskName, description: taskDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return { projectId, task: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: 'Failed to create task' });
    }
  }
);

// 🔹 Update Task Status
export const updateTaskStatus = createAsyncThunk(
  'api/task/updateStatus',
  async ({ project, task_id, status }, { getState, rejectWithValue }) => {
    const token = getState().auth.accessToken;
    try {
      const response = await api.post(
        `/api/projectInfo/${project}/task`,
        { task_id: task_id, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Expect a response like { status: <newStatus> }
      if (response.data.status) {
        return { project, task_id, status: response.data.status };
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update task status');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'lists',
  initialState: {
    lists: [],      // Stores all lists
    projects: {},   // Stores projects per list
    tasks: {},      // Stores tasks per project
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch Lists Reducers
      .addCase(fetchLists.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.lists) {
          state.lists = action.payload.lists;
        } else {
          state.lists = [];
        }
        Object.keys(action.payload).forEach((key) => {
          if (key !== 'lists') {
            state.projects[key] = action.payload[key];
          }
        });
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Fetch Project Tasks Reducers
      .addCase(fetchProjectTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjectTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks[action.payload.projectId] = action.payload.tasks; // Store tasks under project ID
      })
      .addCase(fetchProjectTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Create a New List Reducers
      .addCase(createList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists.push({
          listId: action.payload.id,
          listName: action.payload.name,
        });
      })
      .addCase(createList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Create a New Project Reducers
      .addCase(createProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { listId, project } = action.payload;
        if (!state.projects[listId]) {
          state.projects[listId] = [];
        }
        state.projects[listId].push({
          projectId: project.id,
          projectName: project.name,
        });
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Create a New Task Reducers
      .addCase(createTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { projectId, task } = action.payload;
        if (!state.tasks[projectId]) {
          state.tasks[projectId] = { notStarted: [], inProgress: [], completed: [] };
        }
        // New tasks start as "Not Started"
        state.tasks[projectId].notStarted.push(task);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 🔹 Update Task Status Reducers
      .addCase(updateTaskStatus.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { project, task_id, status } = action.payload;
        const projectTasks = state.tasks[project];
        // Remove the task from whichever list it is in
        let task;
        ['notStarted', 'inProgress', 'completed'].forEach((list) => {
          const index = projectTasks[list].findIndex(t => t.id === task_id);
          if (index !== -1) {
            task = projectTasks[list].splice(index, 1)[0];
          }
        });
        // Place the task in the new status list
        
        if (status === 'complete') {
          projectTasks.completed.push(task);
        } else if (status === 'starting') {
          projectTasks.notStarted.push(task);
        } else if (status === 'started') {
          projectTasks.inProgress.push(task);
        }
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
