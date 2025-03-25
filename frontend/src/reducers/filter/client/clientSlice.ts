import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Client {
  id: number;
  name: string;
  client: string;
  pofile: number;
}

interface ClientState {
  client: Client[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ClientState = {
  client: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchClient = createAsyncThunk(
  "client/fetchClient",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching client...");
      const response = await axios.get("/api/filter/client");
      console.log("client fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch client"
      );
    }
  }
);

// Create the slice
const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClient.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload;
      })
      .addCase(fetchClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default clientSlice.reducer;
