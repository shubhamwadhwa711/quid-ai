import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Linkedin, MapPin } from "lucide-react";
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
// Main Profile Component
const ProfileScreen = () => {
  const { data: session } = useSession();
  console.log("session?.provider.tokens", session?.provider.tokens);
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.Profile);

  const fileInput = useRef();
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  console.log("profile", profile);

  // State for controlling which popup is currently open
  const [activePopup, setActivePopup] = useState(false);

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

  const handleOpenPopup = (popupName) => {
    setActivePopup(popupName);
  };

  const handleClosePopup = () => {
    setActivePopup(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation: allow only images
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updateProfile({ id: profile?.id, data: formData }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-20 px-2 pb-20">
      {/* Main profile card */}
      <div className="w-full max-w-2xl rounded-xl ">
        {/* Cover photo area */}
        {/* <div className="h-32 bg-gradient-to-r border from-[#063373]/30 to-[#041D3F]/30"></div> */}

        {/* Profile content */}
        <div className="p-2">
          {/* Profile header with image on left, name/location on right */}
          <div className="flex flex-row -mt-16">
            {/* Profile image (left) */}
            <div className="h-32 w-32 relative flex-shrink-0 rounded-full border-2 shadow-md">
              <Image
                width={100}
                height={100}
                src={profile?.image || "/placeholder-avatar.png"}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
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
              <div className="absolute right-0">
                <img
                  src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1740037507/quidAi/sugtwxhrkajxvvl1bhms.png"
                  alt=""
                />
              </div>
              <div className="mt-2 min-h-6">
                <p className="font-semibold text-sm">
                  {profile?.headline || "Add a professional headline"}
                </p>
              </div>

              <div className="flex items-center space-x-2 mt-2">
                <Linkedin className="w-5 h-5 fill-white" />
                <span className="text-sm font-bold text-nowrap overflow-hidden text-ellipsis">
                  {profile?.linkedin_url || "Add LinkedIn URL"}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 p-2">
            <Button className="w-full bg-gradient-to-r text-lg proxima-bold from-[#7C2BD3] to-[#075AA8] text-white rounded-full transition-colors space-x-2">
              Share Profile
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.3531 15C16.9041 15.0017 16.4601 15.0941 16.0477 15.2717C15.6352 15.4493 15.263 15.7083 14.9531 16.0333L6.82647 11.9667C7.02638 11.3605 7.02638 10.7062 6.82647 10.1L14.9665 5.96001C15.5495 6.57443 16.3402 6.95011 17.1848 7.01405C18.0294 7.07798 18.8676 6.82559 19.5365 6.30594C20.2054 5.78628 20.6572 5.03649 20.8041 4.20229C20.9509 3.36809 20.7824 2.50909 20.3312 1.79223C19.88 1.07538 19.1784 0.551891 18.3627 0.323519C17.5471 0.0951472 16.6756 0.178206 15.9178 0.556551C15.16 0.934897 15.5699 1.5815 14.2622 2.37068C13.9546 3.15986 13.9513 4.03524 14.2531 4.82668L6.19314 8.92668C5.75783 8.39431 5.16853 8.0096 4.50601 7.82529C3.84349 7.64099 3.14018 7.6661 2.49249 7.89719C1.8448 8.12828 1.28444 8.55403 0.888212 9.11609C0.491987 9.67815 0.279297 10.349 0.279297 11.0367C0.279297 11.7244 0.491987 12.3952 0.888212 12.9573C1.28444 13.5193 1.8448 13.9451 2.49249 14.1762C3.14018 14.4073 3.84349 14.4324 4.50601 14.2481C5.16853 14.0638 5.75783 13.679 6.19314 13.1467L14.2331 17.1933C14.0969 17.558 14.0269 17.9441 14.0265 18.3333C14.0265 18.9926 14.222 19.6371 14.5882 20.1852C14.9545 20.7334 15.4751 21.1607 16.0842 21.4129C16.6933 21.6652 17.3635 21.7312 18.0101 21.6026C18.6567 21.474 19.2507 21.1565 19.7168 20.6904C20.183 20.2242 20.5005 19.6302 20.6291 18.9836C20.7577 18.337 20.6917 17.6668 20.4394 17.0577C20.1871 16.4486 19.7599 15.9281 19.2117 15.5618C18.6635 15.1955 18.0191 15 17.3598 15H17.3531ZM17.3531 1.66668C17.7487 1.66668 18.1354 1.78397 18.4643 2.00374C18.7932 2.2235 19.0495 2.53586 19.2009 2.90131C19.3523 3.26676 19.3919 3.6689 19.3147 4.05686C19.2375 4.44482 19.0471 4.80119 18.7673 5.08089C18.4876 5.3606 18.1313 5.55108 17.7433 5.62825C17.3554 5.70542 16.9532 5.66581 16.5878 5.51444C16.2223 5.36306 15.91 5.10672 15.6902 4.77782C15.4704 4.44892 15.3531 4.06224 15.3531 3.66668C15.3531 3.13624 15.5639 2.62754 15.9389 2.25246C16.314 1.87739 16.8227 1.66668 17.3531 1.66668ZM3.66647 13C3.27091 13 2.88423 12.8827 2.55533 12.663C2.22643 12.4432 1.97009 12.1308 1.81871 11.7654C1.66734 11.3999 1.62773 10.9978 1.7049 10.6098C1.78207 10.2219 1.97255 9.8655 2.25226 9.5858C2.53196 9.30609 2.88833 9.11561 3.27629 9.03844C3.66425 8.96127 4.06638 9.00088 4.43184 9.15225C4.79729 9.30363 5.10965 9.55997 5.32941 9.88887C5.54917 10.2178 5.66647 10.6044 5.66647 11C5.66647 11.5304 5.45576 12.0392 5.08068 12.4142C4.70561 12.7893 4.1969 13 3.66647 13ZM17.3531 20.3333C16.9576 20.3333 16.5709 20.216 16.242 19.9963C15.9131 19.7765 15.6568 19.4642 15.5054 19.0987C15.354 18.7333 15.3144 18.3311 15.3916 17.9432C15.4687 17.5552 15.6592 17.1988 15.9389 16.9191C16.2186 16.6394 16.575 16.4489 16.963 16.3718C17.3509 16.2946 17.7531 16.3342 18.1185 16.4856C18.484 16.637 18.7963 16.8933 19.0161 17.2222C19.2358 17.5511 19.3531 17.9378 19.3531 18.3333C19.3531 18.8638 19.1424 19.3725 18.7673 19.7476C18.3923 20.1226 17.8836 20.3333 17.3531 20.3333Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
                <h2 className="text-xl proxima-regular">EXPERTISE</h2>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full"
                onClick={() => handleOpenPopup("expertise")}
              >
                <Edit size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 min-h-12 p-2">
              {profile?.skill?.length > 0 ? (
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
          {profile?.language?.length > 0 ? (
            profile.language.map((lang, index) => (
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
          {profile?.education?.length > 0 ? (
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
          {profile?.available_to?.length > 0 ? (
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
          {profile?.client?.length > 0 ? (
            profile.client.map((cli, index) => (
              <span
                key={cli.id}
                className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
              >
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
        projects={profile?.projects || []}
        profileId={profile?.id}
      />

      {activePopup && (
        <Drawer open={activePopup} onOpenChange={handleClosePopup}>
          <DrawerContent className="mx-auto max-w-md bg-gradient-to-br h-4/5 rounded-3xl from-black via-[#0F0F30] to-[#0F0F30] text-white">
            <DrawerHeader className="relative flex justify-center">
              <DrawerTitle className="text-xl">
                Edit {popupConfigs[activePopup]?.title}
              </DrawerTitle>
              <DrawerClose asChild>
                <Button variant="none" className="absolute right-4 top-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.9998 8.40005L2.0998 13.3C1.91647 13.4834 1.68314 13.575 1.3998 13.575C1.11647 13.575 0.883138 13.4834 0.699804 13.3C0.516471 13.1167 0.424805 12.8834 0.424805 12.6C0.424805 12.3167 0.516471 12.0834 0.699804 11.9L5.5998 7.00005L0.699804 2.10005C0.516471 1.91672 0.424805 1.68338 0.424805 1.40005C0.424805 1.11672 0.516471 0.883382 0.699804 0.700048C0.883138 0.516715 1.11647 0.425049 1.3998 0.425049C1.68314 0.425049 1.91647 0.516715 2.0998 0.700048L6.9998 5.60005L11.8998 0.700048C12.0831 0.516715 12.3165 0.425049 12.5998 0.425049C12.8831 0.425049 13.1165 0.516715 13.2998 0.700048C13.4831 0.883382 13.5748 1.11672 13.5748 1.40005C13.5748 1.68338 13.4831 1.91672 13.2998 2.10005L8.3998 7.00005L13.2998 11.9C13.4831 12.0834 13.5748 12.3167 13.5748 12.6C13.5748 12.8834 13.4831 13.1167 13.2998 13.3C13.1165 13.4834 12.8831 13.575 12.5998 13.575C12.3165 13.575 12.0831 13.4834 11.8998 13.3L6.9998 8.40005Z"
                      fill="white"
                    />
                  </svg>
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <EditContent
              title={popupConfigs[activePopup]?.title}
              fields={popupConfigs[activePopup].fields}
              currentValues={profile}
              onSave={handleClosePopup}
              onClose={handleClosePopup}
            />

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default ProfileScreen;
