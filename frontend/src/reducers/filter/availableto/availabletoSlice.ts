import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface AvailableTo {
  id: number;
  name: string;
}

interface AvailableToState {
  availableTo: AvailableTo[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AvailableToState = {
  availableTo: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchAvailableTo = createAsyncThunk(
  "availableTo/fetchAvailableTo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstanceUnauthorized.get("/available/");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch availableTo"
      );
    }
  }
);

// Create the slice
const availableToSlice = createSlice({
  name: "availableTo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableTo.fulfilled, (state, action) => {
        state.loading = false;
        state.availableTo = action.payload.results || action.payload;
      })
      .addCase(fetchAvailableTo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default availableToSlice.reducer;
