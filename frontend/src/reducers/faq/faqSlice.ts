import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FAQState {
  FAQ: FAQ[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: FAQState = {
  FAQ: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchFAQ = createAsyncThunk(
  "FAQ/fetchFAQ",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching companies...");
      const response = await axiosInstanceUnauthorized.get("/faq/");
      console.log("Companies fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch FAQ"
      );
    }
  }
);

// Create the slice
const FAQSlice = createSlice({
  name: "FAQ",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFAQ.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFAQ.fulfilled, (state, action) => {
        state.loading = false;
        state.FAQ = action.payload;
      })
      .addCase(fetchFAQ.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default FAQSlice.reducer;
