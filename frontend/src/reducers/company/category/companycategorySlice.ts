import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface CompanyCategory {
  id: number;
  title: string;
}

interface CompanyCategoryState {
  companyCategory: CompanyCategory[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CompanyCategoryState = {
  companyCategory: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchCompanyCategory = createAsyncThunk(
  "company/fetchCompanyCategory",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching companies...");
      const response = await axiosInstanceUnauthorized.get("/category/");
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
const companyCategorySlice = createSlice({
  name: "companycategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.companyCategory = action.payload;
      })
      .addCase(fetchCompanyCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default companyCategorySlice.reducer;
