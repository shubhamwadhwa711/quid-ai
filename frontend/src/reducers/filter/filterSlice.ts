import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Filter {
  expertise: string[];
  academics: string[];
  country: string[];
  languages: string[];
  clients: string[];
  available_to: string[];
}

interface FilterState {
  filter: Filter[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: FilterState = {
  filter: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const postFilter = createAsyncThunk(
  "filter/postFilter",
  async (FilterData: Filter, { rejectWithValue }) => {
    console.log("inside postFilter", FilterData);
    try {
      console.log("inside postFilter");
      const response = await axios.get("/api/filter", {
        params: FilterData,
      });
      console.log("postFilter sent", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to post filter"
      );
    }
  }
);

// Create the slice
const postFilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.filter = action.payload;
      })
      .addCase(postFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postFilterSlice.reducer;
