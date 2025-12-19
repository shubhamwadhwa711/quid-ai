import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Academics {
  id: number;
  school: string;
  degree: string;
  field_of_study: string;
  start_year: string;
  end_year: string;
  description: string;
  profile: number;
}

interface AcademicsState {
  academics: Academics[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AcademicsState = {
  academics: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchAcademics = createAsyncThunk(
  "academics/fetchAcademics",
  async (_, { rejectWithValue }) => {
    try {
      // console.log("Fetching academics...");
      const response = await axiosInstanceUnauthorized.get("/academic/");
      // console.log("academics fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch academics"
      );
    }
  }
);

// Create the slice
const academicSlice = createSlice({
  name: "academic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcademics.fulfilled, (state, action) => {
        state.loading = false;
        state.academics = action.payload;
      })
      .addCase(fetchAcademics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default academicSlice.reducer;
