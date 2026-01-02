import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { mergeProfiles } from "@/lib/profileMerge";
import axiosInstanceUnauthorized from "@/lib/axiosInstanceUnauthorized";
import { profileUserData } from "./profile";
import { profile } from "console";
import { fetchCountry } from "../filter/country/countrySlice";
import { fetchExpertise } from "../filter/expertise/expertiseSlice";

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
  tag?: Tags[];
}

interface Tags {
  id: number;
  name: string;
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
  language?: Language[];
  linkedin_profile_url: string;
  linkedin_data: boolean;
}

interface ProfileState {
  profile: Profile | null;
  profiles: Profile[];
  LinkedInProfile: any | null;
  loading: boolean;
  syncLoading: boolean;
  academicsLoading: boolean;
  skillsLoading: boolean;
  error: string | null;
  academicsError: string | null;
  skillsError: string | null;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
}

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  LinkedInProfile: null,
  loading: false,
  syncLoading: false,
  academicsLoading: false,
  skillsLoading: false,
  error: null,
  academicsError: null,
  skillsError: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
};

export const fetchLinkedInProfile = createAsyncThunk(
  "profile/fetchLinkedInProfile",
  async (access_token, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/linkedin-info", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

export const postBulkAcademics = createAsyncThunk(
  "profile/postBulkAcademics",
  async (
    {
      profileId,
      educationData,
    }: {
      profileId: number;
      educationData: any[];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        "/academics/bulk/",
        educationData.map((edu: any) => ({
          school: edu.school || "",
          degree: edu.degree || "",
          field_of_study: edu.field_of_study || "",
          start_year: edu.start ? parseInt(edu.start.split("/")[2]) : null,
          end_year: edu.end ? parseInt(edu.end.split("/")[2]) : null,
          description: "Imported from LinkedIn",
          profile: profileId,
        }))
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to post bulk academics data"
      );
    }
  }
);

export const postBulkProjects = createAsyncThunk(
  "profile/postBulkProjects",
  async (
    {
      profileId,
      projectData,
      tag,
    }: {
      profileId: number;
      projectData: any[];
      tag: number[];
    },
    { rejectWithValue }
  ) => {
    console.log("projectData", projectData);
    console.log("tag", tag);
    try {
      const response = await axiosInstance.post(
        "projects/bulk/",
        projectData.map((proj: any, index: number) => ({
          title: proj.name || "",
          tag: tag[index] || [],
          start_date: proj.start
            ? `${proj.start.split("/")[2]}-${proj.start
                .split("/")[0]
                .padStart(2, "0")}-${proj.start.split("/")[1].padStart(2, "0")}`
            : "",
          end_date: proj.end
            ? `${proj.end.split("/")[2]}-${proj.end
                .split("/")[0]
                .padStart(2, "0")}-${proj.end.split("/")[1].padStart(2, "0")}`
            : "",
          description: proj.description || "",
          url: proj.url || "https://example.com",
          profile: profileId,
        }))
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to post bulk projects data"
      );
    }
  }
);

export const postBulkSkills = createAsyncThunk(
  "profile/postBulkSkills",
  async (
    {
      skillsData,
    }: {
      skillsData: any[];
    },
    { rejectWithValue }
  ) => {
    console.log("Posting bulk skills data...");
    try {
      const response = await axiosInstance.post(
        "/skills/bulk/",
        skillsData.map((skill: any) => ({
          name: skill.name || "",
        }))
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to post bulk skills data"
      );
    }
  }
);

export const postBulkClient = createAsyncThunk(
  "profile/postBulkClient",
  async (ClientData: any[]) => {
    try {
      const response = await axiosInstance.post(
        "/clients/bulk/",
        ClientData?.map((client: any) => ({
          name: client.name || "",
          category: client.category || 1,
        })) || []
      );
      return response.data;
    } catch (error: any) {
      return error.response?.data?.message || "Failed to post bulk client data";
    }
  }
);

// Async Thunk to fetch profile data - ONLY fetches from backend, no LinkedIn sync
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get("/profile/");
      const profileData = response.data.results[0]; // Extract from paginated results

      if (!profileData) {
        console.error("❌ [FETCH PROFILE] No profile found in response");
        return rejectWithValue("No profile found");
      }

      console.log("📊 [FETCH PROFILE] Profile data extracted:", {
        id: profileData.id,
        user: profileData.user,
        linkedin_data: profileData.linkedin_data,
        skills: profileData.skill?.length || 0,
        education: profileData.education?.length || 0,
        projects: profileData.projects?.length || 0,
      });

      // Only fetch LinkedIn data if this is the first time (linkedin_data is false)
      if (profileData && !profileData.linkedin_data) {
        console.log(
          "🆕 [FETCH PROFILE] First login detected! linkedin_data is false"
        );
        console.log("🔗 [FETCH PROFILE] Initiating automatic LinkedIn sync...");

        const syncResult = await dispatch(syncWithLinkedIn());

        if (syncResult.type.includes("fulfilled")) {
          const refreshedResponse = await axiosInstance.get("/profile/");
          const refreshedProfile = refreshedResponse.data.results[0];
          console.log("✅ [FETCH PROFILE] Refreshed profile data:", {
            id: refreshedProfile.id,
            linkedin_data: refreshedProfile.linkedin_data,
            skills: refreshedProfile.skill?.length || 0,
            education: refreshedProfile.education?.length || 0,
            projects: refreshedProfile.projects?.length || 0,
          });
          return refreshedProfile;
        } else {
          console.error(
            "❌ [FETCH PROFILE] LinkedIn sync failed:",
            syncResult.payload
          );
          // Return original profile even if sync fails
          return profileData;
        }
      }

      console.log(
        "✅ [FETCH PROFILE] Returning existing profile (already synced)"
      );
      return profileData;
    } catch (error: any) {
      console.error("❌ [FETCH PROFILE] Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// NEW: Separate thunk for syncing with LinkedIn (called on first login or when user clicks sync button)
export const syncWithLinkedIn = createAsyncThunk(
  "profile/syncWithLinkedIn",
  async (_, { rejectWithValue, dispatch, getState }: any) => {
    try {
      const state = getState();
      let profileData = state.Profile.profile;

      // If no profile in state, fetch it first
      if (!profileData) {
        const response = await axiosInstance.get("/profile/");
        profileData = response.data.results[0];
        console.log("✅ [LINKEDIN SYNC] Profile fetched:", profileData?.id);
      }

      if (!profileData) {
        console.error("❌ [LINKEDIN SYNC] No profile found!");
        return rejectWithValue("No profile found");
      }

      const linkedInResponse = await axios.get("/api/linkedin-info");

      const UnipileResponse = await axios.request({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_UNIPILE_LINKEDIN_URL}${linkedInResponse.data.vanityName}`,
        headers: {
          accept: "application/json",
          "X-API-KEY": `${process.env.NEXT_PUBLIC_X_API_KEY}`,
        },
        params: {
          linkedin_sections: [
            "skills",
            "education",
            "experience",
            "projects",
            "certifications",
          ],
          notify: "false",
          account_id: `${process.env.NEXT_PUBLIC_UNIPILE_ACCOUNT_ID}`,
        },
      });
      const countryResponse: any =
        (await dispatch(fetchCountry())).payload || {};
      const countryList = Array.isArray(countryResponse)
        ? countryResponse
        : countryResponse.results || [];
      const locationParts = UnipileResponse?.data?.location?.split(", ");
      const country = countryList.find(
        (country: any) =>
          country.name === locationParts?.[locationParts.length - 1]
      );

      const projectSkillList =
        (await dispatch(fetchExpertise({}))).payload || [];

      // Create skill name to ID mapping
      const skillNameToIdMap = Array.isArray(projectSkillList)
        ? projectSkillList.reduce((acc: Record<string, number>, item: any) => {
            acc[item.name.toLowerCase()] = item.id;
            return acc;
          }, {})
        : {};

      // Map project skills to expertise IDs
      const tagList =
        UnipileResponse?.data?.projects?.map((project: any) => {
          const tags = project.skills
            ?.map((skill: string) => skillNameToIdMap[skill.toLowerCase()])
            ?.filter((id: any): id is number => id !== undefined);
          return tags || [];
        }) || [];

      const profileUpdateData = {
        linkedin_profile_url: UnipileResponse.data.profile_picture_url_large,
        linkedin_url: `https://linkedin.com/in/${linkedInResponse.data.vanityName}`,
        country: country ? country.id : profileData.country?.id,
        headline: UnipileResponse.data.headline,
        summary: UnipileResponse.data.headline,
      };

      await dispatch(
        updateProfile({
          id: profileData.id,
          data: profileUpdateData,
        })
      );

      if (
        profileData.education.length === 0 &&
        UnipileResponse.data.education?.length > 0
      ) {
        await dispatch(
          postBulkAcademics({
            profileId: profileData.id,
            educationData: UnipileResponse.data.education,
          })
        );
      } else {
        console.log(
          "⏭️ [LINKEDIN SYNC] Skipping education (already has data or no LinkedIn education)"
        );
      }

      if (
        profileData.projects.length === 0 &&
        UnipileResponse.data.projects?.length > 0
      ) {
        await dispatch(
          postBulkProjects({
            profileId: profileData.id,
            tag: tagList,
            projectData: UnipileResponse.data.projects,
          })
        );
      } else {
        console.log(
          "⏭️ [LINKEDIN SYNC] Skipping projects (already has data or no LinkedIn projects)"
        );
      }

      const ClientData =
        UnipileResponse?.data?.work_experience?.map((client: any) => {
          return {
            name: client.company || "",
            category: client.category || 1,
          };
        }) || [];

      if (profileData.client.length === 0 && ClientData.length > 0) {
        await dispatch(postBulkClient(ClientData));
      } else {
        console.log(
          "⏭️ [LINKEDIN SYNC] Skipping clients (already has data or no LinkedIn work experience)"
        );
      }

      if (
        profileData.skill.length === 0 &&
        UnipileResponse.data.skills?.length > 0
      ) {
        await dispatch(
          postBulkSkills({
            skillsData: UnipileResponse.data.skills,
          })
        );
      } else {
        console.log(
          "⏭️ [LINKEDIN SYNC] Skipping skills (already has data or no LinkedIn skills)"
        );
      }

      await dispatch(
        updateProfile({
          id: profileData.id,
          data: {
            linkedin_data: true,
          },
        })
      );
      return { success: true, message: "LinkedIn profile synced successfully" };
    } catch (error: any) {
      console.error("LinkedIn sync error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to sync with LinkedIn"
      );
    }
  }
);

export const fetchProfiles = createAsyncThunk(
  "profile/fetchProfiles",
  async (FilterData: any = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstanceUnauthorized.get(
        "/profile-related/",
        {
          params: FilterData || {},
          paramsSerializer: (params) => {
            const searchParams = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
              if (key === "search") {
                searchParams.append(
                  key,
                  Array.isArray(value) ? value[0] : (value as string)
                );
              } else if (Array.isArray(value)) {
                value.forEach((v) => searchParams.append(key, v));
              } else {
                searchParams.append(key, value as string);
              }
            });

            return searchParams.toString();
          },
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (
    { id, data }: { id: number; data: Partial<Profile> | FormData },
    { rejectWithValue }
  ) => {
    console.log("Updating profile...", id, data);
    try {
      const headers: any = {};
      if (!(data instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      const response = await axiosInstance.patch(`/profile/${id}/`, data, {
        headers: headers.length > 0 ? headers : undefined,
      });
      console.log("Profile updated successfully", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error updating profile:", error);
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
    console.log("Updating academics...", id, eid, data);
    try {
      const response = await axiosInstance.patch(
        `profile/${id}/education/${eid}/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Academics updated successfully", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error updating academics:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update academics"
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
    console.log("Adding academics...", id, data);
    try {
      const response = await axiosInstance.post(
        `/profile/${id}/education/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Academics posted successfully", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error posting academics:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to add academics"
      );
    }
  }
);

export const removeAcademics = createAsyncThunk(
  "profile/removeAcademics",
  async ({ id, eid }: { id: number; eid: number }, { rejectWithValue }) => {
    console.log("Removing academics...", id, eid);
    try {
      const response = await axiosInstance.delete(
        `/profile/${id}/education/${eid}/`
      );
      return { success: true, data: response.data, removedId: eid };
    } catch (error: any) {
      console.error("Error removing academics:", error);
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
      // Profile fetching states
      .addCase(fetchProfile.pending, (state) => {
        console.log(
          "⏳ [REDUX] fetchProfile.pending - Starting profile fetch..."
        );
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        console.log(
          "✅ [REDUX] fetchProfile.fulfilled - Profile loaded into state:",
          {
            id: action.payload?.id,
            user: action.payload?.user?.email,
            linkedin_data: action.payload?.linkedin_data,
            skills: action.payload?.skill?.length || 0,
            education: action.payload?.education?.length || 0,
            projects: action.payload?.projects?.length || 0,
          }
        );
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error(
          "❌ [REDUX] fetchProfile.rejected - Error:",
          action.payload
        );
      })

      // LinkedIn profile states
      .addCase(fetchLinkedInProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLinkedInProfile.fulfilled, (state, action) => {
        state.loading = false;
        console.log(
          "fetchLinkedInProfile fetched successfully",
          action.payload
        );
        state.LinkedInProfile = action.payload;
      })
      .addCase(fetchLinkedInProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Sync with LinkedIn states
      .addCase(syncWithLinkedIn.pending, (state) => {
        console.log(
          "⏳ [REDUX] syncWithLinkedIn.pending - Starting LinkedIn sync..."
        );
        state.syncLoading = true;
        state.error = null;
      })
      .addCase(syncWithLinkedIn.fulfilled, (state) => {
        state.syncLoading = false;
        console.log(
          "✅ [REDUX] syncWithLinkedIn.fulfilled - LinkedIn sync completed in Redux!"
        );
      })
      .addCase(syncWithLinkedIn.rejected, (state, action) => {
        state.syncLoading = false;
        state.error = action.payload as string;
        console.error(
          "❌ [REDUX] syncWithLinkedIn.rejected - Error:",
          action.payload
        );
      })

      // Bulk academics states
      .addCase(postBulkAcademics.pending, (state) => {
        console.log(
          "⏳ [REDUX] postBulkAcademics.pending - Posting education data..."
        );
        state.academicsLoading = true;
        state.academicsError = null;
      })
      .addCase(postBulkAcademics.fulfilled, (state) => {
        state.academicsLoading = false;
        console.log(
          "✅ [REDUX] postBulkAcademics.fulfilled - Education data posted!"
        );
      })
      .addCase(postBulkAcademics.rejected, (state, action) => {
        state.academicsLoading = false;
        state.academicsError = action.payload as string;
        console.error(
          "❌ [REDUX] postBulkAcademics.rejected - Error:",
          action.payload
        );
      })

      // Bulk skills states
      .addCase(postBulkSkills.pending, (state) => {
        console.log(
          "⏳ [REDUX] postBulkSkills.pending - Posting skills data..."
        );
        state.skillsLoading = true;
        state.skillsError = null;
      })
      .addCase(postBulkSkills.fulfilled, (state) => {
        state.skillsLoading = false;
        console.log(
          "✅ [REDUX] postBulkSkills.fulfilled - Skills data posted!"
        );
      })
      .addCase(postBulkSkills.rejected, (state, action) => {
        state.skillsLoading = false;
        state.skillsError = action.payload as string;
        console.error(
          "❌ [REDUX] postBulkSkills.rejected - Error:",
          action.payload
        );
      })

      // Profiles fetching states
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload.results || action.payload;
        if (action.payload.count !== undefined) {
          state.pagination = {
            count: action.payload.count,
            next: action.payload.next,
            previous: action.payload.previous,
          };
        }
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Profile update states
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update academics states
      .addCase(updateAcademics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAcademics.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile && state.profile.education) {
          const index = state.profile.education.findIndex(
            (edu) => edu.id === action.payload.id
          );
          if (index !== -1) {
            state.profile.education[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(updateAcademics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Post academics states
      .addCase(postAcademics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAcademics.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile && state.profile.education) {
          state.profile.education.push(action.payload);
        }
        state.error = null;
      })
      .addCase(postAcademics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Remove academics states
      .addCase(removeAcademics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAcademics.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile && state.profile.education) {
          state.profile.education = state.profile.education.filter(
            (edu) => edu.id !== action.payload.removedId
          );
        }
        state.error = null;
      })
      .addCase(removeAcademics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
