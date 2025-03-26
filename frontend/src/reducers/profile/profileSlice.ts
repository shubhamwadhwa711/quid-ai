import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
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
  client:string;
  profile: number;
}
interface Project {
  id: number;
  title: string;
  image:string;
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
  summary?: string ;
  location: string;
  linkedin_url: string;
  projects: Project[];
  available_to?: Availability[];
  languages?: Language[];
}

interface ProfileState {
  profile: Profile[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProfileState = {
  profile: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch company data
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (FilterData, { rejectWithValue }) => {
    console.log("Fetching profile...");
    try {
      const response = await axios.get("/api/profile",{
        params: FilterData,
      });
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
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
