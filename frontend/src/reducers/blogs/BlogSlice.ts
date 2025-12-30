import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface Blog {
  id: number;
  title: string;
  text: string;
  embed: string;
  created_at: string;
  featured_image: string;
  category: number;
}

interface BlogState {
  blogs: Blog;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: BlogState = {
  blogs: {
    id: NaN,
    title: "",
    text: "",
    embed: "",
    created_at: "",
    featured_image: "",
    category: NaN,
  },
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async ({ cid, iid }: { cid: string; iid: string }, { rejectWithValue }) => {
    try {
      console.log("Fetching Blogs...", { cid, iid });
      const response = await axiosInstanceUnauthorized.get(
        `/insight-category/${cid}/insight/${iid}/`
      );
      console.log("Blogs fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch blogs"
      );
    }
  }
);
// Create the slice
const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default blogsSlice.reducer;
