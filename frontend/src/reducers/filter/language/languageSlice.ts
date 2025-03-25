import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Language {
  id: number;
  name: string;
}

interface LanguageState {
  language: Language[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: LanguageState = {
  language: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchLanguage = createAsyncThunk(
  "language/fetchLanguage",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching language...");
      const response = await axios.get("/api/filter/language");
      console.log("languages fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch languages"
      );
    }
  }
);

// Create the slice
const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLanguage.fulfilled, (state, action) => {
        state.loading = false;
        state.language = action.payload;
      })
      .addCase(fetchLanguage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default languageSlice.reducer;
