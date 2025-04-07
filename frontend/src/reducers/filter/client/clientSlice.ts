import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Client {
  id: number;
  name: string;
  client: string;
  pofile: number;
}

interface ClientState {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch clients
export const fetchClient = createAsyncThunk(
  "client/fetchClient",
  async (searchData: Record<string, any>, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/filter/client", {
        params: searchData,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch clients"
      );
    }
  }
);

// Async Thunk to post a new client
export const postClient = createAsyncThunk(
  "client/postClient",
  async (data: Client, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/create-client", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to post client"
      );
    }
  }
);

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
        state.clients = action.payload; // Assuming payload is an array
      })
      .addCase(fetchClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(postClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = [...state.clients, action.payload]; // Add new client
      })
      .addCase(postClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default clientSlice.reducer;
