import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
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
import React from "react";

interface EditField {
  key: string;
  type: "text" | "textarea" | "tags";
  label?: string;
  placeholder?: string;
  accessor?: string;
  icon?: React.ReactNode;
}

interface Skill {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
}

interface EditContentProps {
  title: string;
  fields: EditField[];
  currentValues: any;
  onSave: (formData: Record<string, any>) => void;
  onClose: () => void;
}

// EditContent component to be used in both Dialog and Drawer
const EditContent = ({ title, fields, currentValues, onSave, onClose }: EditContentProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    currentValues?.country
  );
  const [skills, setSkills] = useState<{ id: number; name: string }[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>(
    currentValues?.skill || []
  );
  const [selectedlanguages, setSelectedLanguages] = useState<Skill[]>(
    currentValues?.language || []
  );
  const [selectedAvailable, setSelectedAvailable] = useState<Skill[]>(
    currentValues?.available_to || []
  );
  const [selectedClients, setSelectedClients] = useState<Skill[]>(
    currentValues?.client || []
  );
  console.log("currentValues", currentValues)
  const [fullName, setFullName] = useState<string | null>(null);
  // console.log("CurrentValues", currentValues);
  // console.log(title, fields, currentValues);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [tagInput, setTagInput] = useState("");
  const [currentField, setCurrentField] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  // Initialize form data when currentValues changes
  useEffect(() => {
    const initialData: Record<string, any> = {};
    fields.forEach((field) => {
      if (field.key === "fullName") {
        // Combine first and last name for the fullName field
        initialData[field.key] = `${currentValues?.user?.first_name || ""} ${currentValues?.user?.last_name || ""
          }`.trim();
      } else if (field.type === "tags") {
        // For tag fields, use the array from currentValues or create an empty array
        // console.log("currentValues", currentValues);
        // console.log("field.key", field.key);
        // console.log("currentValues[field.key]", currentValues[field.key]);
        initialData[field.key] = currentValues[field.key]
          ? currentValues[field.key]?.map((item: any) => item.name || item.degree)
          : [];
      } else {
        // For text/textarea fields, use the value directly
        console.log("currentValues.user", currentValues?.user);
        console.log("field.accessor", get(currentValues, field.accessor, ""));
        initialData[field.key] = get(currentValues, field.accessor, "");
      }
    });
    console.log("initialData", initialData);
    setFormData(initialData);
  }, [currentValues, fields]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleTagAdd = (field: string) => {
    if (!tagInput.trim()) return;

    const newTags = [...((formData as any)[field] || []), tagInput.trim()];
    setFormData((prev) => ({ ...prev, [field]: newTags }));
    setTagInput("");
    setCurrentField(null);
  };

  const handleTagRemove = (field: string, index: number) => {
    const newTags = [...(formData as any)[field]];
    newTags.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: newTags }));
  };
  const handleSelectSkill = (skill: Skill) => {
    console.log("handleSelectSkill", skill);
    setSelectedSkills((prev) => [...prev, skill]);
  };
  const handleSelectClient = (client: Skill) => {
    console.log("handleSelectClient", client);
    setSelectedClients((prev) => [...prev, client]);
  };
  const handleRemoveSkill = (skillId: number) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill.id !== skillId));
  };
  const handleRemoveClient = (clientId: number) => {
    setSelectedClients((prev) =>
      prev.filter((client) => client.id !== clientId)
    );
  };
  const handleSelectLanguage = (language: Skill) => {
    console.log("handleSelectLanguage", language);
    setSelectedLanguages((prev) => [...prev, language]);
  };

  const handleRemoveLanguage = (languageId: number) => {
    console.log("handleRemoveLanguage", languageId);
    setSelectedLanguages((prev) =>
      prev.filter((lang) => lang.id !== languageId)
    );
  };

  const handleAvailableOnChange = (availability: Skill[]) => {
    console.log("availability", availability);
    setSelectedAvailable(availability);
  };
  const handleSubmit = (e: React.FormEvent) => {
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
    if ((formData as any).available) {
      updatedData.available_to = selectedAvailable.map((aval) => aval.id);
    }
    if ((formData as any).skill) {
      updatedData.skill = selectedSkills.map((skill) => skill.id);
    }
    // Ensure country is passed as an ID

    if ((formData as any).country || (formData as any).country === "") {
      updatedData.country = (selectedCountry as any)?.id;
    }
    if ((formData as any).languages) {
      // selectedlanguages.map((lang) => lang.id)
      updatedData.language = selectedlanguages.map((lang) => lang.id);
    }
    // Split fullName into firstName and lastName
    if ((formData as any).fullName) {
      const nameParts = (formData as any).fullName.trim().split(" ");
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
              onChange={(country: any) => {
                setSelectedCountry(country);
              }}
              icon={field.icon as any}
            />
          ) : (
            field.type === "text" && (
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-3 flex items-center text-white">
                  {field.icon}
                </div>
                <input
                  type="text"
                  value={(formData as any)[field.key] || ""}
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
                value={(formData as any)[field.key] || ""}
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
                  selectedSkills={selectedSkills as any}
                  onSelectSkill={handleSelectSkill as any}
                  onRemoveSkill={handleRemoveSkill}
                />
              )}

              {field.key === "academics" && (
                <AcademicsSearch
                  profileID={currentValues?.id}
                  defaultAcademics={currentValues?.education}
                />
              )}

              {field.key === "featuredClients" && (
                <ClientSearch
                  profileID={currentValues?.id}
                  selectedClients={selectedClients}
                  onSelectClients={handleSelectClient}
                  onRemoveClient={handleRemoveClient}
                />
              )}

              {field.key === "languages" && (
                <LanguageSearch
                  selectedLanguages={selectedlanguages as any}
                  onSelectLanguage={handleSelectLanguage as any}
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
              {currentValues?.projects?.flatMap((project: any) =>
                project.tag.map((t: any) => (
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
              <ArrowRight className="w-6 h-6" />
            </Button>
          )}
        </div>
      ))}
    </form>
  );
};

export default EditContent;
