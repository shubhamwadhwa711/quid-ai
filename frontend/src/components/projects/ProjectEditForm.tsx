import { useCallback, useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Calendar, Edit } from "lucide-react";

import { X, Image as ImageIcon } from "lucide-react";

import { NameIcon } from "../icons/NameIcon";
import { BioIcon } from "../icons/BioIcon";
import { BulbIcon } from "../icons/BulbIcon";
import { Project, updateProject } from "@/reducers/project/projectSlice";
import { useAppDispatch } from "@/store/store";
import { fetchProfile } from "@/reducers/profile/profileSlice";
import { Badge } from "../ui/badge";

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
    key: "projectStartDate",
    type: "date",
    placeholder: "Start Date",
    accessor: "projectStartDate",
    icon: <Calendar />,
    label: "Start Date",
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
    profile: initialProject.profile,
  });
  const [projectFile, setProjectFile] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTagAdd = () => {
    if (!tagInput.trim()) return;

    const newTag = {
      id: Date.now(),
      name: tagInput.trim(),
    };

    setFormData((prev) => ({
      ...prev,
      projectTags: [...(prev.projectTags || []), newTag],
    }));

    setTagInput("");
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
  const resetFormOnClose = useCallback(() => {
    if (!isOpen) {
      setFormData({
        projectTitle: initialProject.title || "",
        projectDescription: initialProject.description || "",
        projectTags: initialProject.tag || [],
        projectStartDate: initialProject.start_date || null,
        profile: initialProject.profile,
      });
      setProjectFile(null);
    }
  }, [initialProject, open]);

  useEffect(() => {
    resetFormOnClose();
  }, [initialProject, resetFormOnClose]);

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger className="absolute top-1 right-1">
        <Button
          size="icon"
          variant="ghost"
          className="bg-white p-1h-8 w-8 rounded-full"
          onClick={() => onOpenChange(true)}
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
        <form onSubmit={handleSubmit} className="space-y-4 px-4">
          {PROJECT_FIELDS.map((field) => (
            <div key={field.key} className="space-y-2">
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
                <div className="space-y-2">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-3 flex items-center text-white">
                      {field.icon}
                    </div>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder={`Add ${field.label}`}
                      className="w-full p-2 pl-10 bg-[#262640] text-white rounded-3xl border-none focus:ring-2 focus:ring-[#7C2BD3]"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={handleTagAdd}
                    className="bg-[#7C2BD3] text-white hover:bg-[#6620B0]"
                  >
                    Add
                  </Button>

                  <div className="flex flex-wrap gap-2">
                    {formData.projectTags.map((item) => (
                      <Badge
                        key={item.id}
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
                </div>
              )}
            </div>
          ))}

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

          <div className="fixed bottom-1 left-1/2 transform -translate-x-1/2 w-full">
            <Button
              type="submit"
              className="w-11/12 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] text-white rounded-full"
            >
              Update Project
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
