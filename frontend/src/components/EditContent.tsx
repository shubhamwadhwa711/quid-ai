import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import CountrySearch from "@/components/CountrySearch";
import { useAppDispatch } from "@/store/store";
import { updateProfile } from "@/reducers/profile/profileSlice";
import get from "lodash/get";
import { Badge } from "@/components/ui/badge";
import SkillSearch from "@/components/SkillSearch";
import LanguageSearch from "@/components/LanguageSearch";
import AcademicsSearch from "@/components/academics/AcademicsSearch";
import { AvailableTo } from "@/components/AvailableToSelect";
import ClientSearch from "@/components/ClientSearch";
// EditContent component to be used in both Dialog and Drawer
const EditContent = ({ title, fields, currentValues, onSave, onClose }) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    currentValues?.country?.name
  );
  const [skills, setSkills] = useState<{ id: number; name: string }[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<[]>(currentValues.skill);
  const [selectedlanguages, setSelectedLanguages] = useState<
    { id: number; name: string }[]
  >(currentValues.language);
  const [selectedAvailable, setSelectedAvailable] = useState<
    { id: number; name: string }[]
  >(currentValues.available_to);
  const [selectedClients, setSelectedClients] = useState<[]>(
    currentValues.client
  );
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
    // if (formData.featuredClients) {
    //   updatedData.featured_clients = selectedClients.map((client) => client.id);
    //   dispatch(
    //     updateClient({
    //       profile: currentValues.id,
    //       formData: updatedData.featured_clients,
    //     })
    //   );
    //   return;
    // }
    if (formData.available) {
      updatedData.available_to = selectedAvailable.map((aval) => aval.id);
    }
    if (formData.skill) {
      updatedData.skill = selectedSkills.map((skill) => skill.id);
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
                  defaultAcademics={currentValues.education}
                />
              )}

              {field.key === "featuredClients" && (
                <ClientSearch
                  profileID={currentValues.id}
                  selectedClients={selectedClients}
                  onChange={(updatedClients) =>
                    setSelectedClients(updatedClients)
                  }
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

          {field.key != "featuredClients" && (
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
          )}
        </div>
      ))}
    </form>
  );
};

export default EditContent;
