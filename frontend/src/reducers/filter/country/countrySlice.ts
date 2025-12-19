import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Country {
  id: number;
  name: string;
}

interface CountryState {
  country: Country[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CountryState = {
  country: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchCountry = createAsyncThunk(
  "country/fetchCountry",
  async (_, { rejectWithValue }) => {
    try {
      // console.log("Fetching country...");
      const response = await axiosInstanceUnauthorized.get("/country/");
      // console.log("country fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch country"
      );
    }
  }
);

// Create the slice
const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.country = action.payload;
      })
      .addCase(fetchCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default countrySlice.reducer;
