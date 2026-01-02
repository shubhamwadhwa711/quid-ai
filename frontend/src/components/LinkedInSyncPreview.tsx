import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { Linkedin, Check, X, Loader2, School, Briefcase, Award, Brain, Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import { fetchProfile, updateProfile } from "@/reducers/profile/profileSlice";

interface LinkedInSyncPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface LinkedInSkill {
  name: string;
  endorsement_count?: number;
  insights?: string[];
  endorsement_id?: string | null;
  endorsed?: boolean;
}

interface LinkedInData {
  profile_picture_url_large?: string;
  headline?: string;
  location?: string;
  skills?: LinkedInSkill[];
  education?: Array<{
    school: string;
    degree: string;
    field_of_study: string;
    start: string;
    end: string;
  }>;
  work_experience?: Array<{
    company: string;
    title: string;
    start: string;
    end: string;
  }>;
  projects?: Array<{
    title: string;
    description: string;
    skills: string[];
  }>;
}

export function LinkedInSyncPreview({ open, onOpenChange }: LinkedInSyncPreviewProps) {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.Profile.profile);
  
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [linkedInData, setLinkedInData] = useState<LinkedInData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedFields, setSelectedFields] = useState({
    headline: true,
    location: true,
    profilePicture: true,
    skills: true,
    education: true,
    workExperience: true,
    projects: true,
  });

  useEffect(() => {
    if (open) {
      fetchLinkedInData();
    }
  }, [open]);

  const fetchLinkedInData = async () => {
    setLoading(true);
    setError(null);
    
    try {
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
      
      setLinkedInData(UnipileResponse.data);
    } catch (err: any) {
      console.error("Failed to fetch LinkedIn data:", err);
      setError(err.message || "Failed to fetch LinkedIn data");
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    if (!linkedInData || !profile) return;
    
    setSyncing(true);
    setError(null);
    
    try {
      const syncPromises: Promise<any>[] = [];
      
      // Build basic profile updates
      const updates: any = {};
      
      if (selectedFields.headline && linkedInData.headline) {
        updates.headline = linkedInData.headline;
        updates.summary = linkedInData.headline;
      }
      
      if (selectedFields.profilePicture && linkedInData.profile_picture_url_large) {
        updates.linkedin_profile_url = linkedInData.profile_picture_url_large;
      }
      
      // Update basic profile fields
      if (Object.keys(updates).length > 0) {
        syncPromises.push(
          dispatch(updateProfile({
            id: profile.id,
            data: updates,
          })).unwrap()
        );
      }
      
      // Handle education sync
      if (selectedFields.education && linkedInData.education && linkedInData.education.length > 0) {
        const educationData = linkedInData.education.map((edu: any) => ({
          school: edu.school || "",
          degree: edu.degree || "",
          field_of_study: edu.field_of_study || "",
          start_year: edu.start ? parseInt(edu.start.split("/")[2]) : null,
          end_year: edu.end ? parseInt(edu.end.split("/")[2]) : null,
          description: "Imported from LinkedIn",
          profile: profile.id,
        }));
        
        syncPromises.push(axiosInstance.post("/academics/bulk/", educationData));
      }
      
      // Handle skills sync
      if (selectedFields.skills && linkedInData.skills && linkedInData.skills.length > 0) {
        const skillsData = linkedInData.skills.map(skill => ({
          name: typeof skill === 'string' ? skill : skill.name
        }));
        syncPromises.push(axiosInstance.post("/skills/bulk/", skillsData));
      }
      
      // Handle work experience sync (clients)
      if (selectedFields.workExperience && linkedInData.work_experience && linkedInData.work_experience.length > 0) {
        const clientData = linkedInData.work_experience.map((exp: any) => ({
          name: exp.company || "",
          category: 1, // Default category
        }));
        syncPromises.push(axiosInstance.post("/clients/bulk/", clientData));
      }
      
      // Handle projects sync
      if (selectedFields.projects && linkedInData.projects && linkedInData.projects.length > 0) {
        const projectData = linkedInData.projects.map((proj: any) => {
          const projectObj: any = {
            title: proj.name || "",
            tag: [], // Skills for projects would need to be mapped
            description: proj.description || "",
            url: "https://example.com",
            profile: profile.id,
          };
          
          // Only include start_date if it exists and is valid
          if (proj.start) {
            projectObj.start_date = `${proj.start.split("/")[2]}-${proj.start.split("/")[0].padStart(2, "0")}-${proj.start.split("/")[1].padStart(2, "0")}`;
          }
          
          // Only include end_date if it exists and is valid
          if (proj.end) {
            projectObj.end_date = `${proj.end.split("/")[2]}-${proj.end.split("/")[0].padStart(2, "0")}-${proj.end.split("/")[1].padStart(2, "0")}`;
          }
          
          return projectObj;
        });
        syncPromises.push(axiosInstance.post("/projects/bulk/", projectData));
      }
      
      // Execute all sync operations in parallel
      await Promise.all(syncPromises);
      
      // Refresh profile once at the end
      await dispatch(fetchProfile());
      
      onOpenChange(false);
    } catch (err: any) {
      console.error("Failed to sync with LinkedIn:", err);
      setError(err.message || "Failed to sync with LinkedIn");
    } finally {
      setSyncing(false);
    }
  };

  const toggleField = (field: keyof typeof selectedFields) => {
    setSelectedFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const hasChanges = (field: string) => {
    if (!linkedInData || !profile) return false;
    
    switch (field) {
      case "headline":
        return linkedInData.headline !== profile.headline;
      case "profilePicture":
        return linkedInData.profile_picture_url_large !== profile.linkedin_profile_url;
      case "skills":
        return linkedInData.skills && linkedInData.skills.length > 0;
      case "education":
        return linkedInData.education && linkedInData.education.length > 0;
      case "workExperience":
        return linkedInData.work_experience && linkedInData.work_experience.length > 0;
      case "projects":
        return linkedInData.projects && linkedInData.projects.length > 0;
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-[#1A1A2E] to-[#0F0F1E] border-[#3A3A5A] text-white max-w-lg max-h-[90vh] ">
        <DialogHeader className="border-b border-[#3A3A5A] pb-4">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            LinkedIn Sync Preview
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Review and select what to sync from your LinkedIn profile
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-[#7C2BD3]" />
              <p className="text-gray-400">Fetching your LinkedIn data...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {!loading && linkedInData && (
            <div className="space-y-4 py-2">
              {/* Headline */}
              {linkedInData.headline && (
                <div className="bg-gradient-to-br from-[#1E1E38] to-[#0F0F30] rounded-xl p-4 border border-[#3A3A5A]">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="headline"
                      checked={selectedFields.headline}
                      onCheckedChange={() => toggleField("headline")}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-[#7C2BD3]" />
                        <label htmlFor="headline" className="text-sm font-semibold cursor-pointer">
                          Headline
                        </label>
                        {hasChanges("headline") && (
                          <span className="px-2 py-0.5 bg-[#7C2BD3]/20 text-[#7C2BD3] text-xs rounded-full">
                            Changed
                          </span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-400">Current:</p>
                          <p className="text-sm text-gray-300">{profile?.headline || "Not set"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">LinkedIn:</p>
                          <p className="text-sm text-white font-medium">{linkedInData.headline}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Picture */}
              {linkedInData.profile_picture_url_large && (
                <div className="bg-gradient-to-br from-[#1E1E38] to-[#0F0F30] rounded-xl p-4 border border-[#3A3A5A]">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="profilePicture"
                      checked={selectedFields.profilePicture}
                      onCheckedChange={() => toggleField("profilePicture")}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor="profilePicture" className="text-sm font-semibold cursor-pointer mb-3 block">
                        Profile Picture
                      </label>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-gray-400 mb-2">Current:</p>
                          <img 
                            src={profile?.linkedin_profile_url || profile?.image || "/default-avatar.jpg"} 
                            alt="Current"
                            className="w-20 h-20 rounded-full object-cover border-2 border-[#3A3A5A]"
                          />
                        </div>
                        <div className="text-gray-400">→</div>
                        <div>
                          <p className="text-xs text-gray-400 mb-2">LinkedIn:</p>
                          <img 
                            src={linkedInData.profile_picture_url_large} 
                            alt="LinkedIn"
                            className="w-20 h-20 rounded-full object-cover border-2 border-[#7C2BD3]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Skills */}
              {linkedInData.skills && linkedInData.skills.length > 0 && (
                <div className="bg-gradient-to-br from-[#1E1E38] to-[#0F0F30] rounded-xl p-4 border border-[#3A3A5A]">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="skills"
                      checked={selectedFields.skills}
                      onCheckedChange={() => toggleField("skills")}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="w-4 h-4 text-[#7C2BD3]" />
                        <label htmlFor="skills" className="text-sm font-semibold cursor-pointer">
                          Skills ({linkedInData.skills.length})
                        </label>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                          New
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {linkedInData.skills.slice(0, 10).map((skill, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-[#262640] border border-[#3A3A5A] rounded-full text-xs text-gray-300"
                          >
                            {typeof skill === 'string' ? skill : skill.name}
                          </span>
                        ))}
                        {linkedInData.skills.length > 10 && (
                          <span className="px-3 py-1 text-xs text-gray-400">
                            +{linkedInData.skills.length - 10} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Education */}
              {linkedInData.education && linkedInData.education.length > 0 && (
                <div className="bg-gradient-to-br from-[#1E1E38] to-[#0F0F30] rounded-xl p-4 border border-[#3A3A5A]">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="education"
                      checked={selectedFields.education}
                      onCheckedChange={() => toggleField("education")}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <School className="w-4 h-4 text-[#7C2BD3]" />
                        <label htmlFor="education" className="text-sm font-semibold cursor-pointer">
                          Education ({linkedInData.education.length})
                        </label>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                          New
                        </span>
                      </div>
                      <div className="space-y-2">
                        {linkedInData.education.map((edu, idx) => (
                          <div key={idx} className="p-3 bg-[#262640]/50 rounded-lg border border-[#3A3A5A]">
                            <p className="text-sm font-medium text-white">{edu.degree}</p>
                            <p className="text-xs text-gray-400">{edu.school}</p>
                            {edu.field_of_study && (
                              <p className="text-xs text-gray-400">{edu.field_of_study}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Work Experience */}
              {linkedInData.work_experience && linkedInData.work_experience.length > 0 && (
                <div className="bg-gradient-to-br from-[#1E1E38] to-[#0F0F30] rounded-xl p-4 border border-[#3A3A5A]">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="workExperience"
                      checked={selectedFields.workExperience}
                      onCheckedChange={() => toggleField("workExperience")}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="w-4 h-4 text-[#7C2BD3]" />
                        <label htmlFor="workExperience" className="text-sm font-semibold cursor-pointer">
                          Work Experience ({linkedInData.work_experience.length})
                        </label>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                          New
                        </span>
                      </div>
                      <div className="space-y-2">
                        {linkedInData.work_experience.slice(0, 3).map((exp, idx) => (
                          <div key={idx} className="p-3 bg-[#262640]/50 rounded-lg border border-[#3A3A5A]">
                            <p className="text-sm font-medium text-white">{exp.title}</p>
                            <p className="text-xs text-gray-400">{exp.company}</p>
                          </div>
                        ))}
                        {linkedInData.work_experience.length > 3 && (
                          <p className="text-xs text-gray-400 text-center">
                            +{linkedInData.work_experience.length - 3} more
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Projects */}
              {linkedInData.projects && linkedInData.projects.length > 0 && (
                <div className="bg-gradient-to-br from-[#1E1E38] to-[#0F0F30] rounded-xl p-4 border border-[#3A3A5A]">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="projects"
                      checked={selectedFields.projects}
                      onCheckedChange={() => toggleField("projects")}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="w-4 h-4 text-[#7C2BD3]" />
                        <label htmlFor="projects" className="text-sm font-semibold cursor-pointer">
                          Projects ({linkedInData.projects.length})
                        </label>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                          New
                        </span>
                      </div>
                      <div className="space-y-2">
                        {linkedInData.projects.slice(0, 3).map((proj, idx) => (
                          <div key={idx} className="p-3 bg-[#262640]/50 rounded-lg border border-[#3A3A5A]">
                            <p className="text-sm font-medium text-white">{proj.name}</p>
                            {proj.description && (
                              <p className="text-xs text-gray-400 line-clamp-2 mt-1">{proj.description}</p>
                            )}
                          </div>
                        ))}
                        {linkedInData.projects.length > 3 && (
                          <p className="text-xs text-gray-400 text-center">
                            +{linkedInData.projects.length - 3} more
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        <DialogFooter className="border-t border-[#3A3A5A] pt-4 gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={syncing}
            className="border-[#3A3A5A] text-gray-300 hover:bg-[#262640]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSync}
            disabled={syncing || loading || !linkedInData}
            className="bg-[#0A66C2] hover:bg-[#085BA8] text-white gap-2"
          >
            {syncing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Sync Selected
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
