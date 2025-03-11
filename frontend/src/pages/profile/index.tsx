import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Linkedin, MapPin, Share2, X } from "lucide-react";
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
  const [formData, setFormData] = useState(currentValues);
  const [tagInput, setTagInput] = useState("");

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleTagAdd = (field) => {
    if (!tagInput.trim()) return;

    const newTags = [...(formData[field] || []), tagInput.trim()];
    setFormData((prev) => ({ ...prev, [field]: newTags }));
    setTagInput("");
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
    <form onSubmit={handleSubmit} className="space-y-4">
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
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder={`Add ${field.label}`}
                  className="flex-1 p-2 bg-[#262640] text-white rounded-lg border-none focus:ring-2 focus:ring-[#7C2BD3]"
                />
                <Button
                  type="button"
                  onClick={() => handleTagAdd(field.key)}
                  className="bg-[#7C2BD3] text-white hover:bg-[#6620B0]"
                >
                  Add
                </Button>
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

// Responsive Edit Component that shows Drawer on mobile and Dialog on desktop
const ResponsiveEdit = ({
  isOpen,
  onClose,
  title,
  fields,
  currentValues,
  onSave,
}) => {
  // Use the custom hook if shadcn's useMediaQuery is not available
  const isDesktop = useCustomMediaQuery("(min-width: 768px)");

  if (!isOpen) return null;

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={() => onClose()}>
        <DialogContent className="bg-[#1A1A2E] text-white border-[#262640] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit {title}</DialogTitle>
          </DialogHeader>

          <EditContent
            title={title}
            fields={fields}
            currentValues={currentValues}
            onSave={onSave}
            onClose={onClose}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={() => onClose()}>
      <DrawerContent className="bg-[#1A1A2E] text-white">
        <DrawerHeader>
          <DrawerTitle className="text-xl">Edit {title}</DrawerTitle>
        </DrawerHeader>

        <div className="px-4">
          <EditContent
            title={title}
            fields={fields}
            currentValues={currentValues}
            onSave={onSave}
            onClose={onClose}
          />
        </div>

        <DrawerFooter className="mt-2">
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

// Main Profile Component
const Profile = () => {
  const [userData, setUserData] = useState({
    name: "Sophia Chris",
    title: "Senior Developer",
    location: "San Francisco, CA",
    bio: "Mathematician and Statistician | Expert in Pure Maths, Advance Maths, Probability-Statistics, Data Science",
    fullBio:
      "An AI expert with a strong background in mathematics and statistics, specializing in pure and advanced mathematics, probability, and data science. With deep analytical and problem-solving skills, they excel in developing statistical models, machine learning algorithms, and AI-driven solutions. Their expertise spans theoretical and applied mathematics, enabling them to extract meaningful insights from complex data.",
    linkedIn: "linkedin.com/sophia-chris-de",
    skills: [
      "Artificial Intelligence",
      "Mathematics",
      "Python",
      "Differential Equations",
      "Regression Analysis",
      "Graph Theory",
      "Data Analysis",
    ],
    languages: ["English", "Spanish", "French"],
    contact: "jane.doe@example.com",
    available: ["Teach", "Advice", "Speak", "Be Interviewed"],
    academics: ["Masters", "PhD"],
    projects: [
      {
        title: "Project Title Here",
        description: "Project description goes here",
        tags: ["Mathematics", "Python"],
      },
    ],
    featuredClients: ["Discord", "Meta", "Netflix", "Amazon"],
  });

  // State for controlling which popup is currently open
  const [activePopup, setActivePopup] = useState(null);

  // Define handlers for different popups
  const popupConfigs = {
    profile: {
      title: "Profile",
      fields: [
        { key: "name", type: "text", placeholder: "Full Name" },
        { key: "title", type: "text", placeholder: "Job Title" },
        { key: "location", type: "text", placeholder: "Location" },
        { key: "bio", type: "text", placeholder: "Short Bio" },
        { key: "linkedIn", type: "text", placeholder: "LinkedIn URL" },
      ],
    },
    bio: {
      title: "Bio",
      fields: [
        {
          key: "fullBio",
          type: "textarea",
          placeholder: "Enter your full bio here",
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
                <h1 className="text-2xl proxima-medium">{userData.name}</h1>
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
                  {userData.location}
                </span>
              </div>
              <div className="mt-2">
                <p className="proxima-medium">{userData.bio}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Linkedin className="w-5 h-5 fill-white" />
                <span className="mt-1 proxima-large">{userData.linkedIn}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 p-2">
            <Button className="w-full bg-gradient-to-r text-lg proxima from-[#7C2BD3] to-[#075AA8] text-white rounded-full transition-colors space-x-2">
              Share Profile
              <Share2 size={40} className="ml-2" />
            </Button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
                <h2 className="text-xl proxima">EXPERTISE</h2>
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
              {userData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
                >
                  {skill}
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
            <h2 className="text-xl proxima">BIO</h2>
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
            <p>
              {userData.fullBio.length > 200
                ? `${userData.fullBio.substring(0, 200)}... Read More`
                : userData.fullBio}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima">LANGUAGE</h2>
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
          {userData.languages.map((language, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
            >
              {language}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima">ACADEMICS</h2>
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
          {userData.academics.map((academic, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
            >
              {academic}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima">AVAILABLE TO</h2>
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
          {userData.available.map((aval, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
            >
              {aval}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima">FEATURED CLIENTS</h2>
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
          {userData.featuredClients.map((client, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-3xl bg-white/20 text-sm"
            >
              {client}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full max-w-2xl p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
            <h2 className="text-xl proxima">RECENT PROJECTS</h2>
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
          {userData.projects.map((project, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <h3 className="font-medium mb-2">{project.title}</h3>
              <p className="text-sm text-gray-300 mb-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tags?.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs px-2 py-1 bg-white/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Edit Modal/Drawer */}
      {activePopup && (
        <ResponsiveEdit
          isOpen={true}
          onClose={handleClosePopup}
          title={popupConfigs[activePopup].title}
          fields={popupConfigs[activePopup].fields}
          currentValues={userData}
          onSave={handleSaveData}
        />
      )}
    </div>
  );
};

export default Profile;
