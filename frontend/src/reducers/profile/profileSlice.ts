import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { MergeProfile } from "@/lib/profileMerge";
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
  linkedin_profile_url: string;
  linkedin_data: boolean;
}

interface ProfileState {
  profile: Profile | null;
  profiles: Profile[];
  LinkedInProfile: any | null;
  loading: boolean;
  academicsLoading: boolean;
  skillsLoading: boolean;
  error: string | null;
  academicsError: string | null;
  skillsError: string | null;
}

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  LinkedInProfile: null,
  loading: false,
  academicsLoading: false,
  skillsLoading: false,
  error: null,
  academicsError: null,
  skillsError: null,
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

// NEW - Separate thunk for bulk academics posting
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
          url:
            proj.url ||
            "https://example.com" /* Default URL if none provided */,
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

// NEW - Separate thunk for bulk skills posting
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
// Async Thunk to fetch profile data
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get("/profile/");
      const profileData = response.data[0];
      // console.log("Profile data fetched successfully", profileData);

      // Fetch LinkedIn user info
      const linkedInResponse = await axios.get("/api/linkedin-info");

      // Fetch data from Unipile API
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
      //  console.log("UnipileResponse", UnipileResponse.data);
      // console.log("profileUserData",profileUserData)
      // const UnipileResponse = { data: profileUserData };
      // Update profile with headline and summary
      const countryList = (await dispatch(fetchCountry())).payload;
      // console.log("countryList", countryList);
      // console.log("UnipileResponse.data.location", UnipileResponse.data.location);
      const country = countryList.find(
        (country: any) =>
          country.name === UnipileResponse?.data?.location?.split(", ")[2]
      );
      const projectSkillList =
        (await dispatch(fetchExpertise({}))).payload || [];
      // console.log("projectSkillList", projectSkillList);
      // Step 1: Create a lookup map for faster access by lowercased name
      const skillNameToIdMap = Array.isArray(projectSkillList)
        ? projectSkillList.reduce((acc: Record<string, number>, item: any) => {
            acc[item.name.toLowerCase()] = item.id;
            return acc;
          }, {})
        : {};

      // Step 2: Map over each project and replace matching skill names with their IDs
      const tagList = UnipileResponse?.data?.projects?.map((project: any) => {
        const tags = project.skills
          ?.map((skill: string) => skillNameToIdMap[skill.toLowerCase()])
          ?.filter((id: any): id is number => id !== undefined); // filter out unmatched skills

        return tags;
      });

      if (!profileData.linkedin_data) {
        await dispatch(
          updateProfile({
            id: profileData.id,
            data: {
              linkedin_profile_url:
                UnipileResponse.data.profile_picture_url_large,
              linkedin_url: `https://linkedin.com/in/${linkedInResponse.data.vanityName}`,
              country: country ? country.id : null,
            },
          })
        );
      }
      if (!profileData.headline && !profileData.linkedin_data) {
        await dispatch(
          updateProfile({
            id: profileData.id,
            data: {
              headline: UnipileResponse.data.headline,
            },
          })
        );
      }
      if (!profileData.summary && !profileData.linkedin_data) {
        await dispatch(
          updateProfile({
            id: profileData.id,
            data: {
              summary: UnipileResponse.data.headline,
            },
          })
        );
      }

      // Check if education data needs to be posted
      if (profileData.education.length === 0 && !profileData.linkedin_data) {
        await dispatch(
          postBulkAcademics({
            profileId: profileData.id,
            educationData: UnipileResponse.data.education,
          })
        );
      }
      if (profileData.projects.length === 0 && !profileData.linkedin_data) {
        await dispatch(
          postBulkProjects({
            profileId: profileData.id,
            tag: tagList,
            projectData: UnipileResponse.data.projects,
          })
        );
      }
      const ClientData = UnipileResponse?.data?.work_experience.map(
        (client: any) => {
          return {
            name: client.company || "",
            category: client.category || 1,
          };
        }
      );
      console.log("ClientData", ClientData);
      if (profileData.client.length === 0 && !profileData.linkedin_data) {
        await dispatch(postBulkClient(ClientData));
      }
      if (profileData.skill.length === 0 && !profileData.linkedin_data) {
        await dispatch(
          postBulkSkills({
            skillsData: UnipileResponse.data.skills,
          })
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
      // Now refetch profile after possible updates
      const refreshedResponse = await axiosInstance.get("/profile/");
      const refreshedProfileData = refreshedResponse.data[0];

      return refreshedProfileData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
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

// Async Thunk to update profile data
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (
    { id, data }: { id: number; data: Partial<Profile> | FormData },
    { rejectWithValue }
  ) => {
    console.log("Updating profile...", id, data);
    try {
      const headers: any = {};
      // Only set Content-Type if data is not FormData
      // (axios will automatically set multipart/form-data for FormData)
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

      // NEW - Bulk academics states
      .addCase(postBulkAcademics.pending, (state) => {
        state.academicsLoading = false;
        state.academicsError = null;
      })
      .addCase(postBulkAcademics.fulfilled, (state) => {
        state.academicsLoading = false;
        console.log("Bulk academics posted successfully");
      })
      .addCase(postBulkAcademics.rejected, (state, action) => {
        state.academicsLoading = false;
        state.academicsError = action.payload as string;
      })

      // NEW - Bulk skills states
      .addCase(postBulkSkills.pending, (state) => {
        state.skillsLoading = false;
        state.skillsError = null;
      })
      .addCase(postBulkSkills.fulfilled, (state) => {
        state.skillsLoading = false;
        console.log("Bulk skills posted successfully");
      })
      .addCase(postBulkSkills.rejected, (state, action) => {
        state.skillsLoading = false;
        state.skillsError = action.payload as string;
      })

      // Profiles fetching states
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = false;
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
        // Update the education item in the profile
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
        // Add the new education item to the profile
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
        // Remove the education item from the profile
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
