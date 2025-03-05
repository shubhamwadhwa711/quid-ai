import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Insights {
  id: number;
  title: string;
}

interface InsightsState {
  insightsCategory: Insights[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: InsightsState = {
  insightsCategory: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchInsights = createAsyncThunk(
  "insight/fetchInsights",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching companies...");
      const response = await axios.get("/api/insights/category");
      console.log("Companies fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch companies"
      );
    }
  }
);

// Create the slice
const insightsSlice = createSlice({
  name: "insights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.insightsCategory = action.payload;
      })
      .addCase(fetchInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default insightsSlice.reducer;
