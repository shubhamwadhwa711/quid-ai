import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Insights {
  id: number;
  title: string;
  created_at:string;
  featured_image:string;
  category:number;
}

interface InsightsState {
  insights: Insights[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: InsightsState = {
  insights: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchInsights = createAsyncThunk(
  "insight/fetchInsights",
  async (id: number, { rejectWithValue }) => {
    try {
      console.log("Fetching Insights...");
      const response = await axiosInstanceUnauthorized.get(`/insight-category/${id}/insight/`);
      console.log("Insights fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch insights"
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
        state.insights = action.payload;
      })
      .addCase(fetchInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default insightsSlice.reducer;
