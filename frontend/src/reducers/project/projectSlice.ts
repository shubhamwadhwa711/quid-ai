import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Tags {
    id: number;
    name: string;
}
interface Project {
    id: number;
    title: string;
    image:string;
    description: string;
    url: string;
    start_date: string;
    end_date: string;
    profile: number;
    tag: Tags[];

  }

interface ProjectState {
  project: Project;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProjectState = {
  project: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchProject = createAsyncThunk(
  "project/fetchProject",
  async ({ tid,pid }, { rejectWithValue }) => {
    console.log("fetchProject id", { tid,pid });
    try {
      console.log("Fetching fetchProject...");
      const response = await axios.get(`/api/project/${tid}/${pid}`);
      console.log("fetchProject fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch fetchProject"
      );
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ pid,prid,formData }, { rejectWithValue }) => {
    console.log("updateProject id", { pid,prid });
    console.log(" updateProject formData", formData);
    try {
      console.log("Fetching updateProject...");
      const response = await axios.patch(`/api/edit-project/${pid}/${prid}`,formData);
      console.log("fetchProject fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch fetchProject"
      );
    }
  }
);

// Create the slice
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectSlice.reducer;
