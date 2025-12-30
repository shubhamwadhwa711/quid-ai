import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
export interface Tags {
  id: number;
  name: string;
}
export interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  url: string;
  start_date: string;
  end_date: string;
  profile: number;
  tag: Tags[];
}

interface ProjectState {
  project: Project | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProjectState = {
  project: null,
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchProject = createAsyncThunk(
  "project/fetchProject",
  async ({ tid, pid }: { tid: string; pid: string }, { rejectWithValue }) => {
    console.log("fetchProject id", { tid, pid });
    try {
      console.log("Fetching fetchProject...");
      const response = await axiosInstanceUnauthorized.get(
        `/profile/${tid}/project/${pid}/`
      );
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
  async (
    { pid, prid, formData }: { pid: number; prid: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${pid}/project-edit/${prid}/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch fetchProject"
      );
    }
  }
);
export const addProject = createAsyncThunk(
  "project/addProject",
  async (
    { pid, formData }: { pid: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${pid}/project-edit/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch fetchProject"
      );
    }
  }
);
export const removeProject = createAsyncThunk(
  "project/removeProject",
  async ({ pid, prid }: { pid: number; prid: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${pid}/project-edit/${prid}/`
      );
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
        state.error = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        // For single project state, just set it
        state.project = action.payload;
        state.error = null;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.loading = false;
        // Clear project state when removed
        state.project = null;
        state.error = null;
      })
      .addCase(removeProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectSlice.reducer;
