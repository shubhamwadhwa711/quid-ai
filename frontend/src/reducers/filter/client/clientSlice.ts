import axiosInstance from "@/lib/axiosInstance";
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
      const response = await axiosInstance.post(
        `${process.env.NEXT_BACKEND_URL}/all-company/`,
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to post client"
      );
    }
  }
);

export const updateClient = createAsyncThunk(
  "client/updateClient",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      console.log("formData", formData);
      // console.log("id", id);
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/client/`,
        formData
      );
      // dispatch(fetchClient());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to post client"
      );
    }
  }
);
export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async ({id}, { rejectWithValue }) => {
    try {
      console.log("id", id);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/client/${id}/`
      );
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
        state.clients = [...state.clients, action.payload];
      })
      .addCase(postClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = [...state.clients, action.payload];
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg; // passed id to the thunk
        state.clients = state.clients.filter(
          (client) => client.id !== deletedId
        );
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default clientSlice.reducer;
