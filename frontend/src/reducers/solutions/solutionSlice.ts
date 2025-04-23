import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface Solutions {
  id: number;
  name: string;
  logo: string;
}

interface SolutionsState {
  Solutions: Solutions[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: SolutionsState = {
  Solutions: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchSolutions = createAsyncThunk(
  "solutions/fetchSolutions",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching companies...");
      const response = await axiosInstanceUnauthorized.get("/industry");
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
const solutionsSlice = createSlice({
  name: "insights",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSolutions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSolutions.fulfilled, (state, action) => {
        state.loading = false;
        state.Solutions = action.payload;
      })
      .addCase(fetchSolutions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default solutionsSlice.reducer;
