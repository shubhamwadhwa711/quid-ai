import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Country {
  id: number;
  name: string;
}

interface CountryState {
  countryList: Country[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CountryState = {
  countryList: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchCountryList = createAsyncThunk(
  "country/fetchCountryList",
  async (SearchData, { rejectWithValue }) => {
    try {
      console.log("Fetching country...", SearchData);
      const response = await axios.get("/api/countryList", {
        params: SearchData,
      });
      console.log("country fetched:", response.data);
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
      .addCase(fetchCountryList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountryList.fulfilled, (state, action) => {
        state.loading = false;
        state.countryList = action.payload;
      })
      .addCase(fetchCountryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default countrySlice.reducer;
