import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Enquiry {
  full_name: string;
  email: string;
  message: string;
  profile: number;
}

interface EnquiryState {
  enquiry: Enquiry;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: EnquiryState = {
  enquiry: {
    full_name: "",
    email: "",
    message: "",
    profile: NaN,
  },
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchEnquiry = createAsyncThunk(
  "enquiry/fetchEnquiry",
  async (Data: Enquiry, { rejectWithValue }) => {
    try {
      console.log("Fetching Enquiry...", Data);
      const response = await axiosInstanceUnauthorized.post(`/enquiry/`, Data);
      console.log("Enquiry fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch enquiry"
      );
    }
  }
);
// Create the slice
const EnquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.enquiry = action.payload;
      })
      .addCase(fetchEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default EnquirySlice.reducer;
