// companySectorSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CompanySector {
  id: number;
  title: string;
}

interface CompanySectorState {
  companySectors: CompanySector[];
  loading: boolean;
  error: string | null;
}

const initialState: CompanySectorState = {
  companySectors: [],
  loading: false,
  error: null,
};

export const fetchCompanySectors = createAsyncThunk(
  "companySector/fetchCompanySectors",
  async (search: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_BACKEND_URL}/category/`, {
        params: search,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch company sectors");
    }
  }
);

const companySectorSlice = createSlice({
  name: "companySector",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanySectors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanySectors.fulfilled, (state, action) => {
        state.loading = false;
        state.companySectors = action.payload;
      })
      .addCase(fetchCompanySectors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default companySectorSlice.reducer;
