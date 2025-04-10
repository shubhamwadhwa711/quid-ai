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
  async (id: number, { rejectWithValue }) => {
    try {
      console.log("Fetching companies...");
      const response = await axios.get(`/api/company/${id}`);
      console.log("Companies fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch companies"
      );
    }
  }
);
export const fetchAllCompanies = createAsyncThunk(
  "company/fetchAllCompanies",
  async (search, { rejectWithValue }) => {
    try {
      console.log("Fetching all companies...", search);
      const response = await axios.get(
        `${process.env.NEXT_BACKEND_URL}/all-company/`,
        { params: search }
      );
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
      })
      .addCase(fetchAllCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchAllCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default companySlice.reducer;
