import axiosInstance from "@/lib/axiosInstance";
import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Expertise {
  id: number;
  name: string;
}

interface ExpertiseState {
  expertise: Expertise[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ExpertiseState = {
  expertise: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch expertise data
export const fetchExpertise = createAsyncThunk<Expertise[], Record<string, any>>(
  "expertise/fetchExpertise",
  async (searchData, { rejectWithValue }) => {
    try {
      console.log("Fetching expertise with params:", searchData);
      const response = await axiosInstanceUnauthorized.get("/skill/", {
        params: searchData,
      });
      // console.log("Expertise fetched successfully:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch expertise"
      );
    }
  }
);

// Async Thunk to post new expertise data
export const postExpertise = createAsyncThunk<Expertise, Expertise>(
  "expertise/postExpertise",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Posting new expertise:", data);
      const response = await axiosInstance.post("/skill/", data);
      // console.log("Expertise added successfully:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add expertise"
      );
    }
  }
);

// Create the slice
const expertiseSlice = createSlice({
  name: "expertise",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch expertise cases
      .addCase(fetchExpertise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpertise.fulfilled, (state, action) => {
        state.loading = false;
        state.expertise = action.payload;
      })
      .addCase(fetchExpertise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Post expertise cases
      .addCase(postExpertise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postExpertise.fulfilled, (state, action) => {
        state.loading = false;
        state.expertise.push(action.payload); // Append instead of overwrite
      })
      .addCase(postExpertise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default expertiseSlice.reducer;
