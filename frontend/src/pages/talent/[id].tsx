import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, MapPin, Pencil, Share2, X } from "lucide-react";
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
import { fetchProfile } from "@/reducers/profile/profileSlice";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import ConnectDrawer from "@/components/ConnectDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
const Talent = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.Profile);
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  console.log("profile", profile[0]);
  const newprofile = profile[0];
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

  const [showConnectForm, setShowConnectForm] = useState();

  return (
    <div className="text-white flex flex-col items-center justify-center p-2">
      {/* Main profile card */}
      <div className="w-full rounded-xl">
        {/* Cover photo area */}
        <div className="h-32"></div>

        {/* Profile content */}
        <div className="">
          {/* Profile header with image on left, name/location on right */}
          <div className="flex flex-row -mt-16">
            {/* Profile image (left) */}
            <div className="h-32 w-32 flex-shrink-0 rounded-full">
              <Avatar className="h-full w-full">
                <AvatarImage src={profile[0]?.image} />
                <AvatarFallback>{profile[0]?.user?.username}</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-4">
              <div className="flex justify-between">
                <h1 className="text-2xl proxima-medium">
                  {profile[0]?.user?.username}
                </h1>
                {/* <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full"
                ></Button> */}
              </div>
              <div className="flex items-center mt-1">
                <MapPin size={16} className="mr-1" />
                <span className="">{profile[0]?.location}</span>
              </div>
              <div className="mt-2 w-full pr-2">
                <p className=" w-full text-xs font-semibold">
                  {profile[0]?.headline}
                </p>
              </div>
              <div className=" absolute top-24 right-0  flex justify-center">
                <img
                  src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1740037507/quidAi/sugtwxhrkajxvvl1bhms.png"
                  alt="Spiral Background"
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="">
                <div className="flex  items-center gap-2 ">
                  <img src="/Icons/linkdein.png" alt="" />
                  <span className=" text-xs mt-2 font-bold  text-nowrap">
                    {profile[0]?.linkedin_url.slice(7)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 mt-4">
            <Button
              onClick={() => setShowConnectForm(true)}
              className="w-full bg-gradient-to-r text-lg proxima-bold from-[#7C2BD3] to-[#075AA8] text-white rounded-full transition-colors space-x-2"
            >
              Connect
              {/* <Share2 size={40} className="ml-2" /> */}
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
              ></Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile[0]?.skill.map((s, index) => (
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
          ></Button>
        </div>
        <div className="space-y-4">
          <div className="pl-4">
            <p>
              {profile[0]?.summary?.length > 200
                ? `${profile[0]?.summary?.substring(0, 200)}... Read More`
                : profile[0]?.summary}
            </p>
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
          ></Button>
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
            <h2 className="text-xl proxima-regular">ACADEMICS</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
          ></Button>
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
            <h2 className="text-xl proxima-regular">AVAILABLE TO</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
          ></Button>
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
            <h2 className="text-xl proxima-regular">FEATURED CLIENTS</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
          ></Button>
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
            <h2 className="text-xl proxima-regular">RECENT PROJECTS</h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full"
          ></Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {userData.projects.map((project, index) => (
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

              <div className="h-1/5 flex  flex-col justify-between p-4">
                <CardTitle className="text-sm text-start text-white proxima-FAQ">
                  {project.title}
                </CardTitle>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Responsive Edit Modal/Drawer */}
      {/* {activePopup && (
        <ResponsiveEdit
          isOpen={true}
          onClose={handleClosePopup}
          title={popupConfigs[activePopup].title}
          fields={popupConfigs[activePopup].fields}
          currentValues={userData}
          onSave={handleSaveData}
        />
      )} */}
      {showConnectForm && (
        <ConnectDrawer
          talentId={profile[0].id}
          showConnectForm={showConnectForm}
          setShowConnectForm={setShowConnectForm}
        />
      )}
    </div>
  );
};

export default Talent;
