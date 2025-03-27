import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Expertise {
  id: number;
  name: string;
}

interface ExpertiseState {
  expertise: Expertise[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ExpertiseState = {
  expertise: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchExpertise = createAsyncThunk(
  "expertise/fetchExpertise",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching expertise...");
      const response = await axios.get("/api/filter/expertise");
      console.log("expertise fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch expertise"
      );
    }
  }
);

// Create the slice
const expertiseSlice = createSlice({
  name: "expertise",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpertise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpertise.fulfilled, (state, action) => {
        state.loading = false;
        state.expertise = action.payload;
      })
      .addCase(fetchExpertise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default expertiseSlice.reducer;
