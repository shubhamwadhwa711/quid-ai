import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

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
  id: number;
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
  // client: string;
  // profile: number;
  category: number;
  logo: string;
  is_featured: boolean;
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
  profile: Profile | null;
  profiles: Profile[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  loading: false,
  error: null,
};

// Async Thunk to fetch profile data
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/profile/", {});
      console.log("Profile data fetched successfully", response.data[0]);
      return response.data[0];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);
export const fetchProfiles = createAsyncThunk(
  "profile/fetchProfiles",
  async (FilterData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/profile-related/", {
        params: FilterData,
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();

          Object.entries(params).forEach(([key, value]) => {
            if (key === "search") {
              console.log("value", value);
              // Ensure search param is a string, not an array
              searchParams.append(
                key,
                Array.isArray(value) ? value[0] : (value as string)
              );
            } else if (Array.isArray(value)) {
              value.forEach((v) => searchParams.append(key, v)); // 🔹 Append each array item separately
            } else {
              searchParams.append(key, value as string);
            }
          });

          return searchParams.toString();
        },
        headers: { "Content-Type": "application/json" },
      });
      console.log("Profile data fetched successfully", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);
// Async Thunk to update profile data
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (
    { id, data }: { id: number; data: Partial<Profile> },
    { rejectWithValue }
  ) => {
    console.log("Updating profile...", id, data);
    try {
      const response = await axiosInstance.patch(`/profile/${id}/`, data, {
        headers: {
          // "Content-Type": "application/json",
        },
      });
      console.log("Profile updated successfully", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

export const updateAcademics = createAsyncThunk(
  "profile/updateAcademics",
  async (
    { id, eid, data }: { id: number; eid: number; data: Partial<Education> },
    { rejectWithValue }
  ) => {
    console.log("Updating profile...", eid, data);
    try {
      const response = await axiosInstance.patch(
        `profile/${id}/education/${eid}/`,
        data
      );
      console.log("Academics updated successfully", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

export const postAcademics = createAsyncThunk(
  "profile/postAcademics",
  async (
    { id, data }: { id: number; data: Partial<Education> },
    { rejectWithValue }
  ) => {
    console.log("Updating profile...", id, data);
    try {
      const response = await axiosInstance.post(
        `/profile/${id}/education/`,
        data
      );
      console.log("Academics posted successfully", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

export const removeAcademics = createAsyncThunk(
  "profile/removeAcademics",
  async ({ id, eid }: { id: number; eid: number }, { rejectWithValue }) => {
    console.log("Updating profile...", id);
    try {
      const response = await axiosInstance.delete(
        `/profile/${id}/education/${eid}/`
      );
      return { success: true, data: response.data, removedId: eid };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove academics"
      );
    }
  }
);

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
        console.log("Profile fetched successfully", action.payload);
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Profiles fetched successfully", action.payload);
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
