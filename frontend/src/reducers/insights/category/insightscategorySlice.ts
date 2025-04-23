import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface InsightsCategory {
  id: number;
  title: string;
}

interface InsightsCategoryState {
  insightsCategory: InsightsCategory[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: InsightsCategoryState = {
  insightsCategory: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchInsightCategory = createAsyncThunk(
  "insight/fetchInsightCategory",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching companies...");
      const response = await axiosInstanceUnauthorized.get("/insight-category/");
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
const insightCategorySlice = createSlice({
  name: "insightsCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInsightCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInsightCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.insightsCategory = action.payload;
      })
      .addCase(fetchInsightCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default insightCategorySlice.reducer;
