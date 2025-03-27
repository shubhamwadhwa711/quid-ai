import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Edit2Icon,
  Linkedin,
  MapPin,
  Pencil,
  Share2,
  X,
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { useMediaQuery } from "@/hooks/use-media-query";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProfile, Profile } from "@/reducers/profile/profileSlice";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import get from "lodash/get";
import ReadMore from "@/components/ReadMore";
// Custom hook for media query if not already available
const useCustomMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

// EditContent component to be used in both Dialog and Drawer
const EditContent = ({ title, fields, currentValues, onSave, onClose }) => {
  console.log(title, fields, currentValues);
  const [formData, setFormData] = useState({});
  const [tagInput, setTagInput] = useState("");
  const [currentField, setCurrentField] = useState(null);

  // Initialize form data when currentValues changes
  useEffect(() => {
    const initialData = {};
    fields.forEach((field) => {
      if (field.type === "tags") {
        // For tag fields, use the array from currentValues or create an empty array
        initialData[field.key] = currentValues[field.key]
          ? currentValues[field.key].map((item) => item.name || item)
          : [];
      } else {
        // For text/textarea fields, use the value directly

        console.log("currentValues.user", currentValues.user);
        console.log("field.accessor", get(currentValues, field.accessor, ""));
        initialData[field.key] = get(currentValues, field.accessor, "");
      }
    });
    // console.log("initialData", initialData);
    setFormData(initialData);
  }, [currentValues, fields]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleTagAdd = (field) => {
    if (!tagInput.trim()) return;

    const newTags = [...(formData[field] || []), tagInput.trim()];
    setFormData((prev) => ({ ...prev, [field]: newTags }));
    setTagInput("");
    setCurrentField(null);
  };

  const handleTagRemove = (field, index) => {
    const newTags = [...formData[field]];
    newTags.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: newTags }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-4">
      {fields.map((field) => (
        <div key={field.key} className="space-y-2">
          {field.type === "text" && (
            <input
              type="text"
              value={formData[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder || `Enter ${field.label}`}
              className="w-full p-2 bg-[#262640] text-white rounded-lg border-none focus:ring-2 focus:ring-[#7C2BD3]"
            />
          )}

          {field.type === "textarea" && (
            <textarea
              value={formData[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder || `Enter ${field.label}`}
              className="w-full p-2 bg-[#262640] text-white rounded-lg min-h-[100px] border-none focus:ring-2 focus:ring-[#7C2BD3]"
            />
          )}

          {field.type === "tags" && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                    setCurrentField(field.key);
                  }}
                  placeholder={`Add ${field.label}`}
                  className="flex-1 p-2 bg-[#262640] text-white rounded-lg border-none focus:ring-2 focus:ring-[#7C2BD3]"
                />
                {currentField === field.key && (
                  <Button
                    type="button"
                    onClick={() => handleTagAdd(field.key)}
                    className="bg-[#7C2BD3] text-white hover:bg-[#6620B0]"
                  >
                    Add
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {formData[field.key]?.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-1 rounded-3xl bg-white/20 text-sm"
                  >
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => handleTagRemove(field.key, index)}
                      className="h-5 w-5 ml-1 p-0"
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] text-white rounded-full py-2"
      >
        Update {title}
      </Button>
    </form>
  );
};

// Main Profile Component
const Profile = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.Profile);
  useEffect(() => {
    // console.log("dispatching profile...");
    dispatch(fetchProfile());
  }, [dispatch]);
  // console.log("profile", profile);
  const [userData, setUserData] = useState<Profile | null>(null);
  console.log("userData", userData);
  console.log("userData", userData);
  // State for controlling which popup is currently open
  const [activePopup, setActivePopup] = useState(null);
  useEffect(() => {
    setUserData(profile[0]);
  }, [profile]);
  // Define handlers for different popups
  const popupConfigs = {
    profile: {
      title: "Profile",
      fields: [
        {
          key: "name",
          type: "text",
          placeholder: "Full Name",
          accessor: "user.username",
        },
        // // { key: "title", type: "text", placeholder: "Job Title" },
        {
          key: "location",
          type: "text",
          placeholder: "Location",
          accessor: "country.name",
        },
        {
          key: "bio",
          type: "text",
          placeholder: "Short Bio",
          accessor: "headline",
        },
        // { key: "linkedIn", type: "text", placeholder: "LinkedIn URL" },
      ],
    },
    bio: {
      title: "Bio",
      fields: [
        {
          key: "fullBio",
          type: "textarea",
          placeholder: "Enter your full bio here",
          accessor:"summary"
        },
      ],
    },
    expertise: {
      title: "Expertise",
      fields: [{ key: "skills", type: "tags", label: "Skill" }],
    },
    language: {
      title: "Language",
      fields: [{ key: "languages", type: "tags", label: "Language" }],
    },
    academics: {
      title: "Academics",
      fields: [
        { key: "academics", type: "tags", label: "Academic Credential" },
      ],
    },
    available: {
      title: "Available To",
      fields: [{ key: "available", type: "tags", label: "Availability" }],
    },
    clients: {
      title: "Featured Clients",
      fields: [{ key: "featuredClients", type: "tags", label: "Client" }],
    },
    project: {
      title: "Project",
      fields: [
        { key: "projectTitle", type: "text", placeholder: "Project Title" },
        {
          key: "projectDescription",
          type: "textarea",
          placeholder: "Project Description",
        },
        { key: "projectTags", type: "tags", label: "Tag" },
      ],
    },
  };

  const handleOpenPopup = (popupName) => {
    setActivePopup(popupName);
  };

  const handleClosePopup = () => {
    setActivePopup(null);
  };

  const handleSaveData = (newData) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  };
  const handleEditProject = () => {};
  console.log("UserData", userData);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2">
      {/* Main profile card */}
      <div className="w-full max-w-2xl rounded-xl overflow-hidden">
        {/* Cover photo area */}
        <div className="h-32"></div>

        {/* Profile content */}
        <div className="p-2">
          {/* Profile header with image on left, name/location on right */}
          <div className="flex flex-row -mt-16">
            {/* Profile image (left) */}
            <div className="h-32 w-32 flex-shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src="/api/placeholder/128/128"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-4">
              <div className="flex justify-between">
                <h1 className="text-2xl proxima-medium">
                  {userData?.user?.username}
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
                  {userData?.location}
                </span>
              </div>
              <div className="mt-2">
                <p className="font-semibold text-sm">{userData?.headline}</p>
              </div>
              {/* <div className=" absolute top-24 right-0  flex justify-center">
                <img
                  src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1740037507/quidAi/sugtwxhrkajxvvl1bhms.png"
                  alt="Spiral Background"
                  className="w-full h-full object-fill"
                />
              </div> */}
              <div className="flex items-center space-x-2">
                <Linkedin className="w-5 h-5 fill-white" />
                <span className="mt-1 proxima-large">
                  {userData?.linkedin_url}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 p-2">
            <Button className="w-full bg-gradient-to-r text-lg proxima-bold from-[#7C2BD3] to-[#075AA8] text-white rounded-full transition-colors space-x-2">
              Share Profile
              <Share2 size={40} className="ml-2" />
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
            <div className="flex flex-wrap gap-2">
              {userData?.skill.map((s, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional sections */}
      <div className="w-full max-w-2xl p-2">
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
        <div className="space-y-4">
          <div className="pl-4">
            <ReadMore text={userData?.summary} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
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
        <div className="flex flex-wrap gap-2">
          {userData?.language?.map((lang, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
            >
              {lang.name}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
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
        <div className="flex flex-wrap gap-2">
          {userData?.education.map((edu, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
            >
              {edu.degree}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
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
        <div className="flex flex-wrap gap-2">
          {userData?.available_to?.map((aval, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
            >
              {aval.name}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
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
        <div className="flex flex-wrap gap-2">
          {userData?.client.map((cli, index) => (
            <span
              key={cli.id}
              className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
            >
              {cli.name}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima-regular">RECENT PROJECTS</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
            onClick={() => handleOpenPopup("project")}
          >
            <Edit size={16} />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {userData?.projects?.map((project, index) => (
            <Card
              key={index}
              className="hover:shadow-md relative bg-gray-800  transition flex-shrink-0 w-60 h-56"
            >
              <div className="relative h-4/5">
                <img
                  src={project.title}
                  alt={project.title}
                  className="w-full h-full object-fill rounded-t-lg"
                />
              </div>
              <Button
                variant="none"
                onClick={handleEditProject}
                className="absolute bg-white rounded-full p-2 top-1 right-1"
              >
                <Edit className="h-6 w-6 text-black" />
              </Button>
              <div className="h-1/5 flex  flex-col justify-between p-4">
                <CardTitle className="text-sm text-start text-white proxima-FAQ">
                  {project.title}
                </CardTitle>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {activePopup && (
        <Drawer open={true} onOpenChange={handleClosePopup}>
          <DrawerContent className="bg-[#1A1A2E] text-white">
            <DrawerHeader>
              <DrawerTitle className="text-xl">
                Edit {popupConfigs[activePopup].title}
              </DrawerTitle>
            </DrawerHeader>

            <EditContent
              title={popupConfigs[activePopup].title}
              fields={popupConfigs[activePopup].fields}
              currentValues={userData}
              onSave={handleSaveData}
              onClose={handleClosePopup}
            />

            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default Profile;
