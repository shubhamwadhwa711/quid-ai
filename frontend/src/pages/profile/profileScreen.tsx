"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Linkedin, MapPin, Share2, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchLinkedInProfile,
  fetchProfile,
  syncWithLinkedIn,
  Profile as ProfileType,
  updateProfile,
} from "@/reducers/profile/profileSlice";
import ReadMore from "@/components/ReadMore";
import { NameIcon } from "@/components/icons/NameIcon";
import { LocationIcon } from "@/components/icons/LocationIcon";
import { SummaryIcon } from "@/components/icons/SummaryIcon";
import { BioIcon } from "@/components/icons/BioIcon";
import { BulbIcon } from "@/components/icons/BulbIcon";
import ProjectsScreen from "@/components/projects/ProjectsScreen";
import EditContent from "@/components/EditContent";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Spinner } from "flowbite-react";
import { Badge } from "@/components/ui/badge";
// Main Profile Component
const ProfileScreen = () => {
  const { data: session } = useSession();
  // console.log("session?.provider.tokens", session?.provider.tokens);
  const dispatch = useAppDispatch();
  const { profile, loading, syncLoading, error } = useAppSelector((state) => state.Profile);

  const [isCopiedURL, setIsCopiedURL] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);


  // State for controlling which popup is currently open
  const [activePopup, setActivePopup] = useState<keyof typeof popupConfigs | false>(false);
  const handleShareProfile = () => {
    if (profile?.linkedin_url) {
      navigator.clipboard
        .writeText(`${profile.linkedin_url}`)
        .then(() => {
          setIsCopiedURL(true);
          setTimeout(() => {
            setIsCopiedURL(false);
          }, 2000);
          // Optional: show a toast or alert
        })
        .catch((err) => {
          console.error("❌ [PROFILE SCREEN] Failed to copy:", err);
        });
    }
  };

  const handleSyncWithLinkedIn = () => {
    console.log("� [PROFILE SCREEN] Sync with LinkedIn button clicked!");
    console.log("�📋 [PROFILE SCREEN] Current profile state before sync:", {
      id: profile?.id,
      linkedin_data: profile?.linkedin_data,
      skills: profile?.skill?.length || 0,
      education: profile?.education?.length || 0,
    });
    dispatch(syncWithLinkedIn());
  };

  // Define handlers for different popups
  const popupConfigs = {
    profile: {
      title: "Profile",
      fields: [
        {
          key: "fullName",
          type: "text",
          placeholder: "Full Name",
          accessor: "fullName",
          icon: <NameIcon />,
        },
        // // { key: "title", type: "text", placeholder: "Job Title" },
        {
          key: "country",
          type: "text",
          placeholder: "country",
          accessor: "country.name",
          icon: <LocationIcon />,
        },
        {
          key: "headline",
          type: "textarea",
          placeholder: "Short Bio",
          accessor: "headline",
          icon: <SummaryIcon />,
        },
        // { key: "linkedIn", type: "text", placeholder: "LinkedIn URL" },
      ],
    },
    bio: {
      title: "Bio",
      fields: [
        {
          key: "summary",
          type: "textarea",
          placeholder: "Enter your full bio here",
          accessor: "summary",
          icon: <BioIcon />,
        },
      ],
    },
    expertise: {
      title: "Expertise",
      fields: [
        {
          key: "skill",
          type: "tags",
          label: "Skill",
          accessor: "skill",
          icon: <BulbIcon />,
        },
      ],
    },
    language: {
      title: "Language",
      fields: [
        {
          key: "languages",
          type: "tags",
          label: "Language",
          accessor: "language",
          icon: <BulbIcon />,
        },
      ],
    },
    academics: {
      title: "Academics",
      fields: [
        {
          key: "academics",
          type: "tags",
          label: "Academic Credential",
          accessor: "education",
          icon: <BulbIcon />,
        },
      ],
    },
    available: {
      title: "Available To",
      fields: [
        {
          key: "available",
          type: "tags",
          label: "Availability",
          accessor: "available_to",
          icon: <BulbIcon />,
        },
      ],
    },
    clients: {
      title: "Featured Clients",
      fields: [
        {
          key: "featuredClients",
          type: "tags",
          label: "Client",
          accessor: "client",
          icon: <BulbIcon />,
        },
      ],
    },
    project: {
      title: "Project",
      fields: [
        {
          key: "projectTitle",
          type: "text",
          placeholder: "Project Title",
          accessor: "projectTitle",
          icon: <NameIcon />,
        },
        {
          key: "projectDescription",
          type: "textarea",
          placeholder: "Project Description",
          accessor: "projectDescription",
          icon: <BioIcon />,
        },
        {
          key: "projectTags",
          type: "tags",
          label: "Tag",
          accessor: "projectTags",
          icon: <BulbIcon />,
        },
      ],
    },
  };

  const handleOpenPopup = (popupName: keyof typeof popupConfigs) => {
    setActivePopup(popupName);
  };

  const handleClosePopup = () => {
    setActivePopup(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation: allow only images
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    if (!profile?.id) return;
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updateProfile({ id: profile.id, data: formData }));
  };
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );

  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-20 px-2 pb-20">
      {/* Main profile card */}
      <div className="w-full max-w-2xl rounded-xl ">
        {/* Cover photo area */}
        {/* <div className="h-32 bg-gradient-to-r border from-[#063373]/30 to-[#041D3F]/30"></div> */}

        {/* Profile content */}
        <div className="p-2">
          <div className="flex flex-row -mt-16">
            <div className="h-32 w-32 z-50 relative flex-shrink-0 rounded-full border-2 shadow-md">
              <Image
                width={100}
                height={100}
                src={profile?.image || profile?.linkedin_profile_url || session?.user?.image || "/default-avatar.jpg"}
                alt="Profile"
                className="h-full w-full rounded-full"
              />
              <Button
                onClick={() => fileInput?.current?.click()}
                className="bg-gradient-to-tr from-[#7C2BD3] to-[#075AA8] absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
              >
                <Edit size={16} />
              </Button>
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div className="ml-4 flex-grow">
              <div className="flex justify-between">
                <h1 className="text-2xl proxima-medium">
                  {profile?.user?.first_name || "First"}{" "}
                  {profile?.user?.last_name || "Last"}
                </h1>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleOpenPopup("profile")}
                >
                  <Edit size={16} />
                </Button>
              </div>
              <div className="flex items-center mt-1">
                <MapPin size={16} className="mr-1" />
                <span className="text-gray-400 proxima-small">
                  {profile?.country?.name || "Add your location"}
                </span>
              </div>
              <div className="absolute  right-0">
                <img src="/Icons/Spiral.png" alt="" />
              </div>
              <div className="mt-2 min-h-6">
                <p className="font-semibold text-sm">
                  {profile?.headline || "Add a professional headline"}
                </p>
              </div>

              <div className="flex items-center space-x-2 mt-2">
                <Linkedin className="w-5 h-5 fill-white" />
                <span className="text-sm font-bold text-wrap overflow-hidden text-ellipsis">
                  {profile?.linkedin_url?.slice(8) || "Add LinkedIn URL"}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 p-2 flex flex-col gap-2">
            <Button
              onClick={handleShareProfile}
              className="w-full relative z-50 bg-gradient-to-r text-lg proxima-bold from-[#7C2BD3] to-[#075AA8] text-white rounded-full transition-colors space-x-2"
            >
              {isCopiedURL ? "Copied" : "Share Profile"}
              {!isCopiedURL && <Share2 className="w-5 h-5" />}
            </Button>
            <Button
              onClick={handleSyncWithLinkedIn}
              disabled={syncLoading}
              className="w-full bg-[#0A66C2] hover:bg-[#085BA8] text-lg proxima-bold text-white rounded-full transition-colors space-x-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {syncLoading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  <span>Syncing...</span>
                </>
              ) : (
                <>
                  <Linkedin className="w-5 h-5" />
                  <span className="proxima-bold cursor-pointer">Sync with LinkedIn</span>
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 ">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
                <h2 className="text-xl proxima-regular">EXPERTISE</h2>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full z-50"
                onClick={() => handleOpenPopup("expertise")}
              >
                <Edit size={16} className="" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 min-h-12 p-2">
              {profile?.skill && profile.skill.length > 0 ? (
                profile.skill.map((s, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
                  >
                    {s.name}
                  </span>
                ))
              ) : (
                <span className="text-sm text-white/50">
                  Add your expertise
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional sections */}
      <div className="w-full max-w-2xl p-2 mt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima-regular">BIO</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
            onClick={() => handleOpenPopup("bio")}
          >
            <Edit size={16} />
          </Button>
        </div>
        <div className="pl-4 min-h-20">
          {profile?.summary ? (
            <ReadMore text={profile.summary} />
          ) : (
            <p className="text-sm text-white/50">Add your professional bio</p>
          )}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2 mt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima-regular">LANGUAGE</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
            onClick={() => handleOpenPopup("language")}
          >
            <Edit size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 min-h-12 p-2">
          {profile?.languages && profile.languages.length > 0 ? (
            profile.languages.map((lang, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
              >
                {lang.name}
              </span>
            ))
          ) : (
            <span className="text-sm text-white/50">
              Add languages you speak
            </span>
          )}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2 mt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima-regular">ACADEMICS</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
            onClick={() => handleOpenPopup("academics")}
          >
            <Edit size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 min-h-12 p-2">
          {profile?.education && profile.education.length > 0 ? (
            profile.education.map((edu, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
              >
                {edu.degree}
              </span>
            ))
          ) : (
            <span className="text-sm text-white/50">
              Add your academic qualifications
            </span>
          )}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2 mt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima-regular">AVAILABLE TO</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
            onClick={() => handleOpenPopup("available")}
          >
            <Edit size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 min-h-12 p-2">
          {profile?.available_to && profile.available_to.length > 0 ? (
            profile.available_to.map((aval, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
              >
                {aval.name}
              </span>
            ))
          ) : (
            <span className="text-sm text-white/50">
              Add your availability preferences
            </span>
          )}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2 mt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima-regular">FEATURED CLIENTS</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
            onClick={() => handleOpenPopup("clients")}
          >
            <Edit size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 min-h-12 p-2">
          {profile?.client && profile.client.length > 0 ? (
            profile.client.map((cli, index) => (
              <span
                key={cli.id}
                className="px-3 py-2  rounded-3xl bg-white/20 text-xs font-bold"
              >
                {/* <img src={cli.logo} alt="" className="uniform-logo-inverted " /> */}
                {cli.name}
              </span>
            ))
          ) : (
            <span className="text-sm text-white/50">
              Add your featured clients
            </span>
          )}
        </div>
      </div>

      <ProjectsScreen
        projects={(profile?.projects || []).map(p => ({ ...p, tag: p.tag || [] }))}
        profileId={profile?.id || 0}
      />

      {activePopup && (
        <Drawer open={!!activePopup} onOpenChange={handleClosePopup}>
          <DrawerContent className="mx-auto max-w-md bg-gradient-to-br h-4/5 rounded-3xl from-black via-[#0F0F30] to-[#0F0F30] text-white">
            <DrawerHeader className="relative flex justify-center">
              <DrawerTitle className="text-xl">
                Edit {activePopup && popupConfigs[activePopup]?.title}
              </DrawerTitle>
              <DrawerClose asChild>
                <Button variant="none" className="absolute right-4 top-2">
                  <X className="w-3.5 h-3.5" />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            {activePopup && (
              <EditContent
                title={popupConfigs[activePopup].title}
                fields={popupConfigs[activePopup].fields as any}
                currentValues={profile}
                onSave={handleClosePopup}
                onClose={handleClosePopup}
              />
            )}

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default ProfileScreen;
