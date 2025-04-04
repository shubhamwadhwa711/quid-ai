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
import CountrySearch from "@/components/CountrySearch";
// import { useMediaQuery } from "@/hooks/use-media-query";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchProfile,
  Profile,
  updateProfile,
} from "@/reducers/profile/profileSlice";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import get from "lodash/get";
import ReadMore from "@/components/ReadMore";
import { NameIcon } from "@/components/icons/NameIcon";
import { LocationIcon } from "@/components/icons/LocationIcon";
import { SummaryIcon } from "@/components/icons/SummaryIcon";
import { BioIcon } from "@/components/icons/BioIcon";
import { ExpertiseIcon } from "@/components/icons/ExpertiseIcon";
import { BulbIcon } from "@/components/icons/BulbIcon";
import { Badge } from "@/components/ui/badge";
import ProjectEditForm from "@/components/ProjectEditForm";
import SkillSearch from "@/components/SkillSearch";
import LanguageSearch from "@/components/LanguageSearch";
import { fetchLanguage } from "@/reducers/filter/language/languageSlice";
import AcademicsSearch from "@/components/AcademicsSearch";
import { AvailableTo } from "@/components/AvailableToSelect";
import ClientSearch from "@/components/ClientSearch";
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
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [skills, setSkills] = useState<{ id: number; name: string }[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<[]>(currentValues.skill);
  const [selectedlanguages, setSelectedLanguages] = useState<
    { id: number; name: string }[]
  >(currentValues.language);
  const [selectedAcademics, setSelectedAcademics] = useState<
    { id: number; degree: string }[]
  >(currentValues.education);
  const [selectedAvailable, setSelectedAvailable] = useState<
    { id: number; name: string }[]
  >(currentValues.available_to);
  const [fullName, setFullName] = useState<string | null>(null);
  console.log(title, fields, currentValues);
  const [formData, setFormData] = useState({});
  const [tagInput, setTagInput] = useState("");
  const [currentField, setCurrentField] = useState(null);
  const dispatch = useAppDispatch();
  // Initialize form data when currentValues changes
  useEffect(() => {
    const initialData = {};
    fields.forEach((field) => {
      if (field.key === "fullName") {
        // Combine first and last name for the fullName field
        initialData[field.key] = `${currentValues.user?.first_name || ""} ${
          currentValues.user?.last_name || ""
        }`.trim();
      } else if (field.type === "tags") {
        // For tag fields, use the array from currentValues or create an empty array
        initialData[field.key] = currentValues[field.key]
          ? currentValues[field.key].map((item) => item.name || item.id)
          : [];
      } else {
        // For text/textarea fields, use the value directly
        console.log("currentValues.user", currentValues.user);
        console.log("field.accessor", get(currentValues, field.accessor, ""));
        initialData[field.key] = get(currentValues, field.accessor, "");
      }
    });
    console.log("initialData", initialData);
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
  const handleSelectSkill = (skill) => {
    console.log("handleSelectSkill", skill);
    setSelectedSkills((prev) => [...prev, skill]);
  };

  const handleRemoveSkill = (skillId: number) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill.id !== skillId));
  };
  const handleSelectLanguage = (language) => {
    console.log("handleSelectLanguage", language);
    setSelectedLanguages((prev) => [...prev, language]);
  };

  const handleRemoveLanguage = (languageId: number) => {
    console.log("handleRemoveLanguage", languageId);
    setSelectedLanguages((prev) =>
      prev.filter((lang) => lang.id !== languageId)
    );
  };
  const handleSelectAcademic = (academic) => {
    console.log("handleSelectAcademic", academic);
    setSelectedAcademics((prev) => [...prev, academic]);
  };

  const handleRemoveAcademic = (id: number) => {
    setSelectedAcademics((prev) => prev.filter((a) => a.id !== id));
  };
  const handleAvailableOnChange = (availability) => {
    console.log("availability", availability);
    setSelectedAvailable(availability);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  const handleUpdate = () => {
    console.log("ID", currentValues.id);
    console.log("formData", formData);

    const updatedData = { ...formData };
    console.log("currentValue", currentValues);
    if (formData.available) {
      updatedData.available_to = selectedAvailable.map((aval) => aval.id);
    }
    if (formData.skill) {
      updatedData.skill = selectedSkills.map((skill) => skill.id);
    }
    if (formData.academics) {
      console.log("formData.academics", formData.academics);
      updatedData.academics = selectedAcademics.map(
        (academic) => academic.degree
      );
    }
    // Ensure country is passed as an ID
    if (formData.country) {
      updatedData.country = selectedCountry.id;
    }
    if (formData.languages) {
      // selectedlanguages.map((lang) => lang.id)
      updatedData.language = selectedlanguages.map((lang) => lang.id);
    }
    // Split fullName into firstName and lastName
    if (formData.fullName) {
      const nameParts = formData.fullName.trim().split(" ");
      updatedData.first_name = nameParts[0];
      updatedData.last_name = nameParts.slice(1).join(" ") || ""; // Handle cases where there's no last name
      delete updatedData.fullName; // Remove fullName after splitting
    }

    console.log("updatedData", updatedData);
    console.log("selectedlanguages", selectedlanguages);
    dispatch(updateProfile({ id: currentValues.id, data: updatedData }));
  };
  console.log("currentValues", currentValues);
  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-4">
      {fields.map((field) => (
        <div key={field.key} className="space-y-2">
          {field.key === "country" ? (
            <CountrySearch
              selectedCountry={selectedCountry}
              onChange={(country) => {
                setSelectedCountry(country);
              }}
              icon={field.icon}
            />
          ) : (
            field.type === "text" && (
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-3 flex items-center text-white">
                  {field.icon}
                </div>
                <input
                  type="text"
                  value={formData[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder || `Enter ${field.label}`}
                  className="w-full p-2 pl-10 bg-[#262640] text-white rounded-lg border-none focus:ring-2 focus:ring-[#7C2BD3]"
                />
              </div>
            )
          )}

          {field.type === "textarea" && (
            <div className="relative w-full flex">
              <div className="absolute inset-y-0 left-3 flex items-start pt-2 text-white">
                {field.icon}
              </div>
              <textarea
                value={formData[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder || `Enter ${field.label}`}
                className="w-full p-2 pl-10 bg-[#262640] text-white rounded-lg min-h-[200px] border-none focus:ring-2 focus:ring-[#7C2BD3]"
              />
            </div>
          )}

          {field.type === "tags" && (
            <div className="space-y-2">
              {field.key === "skill" && (
                <SkillSearch
                  selectedSkills={selectedSkills}
                  onSelectSkill={handleSelectSkill}
                  onRemoveSkill={handleRemoveSkill}
                />
              )}

              {field.key === "academics" && (
                <AcademicsSearch
                  profileID={currentValues.id}
                  selectedAcademics={selectedAcademics}
                  onSelectAcademics={handleSelectAcademic}
                />
              )}

              {field.key === "featuredClients" && (
               
               <ClientSearch
               selectedClients={selectedClients}
               onChange={(updatedClients) => setSelectedClients(updatedClients)}
               onRemoveClient={(clientToRemove) =>
                 setSelectedClients((prev) =>
                   prev.filter((client) => client.id !== clientToRemove.id)
                 )
               }
             />
              )}

              {field.key === "languages" && (
                <LanguageSearch
                  selectedLanguages={selectedlanguages}
                  onSelectLanguage={handleSelectLanguage}
                  onRemoveLanguage={handleRemoveLanguage}
                />
              )}

              {field.key === "available" && (
                <AvailableTo
                  defaultSelected={currentValues.available_to}
                  onChange={handleAvailableOnChange}
                />
              )}

              {/* Badges displayed below the input field */}
              {/* <div className="flex flex-wrap gap-2 pt-4">
                {currentValues[field.accessor]?.map((item) => (
                  <Badge
                    key={item.id}
                    variant="none"
                    className="border-none text-xs whitespace-nowrap rounded-3xl bg-white/30 flex items-center"
                  >
                    <span>{item.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => handleTagRemove(field.name, item.id)}
                      className="h-4 w-4 p-0 ml-1"
                    >
                      <X size={10} />
                    </Button>
                  </Badge>
                ))}
              </div> */}
            </div>
          )}

          {field.key === "projectTags" && (
            <div className="flex flex-wrap gap-2">
              {currentValues.projects.flatMap((project) =>
                project.tag.map((t) => (
                  <Badge
                    key={t.id}
                    variant="none"
                    className="border-none text-xs whitespace-nowrap rounded-3xl bg-white/30 flex items-center"
                  >
                    <span>{t.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => handleTagRemove("projectTags", t)}
                      className="h-4 w-4 p-0 ml-1"
                    >
                      <X size={10} />
                    </Button>
                  </Badge>
                ))
              )}
            </div>
          )}
        </div>
      ))}

      <Button
        onClick={handleUpdate}
        type="submit"
        className="w-11/12 bg-gradient-to-r proxima-bold fixed bottom-1 from-[#7C2BD3] to-[#075AA8] text-white rounded-full p-6"
      >
        Update {title}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12H20M20 12L14 6M20 12L14 18"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </form>
  );
};

// Main Profile Component
const Profile = () => {
  const [selectedProject, setselectedProject] = useState(null);
  const [openProjectEditForm, setOpenProjectEditForm] = useState(false);
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
    setActivePopup(null);
  };

  const handleSaveData = (newData) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  };
  const handleOpenProjectEditForm = (project) => {
    console.log("Project", project);
    setselectedProject(project);
    setOpenProjectEditForm(true);
  };
  const handleProjectUpdate = (updatedProject) => {
    // Your logic to update the project, e.g., API call or state update
    console.log(updatedProject);
  };
  console.log("UserData", userData);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 pb-20">
      {/* Main profile card */}
      <div className="w-full max-w-2xl rounded-xl overflow-hidden">
        {/* Cover photo area */}
        <div className="h-32"></div>

        {/* Profile content */}
        <div className="p-2">
          {/* Profile header with image on left, name/location on right */}
          <div className="flex flex-row -mt-16">
            {/* Profile image (left) */}
            <div className="h-32 w-32 flex-shrink-0 rounded-full overflow-hidden  border-2 shadow-md">
              <img
                src={userData?.image}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-4">
              <div className="flex justify-between">
                <h1 className="text-2xl proxima-medium">
                  {userData?.user?.first_name} {userData?.user?.last_name}
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
                  {userData?.country.name}
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
                <span className=" text-xs mt-2 font-bold  text-nowrap">
                  {userData?.linkedin_url.slice(7)}
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
            onClick={() =>
              handleOpenProjectEditForm({
                title: null,
                description: null,
                tags: [],
              })
            }
          >
            <Edit size={16} />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
          {userData?.projects?.map((project, index) => (
            <Card
              key={index}
              className="hover:shadow-md border-none relative bg-gray-800  transition flex-shrink-0 w-44 h-48"
            >
              <div className="relative h-4/5">
                <img
                  src={project?.image}
                  alt={project?.title}
                  className="w-full h-full object-fill rounded-t-lg"
                />
              </div>
              <Button
                variant="none"
                onClick={() => handleOpenProjectEditForm(project)}
                className="absolute bg-white rounded-full p-2 top-1 right-1"
              >
                <Edit className="h-6 w-6 text-black" />
              </Button>
              <div className="h-1/5 flex  flex-col justify-between p-1">
                <CardTitle className="text-xs text-center text-wrap text-white ">
                  {project.title}
                </CardTitle>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {activePopup && (
        <Drawer open={true} onOpenChange={handleClosePopup}>
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
              currentValues={userData}
              onSave={handleSaveData}
              onClose={handleClosePopup}
            />

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      <Drawer open={openProjectEditForm} onOpenChange={setOpenProjectEditForm}>
        <DrawerContent className="mx-auto max-w-md bg-gradient-to-br rounded-t-3xl h-4/5 from-black via-[#0F0F30] to-[#0F0F30] text-white">
          <DrawerHeader className="relative flex justify-center">
            <DrawerTitle>Edit Project</DrawerTitle>
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
          <ProjectEditForm
            project={selectedProject}
            onUpdate={handleProjectUpdate}
            currentValues={userData}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Profile;
