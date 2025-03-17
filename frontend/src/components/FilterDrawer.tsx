import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search, SlidersHorizontal, SearchIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export default function FiltersDrawer({
  showFilters,
  setShowFilters,
  handleFilterToggle,
}: any) {
  const [open, setOpen] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState(["Mathematics"]);
  const [activeFilterCategory, setActiveFilterCategory] = useState("Expertise");

  // Filter categories with isSelected property
  const [filterCategories, setFilterCategories] = useState([
    { id: "Expertise", label: "Expertise", isSelected: true },
    { id: "Academics", label: "Academics", isSelected: false },
    { id: "Country", label: "Country", isSelected: false },
    { id: "Clients", label: "Clients", isSelected: false },
    { id: "Languages", label: "Languages", isSelected: false },
    { id: "Available To", label: "Available To", isSelected: false },
  ]);

  const [selectedFilters, setSelectedFilters] = useState({
    skills: [],
    location: "",
    specialization: "",
  });

  const solutions = [
    {
      id: 1,
      label: "Healthcare & Pharma",
      image:
        "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/xbnlyaxtqa1lqdlsag3u.png",
    },
    {
      id: 2,
      label: "Hospitality Management",
      image:
        "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/zfa2mfxyhuqmd4tfrno8.png",
    },
    {
      id: 3,
      label: "Banks & Fintech",
      image:
        "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/ebvdoqqr1boilamfsqwn.png",
    },
    {
      id: 4,
      label: "Marketing Experts",
      image:
        "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/qmkwqvruzkvpgsz9pbnz.png",
    },
    {
      id: 5,
      label: "Corporate World",
      image:
        "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/oachy0hnhep4hly7kyfe.png",
    },
    {
      id: 6,
      label: "Events & Training",
      image:
        "https://res.cloudinary.com/dgz1duuwu/image/upload/v1740032757/quidAi/rx5tv3bg7ow1jwyhdp1v.png",
    },
  ];

  // Sample talent data (to replace the undefined talentData)
  const talentData = [
    {
      id: 1,
      name: "John Doe",
      skills: {
        technical: ["Python", "Data Science"],
        soft: ["Communication", "Leadership"],
      },
      location: "New York",
    },
    {
      id: 2,
      name: "Jane Smith",
      skills: {
        technical: ["JavaScript", "React"],
        soft: ["Teamwork", "Problem Solving"],
      },
      location: "London",
    },
  ];

  // Specialization sectors
  const sectors = [
    {
      id: "healthcare",
      label: "Healthcare & Pharma",
      icon: "❤️",
      color: "bg-purple-500",
    },
    {
      id: "hospitality",
      label: "Hospitality Management",
      icon: "🏨",
      color: "bg-gray-700",
    },
    {
      id: "finance",
      label: "Banks & Fintech",
      icon: "💰",
      color: "bg-gray-700",
    },
  ];

  // Expertise options
  const expertiseOptions = [
    { id: "ai", label: "Artificial Intelligence" },
    { id: "math", label: "Mathematics" },
    { id: "python", label: "Python" },
    { id: "datascience", label: "Data Science" },
    { id: "analytics", label: "Data Analytics" },
    { id: "datamanagement", label: "Data Management" },
    { id: "accountant", label: "Accountant" },
    { id: "socialmedia", label: "Social Media Manager" },
  ];

  const toggleExpertise = (id) => {
    if (selectedExpertise.includes(id)) {
      setSelectedExpertise(selectedExpertise.filter((item) => item !== id));
    } else {
      setSelectedExpertise([...selectedExpertise, id]);
    }
  };

  const handleLocationChange = (location) => {
    setSelectedFilters({
      ...selectedFilters,
      location,
    });
  };

  // Extract all unique skills from talent data
  const getAllSkills = () => {
    const allSkills = new Set();
    talentData.forEach((talent) => {
      Object.values(talent.skills)
        .flat()
        .forEach((skill) => {
          allSkills.add(skill);
        });
    });
    return Array.from(allSkills);
  };

  // Extract all unique locations
  const getAllLocations = () => {
    const locations = new Set();
    talentData.forEach((talent) => {
      locations.add(talent.location);
    });
    return Array.from(locations);
  };

  const handleRoleChange = (specialization) => {
    setSelectedFilters({
      ...selectedFilters,
      specialization,
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      skills: [],
      location: "",
      specialization: "",
    });
    setSelectedExpertise([]);
  };

  const handleSkillSelect = (skill) => {
    if (selectedFilters.skills.includes(skill)) {
      setSelectedFilters({
        ...selectedFilters,
        skills: selectedFilters.skills.filter((s) => s !== skill),
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        skills: [...selectedFilters.skills, skill],
      });
    }
  };

  // Add the missing handleFilterSelect function
  const handleFilterSelect = (filterId) => {
    setFilterCategories(
      filterCategories.map((filter) => ({
        ...filter,
        isSelected: filter.id === filterId,
      }))
    );
    setActiveFilterCategory(filterId);
  };

  return (
    <div className="w-full bg-white/5 backdrop-blur-md rounded-2xl  px-2 py-2 transition-all duration-300 border border-white/10">
      <div className="flex justify-between  items-center mb-4">
        <h3 className="text-lg proxima-bold text-center text-white">Filters</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="text-xs text-gray-300 hover:text-white"
            onClick={clearFilters}
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            className="p-1 hover:bg-gray-700/20 rounded-full"
            onClick={handleFilterToggle}
          >
            <X className="h-4 w-4 text-gray-300" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <>
          <div className="space-y-2 ">
            <label className="text-sm proxima-bold text-gray-300">
              Specialization Sector
            </label>

            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {solutions.map((solution) => (
                <Card
                  key={solution.id}
                  className="bg-white/10 border-[#545C6C] flex flex-col items-center justify-center px-6 h-28 w-28"
                >
                  <img
                    src={solution.image}
                    alt={solution.label}
                    className="w-8 h-8 object-cover"
                  />
                  <CardHeader className="p-2">
                    <CardTitle className="text-white text-xs font-medium break-words text-center leading-tight line-clamp-3">
                      {solution.label}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 my-4">
            <div className="col-span-4 flex flex-col items-center">
              <h1 className="mx-2 text-sm text-center proxima-bold text-white">
                Filters By
              </h1>
              {filterCategories.map((filter, index) => (
                <div key={index} className="text-center w-full">
                  <Badge
                    variant="none"
                    className={`w-28 p-2 rounded-3xl m-1 border-none proxima-bold flex justify-center ${
                      filter.isSelected
                        ? "bg-gradient-to-r from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8] text-white"
                        : "bg-[#545C6C] text-white"
                    }`}
                    onClick={() => handleFilterSelect(filter.id)}
                  >
                    {filter.label}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="col-span-8 ml-2 my-4  ">
              <label className="relative flex items-center gap-3 px-4 py-2 rounded-3xl">
                <SearchIcon className="absolute left- text-gray-400 mx-2" />
                <Input
                  type="text"
                  placeholder="Search Country"
                  className="pl-10 pr-4 py-2 w-full outline-none border bg-transparent focus:ring-2 focus:ring-blue-500 rounded-3xl"
                />
              </label>
              <div>
                {expertiseOptions.map((Expertise) => {
                  const isChecked = selectedExpertise.includes(Expertise.label);
                  return (
                    <div
                      key={Expertise.id}
                      className="flex items-center gap-2 p-2 rounded-md"
                      onClick={() => toggleExpertise(Expertise.label)}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => toggleExpertise(Expertise.label)}
                        className={`${isChecked ? "" : ""}`}
                      />
                      <span className="text-gray-400 text-xs ">
                        {Expertise.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button className="rounded-3xl px-6 py-2 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8]">
              Apply Filters
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
