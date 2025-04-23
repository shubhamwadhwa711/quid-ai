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
  usprofile: Profile | undefined;
  usprofiles: Profile[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProfileState = {
  usprofile: undefined,
  usprofiles: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchUSProfile = createAsyncThunk(
  "profile/fetchUSProfile",
  async (id, { rejectWithValue }) => {
    console.log("Fetching US profile...");
    try {
      const response = await axiosInstanceUnauthorized.get(
        `/us-profile/${id}/`
      );
      console.log("profile fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to profile"
      );
    }
  }
);

export const fetchUSProfiles = createAsyncThunk(
  "profile/fetchUSProfiles",
  async (_, { rejectWithValue }) => {
    console.log("Fetching US profile...");
    try {
      const response = await axios.get(
        `${process.env.NEXT_BACKEND_URL}/us-profile/`
      );
      console.log("profile fetched:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to profile"
      );
    }
  }
);

// Create the slice
const USProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUSProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUSProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.usprofile = action.payload;
      })
      .addCase(fetchUSProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUSProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUSProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.usprofiles = action.payload;
      })
      .addCase(fetchUSProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default USProfileSlice.reducer;
