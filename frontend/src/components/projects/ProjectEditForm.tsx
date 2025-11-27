import { useCallback, useEffect, useState, useRef } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Calendar, Edit, Plus, PlusIcon } from "lucide-react";

import { X, Image as ImageIcon, Check } from "lucide-react";

import { NameIcon } from "../icons/NameIcon";
import { BioIcon } from "../icons/BioIcon";
import { BulbIcon } from "../icons/BulbIcon";
import {
  Project,
  removeProject,
  updateProject,
} from "@/reducers/project/projectSlice";
import { useAppDispatch } from "@/store/store";
import { fetchProfile } from "@/reducers/profile/profileSlice";
import { Badge } from "../ui/badge";
import {
  postExpertise,
  fetchExpertise,
} from "@/reducers/filter/expertise/expertiseSlice";

type ProjectEditFormProps = {
  initialProject: Project;
  defaultOpen?: boolean;
};

const PROJECT_FIELDS = [
  {
    key: "projectTitle",
    type: "text",
    placeholder: "Project Title",
    accessor: "title",
    icon: <NameIcon />,
    label: "Project Title",
  },
  {
    key: "projectDescription",
    type: "textarea",
    placeholder: "Project Description",
    accessor: "projectDescription",
    icon: <BioIcon />,
    label: "Project Description",
  },
  {
    key: "projectDate",
    type: "date",
    placeholder: "Duration",
    accessor: "projectDate",
    icon: <Calendar />,
    label: "Duration",
  },
  {
    key: "projectTags",
    type: "tags",
    label: "Tag",
    accessor: "projectTags",
    icon: <BulbIcon />,
  },
];

export const ProjectEditForm = ({
  initialProject,
  defaultOpen = false,
}: ProjectEditFormProps) => {
  const [isOpen, onOpenChange] = useState(defaultOpen);
  const [formData, setFormData] = useState({
    projectTitle: initialProject.title || "",
    projectDescription: initialProject.description || "",
    projectTags: initialProject.tag || [],
    projectStartDate: initialProject.start_date || null,
    projectEndDate: initialProject.end_date || null,
    profile: initialProject.profile,
  });
  const [projectFile, setProjectFile] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const dispatch = useAppDispatch();

  // Track if we have a pending debounce timer
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Ref for the tag input element for keyboard navigation
  const tagInputRef = useRef(null);

  // Fetch initial tag suggestions when the form opens
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchExpertise())
        .unwrap()
        .then((response) => {
          // Assuming response is an array of tags
          setTagSuggestions(response);
        })
        .catch((error) => {
          console.error("Error fetching tag suggestions:", error);
        });
    }
  }, [isOpen, dispatch]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTagAdd = useCallback(
    (tagToAdd = null) => {
      // If a specific tag is passed, use it; otherwise use the input value
      const tagValue = tagToAdd || tagInput.trim();

      if (!tagValue) return;

      // If it's an object with name property, use it directly
      const tagName = typeof tagValue === "object" ? tagValue.name : tagValue;

      // Check if tag already exists in the project tags
      const tagExists = formData.projectTags.some(
        (tag) => tag.name?.toLowerCase() === tagName.toLowerCase()
      );

      if (tagExists) {
        setTagInput("");
        setShowSuggestions(false);
        return;
      }

      // Clear any existing debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }

      const newTag =
        typeof tagValue === "object" ? tagValue : { name: tagValue.trim() };

      // If the tag already has an ID (from suggestions), add it directly
      if (newTag.id) {
        setFormData((prev) => ({
          ...prev,
          projectTags: [...(prev.projectTags || []), newTag],
        }));
        setTagInput("");
        setShowSuggestions(false);
        return;
      }

      // Otherwise, create a new tag via API
      dispatch(postExpertise(newTag))
        .unwrap()
        .then((response) => {
          // If the API returns the created tag with an ID, use that
          const tagWithId = response?.id ? response : newTag;

          setFormData((prev) => ({
            ...prev,
            projectTags: [...(prev.projectTags || []), tagWithId],
          }));

          // Refresh suggestions after adding a new tag
          dispatch(fetchExpertise())
            .unwrap()
            .then((response) => {
              setTagSuggestions(response);
            });
        })
        .catch((error) => {
          console.error("Error adding tag:", error);
        });

      setTagInput("");
      setShowSuggestions(false);
    },
    [tagInput, dispatch, formData.projectTags]
  );

  // Handle tag input keydown events (for Enter key support and navigation)
  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTagAdd();
    } else if (
      e.key === "ArrowDown" &&
      showSuggestions &&
      tagSuggestions.length > 0
    ) {
      // Navigate to suggestions
      const suggestionElements = document.querySelectorAll(".tag-suggestion");
      if (suggestionElements.length > 0) {
        (suggestionElements[0] as HTMLElement).focus();
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Handle suggestion item keydown for keyboard navigation
  const handleSuggestionKeyDown = (e, tag, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTagAdd(tag);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const suggestionElements = document.querySelectorAll(".tag-suggestion");
      const nextIndex = (index + 1) % suggestionElements.length;
      (suggestionElements[nextIndex] as HTMLElement).focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const suggestionElements = document.querySelectorAll(".tag-suggestion");
      const prevIndex =
        (index - 1 + suggestionElements.length) % suggestionElements.length;
      if (index === 0) {
        // Go back to input when at first item
        tagInputRef.current?.focus();
      } else {
        (suggestionElements[prevIndex] as HTMLElement).focus();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setShowSuggestions(false);
      tagInputRef.current?.focus();
    }
  };

  // Debounced version of tag input change that will fetch suggestions
  const debouncedTagInputChange = (e) => {
    const newValue = e.target.value;
    setTagInput(newValue);

    // Always show suggestions panel when typing
    if (newValue.trim() !== "") {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      return;
    }

    // Clear previous timeout
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set loading state
    setIsLoadingSuggestions(true);

    // Set new timeout
    debounceTimerRef.current = setTimeout(() => {
      // Fetch suggestions based on the input
      dispatch(fetchExpertise(newValue.trim()))
        .unwrap()
        .then((response) => {
          // Filter suggestions to exclude tags already added to the project
          const existingTagNames = formData.projectTags.map((tag) =>
            tag.name?.toLowerCase()
          );

          const filteredSuggestions = response.filter(
            (tag) => !existingTagNames.includes(tag.name?.toLowerCase())
          );

          setTagSuggestions(filteredSuggestions);
          setIsLoadingSuggestions(false);
        })
        .catch((error) => {
          console.error("Error fetching tag suggestions:", error);
          setIsLoadingSuggestions(false);
        });
    }, 300); // 300ms debounce delay for suggestions
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = formData.projectTags.filter(
      (tag) => tag.id !== tagToRemove.id
    );

    setFormData((prev) => ({
      ...prev,
      projectTags: updatedTags,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProjectFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("title", formData.projectTitle);
    submissionData.append("profile", formData.profile);
    submissionData.append("description", formData.projectDescription);
    submissionData.append("start_date", formData.projectStartDate);
    submissionData.append("end_date", formData.projectEndDate);

    formData.projectTags.forEach((tag) => {
      submissionData.append("tag", tag.id);
    });

    if (projectFile) {
      submissionData.append("image", projectFile);
    }

    dispatch(
      updateProject({
        pid: initialProject.profile,
        prid: initialProject.id,
        formData: submissionData,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(fetchProfile());
        onOpenChange(false);
      })
      .catch((e) => console.error(e));
  };

  const handleRemove = useCallback(() => {
    dispatch(
      removeProject({ pid: initialProject.profile, prid: initialProject.id })
    )
      .unwrap()
      .then(() => {
        dispatch(fetchProfile());
        onOpenChange(false);
      })
      .catch((error) => {
        console.error("Error removing project:", error);
      });
  }, [initialProject, dispatch]);

  const resetFormOnClose = useCallback(() => {
    if (!isOpen) {
      setFormData({
        projectTitle: initialProject.title || "",
        projectDescription: initialProject.description || "",
        projectTags: initialProject.tag || [],
        projectStartDate: initialProject.start_date || null,
        projectEndDate: initialProject.end_date || null,
        profile: initialProject.profile,
      });
      setProjectFile(null);
      setTagInput("");
      setShowSuggestions(false);

      // Clear any pending debounce timer when form closes
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
    }
  }, [initialProject, isOpen]);

  // Click outside handler for suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showSuggestions &&
        tagInputRef.current &&
        !tagInputRef.current.contains(event.target) &&
        !event.target.closest(".tag-suggestions-container")
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuggestions]);

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    resetFormOnClose();
  }, [resetFormOnClose]);

  // Filter suggestions based on current input
  const filteredSuggestions =
    tagInput.trim() === ""
      ? tagSuggestions
      : tagSuggestions.filter((tag) =>
        tag.name.toLowerCase().includes(tagInput.toLowerCase())
      );

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild className="absolute top-1 right-1">
        <Button
          size="icon"
          variant="default"
          className="p-1 h-8 w-8 rounded-full"
        >
          <Edit size={16} />
        </Button>
      </DrawerTrigger>
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 px-4 overflow-auto"
        >
          {PROJECT_FIELDS.map((field) => (
            <div key={field.key} className="">
              {field.type === "text" && (
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-3 flex items-center text-white">
                    {field.icon}
                  </div>
                  <input
                    type="text"
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full p-2 pl-10 bg-[#262640] text-white rounded-3xl border-none focus:ring-2 focus:ring-[#7C2BD3]"
                  />
                </div>
              )}

              {field.type === "date" && (
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <h1>
                      Start Date <span className="text-red-500">*</span>
                    </h1>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center text-white">
                        {field.icon}
                      </div>
                      <input
                        required
                        type="date"
                        value={formData["projectStartDate"] || ""}
                        onChange={(e) =>
                          handleChange("projectStartDate", e.target.value)
                        }
                        placeholder={"Start Date"}
                        className="w-full p-2 pl-10 bg-[#262640] text-white rounded-3xl border-none focus:ring-2 focus:ring-[#7C2BD3]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1>
                      End Date <span className="text-red-500">*</span>
                    </h1>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center text-white">
                        {field.icon}
                      </div>
                      <input
                        required
                        type="date"
                        value={formData["projectEndDate"] || ""}
                        onChange={(e) =>
                          handleChange("projectEndDate", e.target.value)
                        }
                        placeholder={"End Date"}
                        className="w-full p-2 pl-10 bg-[#262640] text-white rounded-3xl border-none focus:ring-2 focus:ring-[#7C2BD3]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {field.type === "textarea" && (
                <div className="relative w-full flex">
                  <div className="absolute inset-y-0 left-3 flex items-start pt-2 text-white">
                    {field.icon}
                  </div>
                  <textarea
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full p-2 pl-10 bg-[#262640] text-white rounded-3xl h-28 border-none focus:ring-2 focus:ring-[#7C2BD3]"
                  />
                </div>
              )}

              {field.type === "tags" && (
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-3 flex items-center text-white">
                    {field.icon}
                  </div>
                  <input
                    ref={tagInputRef}
                    type="text"
                    value={tagInput}
                    onChange={debouncedTagInputChange}
                    onKeyDown={handleTagInputKeyDown}
                    onFocus={() =>
                      tagInput.trim() !== "" && setShowSuggestions(true)
                    }
                    placeholder={`Add ${field.label}`}
                    className="w-full p-2 pl-10 bg-[#262640] text-white rounded-3xl border-none focus:ring-2 focus:ring-[#7C2BD3]"
                    autoComplete="off"
                  />
                  <div className="absolute inset-y-0 right-1 flex items-center text-white">
                    <Button
                      type="button"
                      onClick={() => handleTagAdd()}
                      className="bg-[#7C2BD3] text-white hover:bg-[#6620B0] h-8 w-8 rounded-full"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 1V15M1 8H15"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </div>

                  {/* Tag Suggestions Dropdown */}
                  {showSuggestions && (
                    <div className="tag-suggestions-container absolute left-0 right-0 mt-1 bg-[#1E1E3F] z-50 rounded-md shadow-lg max-h-40 overflow-y-auto">
                      {isLoadingSuggestions ? (
                        <div className="p-2 text-center text-sm text-gray-300">
                          Loading suggestions...
                        </div>
                      ) : filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((tag, index) => (
                          <div
                            key={tag.id || `suggestion-${index}`}
                            onClick={() => handleTagAdd(tag)}
                            onKeyDown={(e) =>
                              handleSuggestionKeyDown(e, tag, index)
                            }
                            className="tag-suggestion p-2 hover:bg-[#2D2D5D] cursor-pointer flex items-center justify-between text-sm"
                            tabIndex={0}
                            role="option"
                            aria-selected="false"
                          >
                            <span>{tag.name}</span>
                            <Check
                              size={14}
                              className="opacity-0 group-hover:opacity-100"
                            />
                          </div>
                        ))
                      ) : tagInput.trim() !== "" ? (
                        <div className="p-2 text-center text-sm text-gray-300">
                          No matching tags. Press Enter to add "{tagInput}".
                        </div>
                      ) : (
                        <div className="p-2 text-center text-sm text-gray-300">
                          Start typing to see suggestions
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {formData.projectTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.projectTags.map((item) => (
                <Badge
                  key={item.id || item.name}
                  variant="none"
                  className="border-none text-xs rounded-3xl bg-white/30 flex items-center"
                >
                  <span>{item.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleTagRemove(item)}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X size={10} />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          <div className="mb-4">
            <input
              type="file"
              id="projectImageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="projectImageUpload"
              className="flex items-center h-24 justify-center w-full p-4 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-purple-500"
            >
              {projectFile ? (
                <img
                  src={URL.createObjectURL(projectFile)}
                  alt="Project"
                  className="max-h-20 w-full object-cover rounded-lg"
                />
              ) : initialProject.image ? (
                <img
                  src={initialProject.image}
                  alt="Project"
                  className="max-h-20 w-full object-cover rounded-lg"
                />
              ) : (
                <ImageIcon size={40} />
              )}
            </label>
          </div>

          <div className="flex justify-center w-full">
            <Button
              type="submit"
              className="w-11/12 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] text-white rounded-full"
            >
              Update Project
            </Button>
          </div>
          <div className="flex justify-center w-full mb-4">
            <Button
              type="button"
              variant={"ghost"}
              onClick={handleRemove}
              className="text-gray-500 rounded-full py-0 h-auto"
            >
              Remove Project
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
