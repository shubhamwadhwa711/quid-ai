import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Image as ImageIcon } from "lucide-react";

import { NameIcon } from "./icons/NameIcon";
import { BioIcon } from "./icons/BioIcon";
import { BulbIcon } from "./icons/BulbIcon";
import { updateProject } from "@/reducers/project/projectSlice";
import { useAppDispatch } from "@/store/store";

const ProjectEditForm = ({ project, onUpdate, currentValues }) => {
  const [formData, setFormData] = useState({
    projectTitle: project.title || "",
    projectDescription: project.description || "",
    projectTags: project.tag || [],
  });
  const [projectImage, setProjectImage] = useState(project.image || null);
  const [projectFile, setProjectFile] = useState<File>(null);
  const [tagInput, setTagInput] = useState("");
  const [currentField, setCurrentField] = useState(null);
  const dispatch = useAppDispatch();

  const projectFields = [
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
      key: "projectTags",
      type: "tags",
      label: "Tag",
      accessor: "projectTags",
      icon: <BulbIcon />,
    },
  ];

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

    const updatedProject = {
      ...project,
      tag: [...(formData.projectTags || []), newTag],
    };

    setFormData((prev) => ({
      ...prev,
      projectTags: updatedProject.tag,
    }));

    onUpdate(updatedProject);
    setTagInput("");
    setCurrentField(null);
  };

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = formData.projectTags.filter(
      (tag) => tag.id !== tagToRemove.id
    );

    setFormData((prev) => ({
      ...prev,
      projectTags: updatedTags,
    }));

    onUpdate({
      ...project,
      tag: updatedTags,
    });
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
    submissionData.append("description", formData.projectDescription);

    formData.projectTags.forEach((tag) => {
      submissionData.append("tag", tag.id);
    });

    if (projectFile) {
      submissionData.append("image", projectFile);
    }
    console.log("submissionData", submissionData);

    dispatch(
      updateProject({
        pid: currentValues.id,
        prid: project.id,
        formData: submissionData,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-4">
      {projectFields.map((field) => (
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
          {projectImage ? (
            <img
              src={projectImage}
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
  );
};

export default ProjectEditForm;
