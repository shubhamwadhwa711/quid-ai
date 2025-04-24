import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
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
  async (SearchData: { search: string }, { rejectWithValue }) => {
    try {
      console.log("Fetching language...", SearchData);
      const response = await axiosInstanceUnauthorized.get("/language/", {
        params: SearchData,
      });
      console.log("languages fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch languages"
      );
    }
  }
);
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/profile/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
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
