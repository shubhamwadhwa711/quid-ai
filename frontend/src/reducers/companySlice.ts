import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Company {
  id: number;
  category: string;
  name: string;
  logo: string;
}

interface CompanyState {
  companies: Company[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CompanyState = {
  companies: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchCompanies = createAsyncThunk(
    "company/fetchCompanies",
    async (_, { rejectWithValue }) => {
      try {
        console.log("Fetching companies...");
        const response = await axios.get("http://localhost:8000/all-company");
        console.log("Companies fetched:", response.data);git 
        return response.data; // Axios automatically parses JSON
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch companies");
      }
    }
  );

// Create the slice
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default companySlice.reducer;
