import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}
interface Industry {
  id: number;
  name: string;
  logo: string;
}
interface Country {
  id: number;
  name: string;
}
interface Education {
  id: 1;
  school: string;
  degree: string;
  field_of_study: string;
  start_year: number;
  end_year: number;
  description: string;
  profile: number;
}
interface Client {
  id: number;
  name: string;
  client: string;
  profile: number;
}
interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  url: string;
  start_date: string;
  end_date: string;
  profile: number;
}
interface Skill {
  id: number;
  name: string;
}
interface Availability {
  id: number;
  name: string;
}
interface Language {
  id: number;
  name: string;
}
export interface Profile {
  id: number;
  title: string;
  user: User;
  skill: Skill[];
  education: Education[];
  client: Client[];
  image: string;
  headline: string;
  summary?: string;
  industry: Industry;
  country: Country;
  linkedin_url: string;
  projects: Project[];
  available_to?: Availability[];
  languages?: Language[];
}

interface ProfileState {
  aiProfile: Profile | undefined;
  aiProfiles: Profile[];
  loading: boolean;
  error: string | null;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
}

// Initial state
const initialState: ProfileState = {
  aiProfile: undefined,
  aiProfiles: [],
  loading: false,
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
};

// Async Thunk to fetch company data
export const fetchAIProfile = createAsyncThunk(
  "profile/fetchAIProfile",
  async (id: string, { rejectWithValue }) => {
    // console.log("Fetching AI profile...");
    try {
      const response = await axiosInstanceUnauthorized.get(
        `/top-profile/${id}/`
      );
      // console.log("aiProfile", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to profile"
      );
    }
  }
);
export const fetchAIProfiles = createAsyncThunk(
  "profile/fetchAIProfiles",
  async (id, { rejectWithValue }) => {
    // console.log("Fetching AI profile...");
    try {
      const response = await axiosInstanceUnauthorized.get(`/top-profile/`);
      // console.log("profile fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to profile"
      );
    }
  }
);

// Create the slice
const AIProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAIProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.aiProfile = action.payload;
      })
      .addCase(fetchAIProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAIProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAIProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.aiProfiles = action.payload.results || action.payload;
        if (action.payload.count !== undefined) {
          state.pagination = {
            count: action.payload.count,
            next: action.payload.next,
            previous: action.payload.previous,
          };
        }
      })
      .addCase(fetchAIProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default AIProfileSlice.reducer;
