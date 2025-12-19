import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface AvailableTo {
  id: number;
  name: string;
}

interface AvailableToState {
  availableto: AvailableTo[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AvailableToState = {
  availableto: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchAvailableTo = createAsyncThunk(
  "availableto/fetchAvailableTo",
  async (_, { rejectWithValue }) => {
    try {
      // console.log("Fetching availableto...");
      const response = await axiosInstanceUnauthorized.get("/available/");
      // console.log("languages availableto:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch availableto"
      );
    }
  }
);

// Create the slice
const availabletoSlice = createSlice({
  name: "availableto",
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
        state.availableto = action.payload;
      })
      .addCase(fetchAvailableTo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default availabletoSlice.reducer;
