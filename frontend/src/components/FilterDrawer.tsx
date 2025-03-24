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

export default function FilterDrawer({
  showFilters,
  setShowFilters,
  handleFilterToggle,
  setSelectedFilters,
  initialFilter,
}: any) {
  const [open, setOpen] = useState(false);
  const [activeFilterCategory, setActiveFilterCategory] = useState(
    initialFilter ?? "Expertise"
  );
  const [selectedSector, setSelectedSector] = useState<string>("Healthcare & Pharma");
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedAcademics, setSelectedAcademics] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  console.log("initialFilter", initialFilter);
  console.log("showFilters", showFilters);
  // Filter categories with isSelected property
  const [filterCategories, setFilterCategories] = useState([
    { id: "Expertise", label: "Expertise" },
    { id: "Academics", label: "Academics" },
    { id: "Country", label: "Country" },
    { id: "Clients", label: "Clients" },
    { id: "Languages", label: "Languages" },
    { id: "Available To", label: "Available To" },
  ]);

  // Solutions data
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

  // Sample talent data
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

  // Filter options
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

  const academicOptions = [
    { id: "phd", label: "PhD" },
    { id: "masters", label: "Masters" },
    { id: "bachelors", label: "Bachelors" },
    { id: "diploma", label: "Diploma" },
    { id: "certificate", label: "Certificate" },
  ];

  const countries = [
    "USA",
    "Canada",
    "UK",
    "Germany",
    "France",
    "Japan",
    "Australia",
    "India",
    "China",
    "Brazil",
    "Spain",
    "Italy",
  ];

  const clientsOptions = [
    { id: "startup", label: "Startups" },
    { id: "enterprise", label: "Enterprise" },
    { id: "govt", label: "Government" },
    { id: "nonprofit", label: "Non-profit" },
    { id: "education", label: "Educational Institutions" },
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Hindi",
    "Arabic",
    "Russian",
    "Portuguese",
    "Japanese",
  ];

  const availabilityOptions = [
    { id: "fulltime", label: "Full-time" },
    { id: "parttime", label: "Part-time" },
    { id: "contract", label: "Contract" },
    { id: "freelance", label: "Freelance" },
    { id: "remote", label: "Remote" },
    { id: "onsite", label: "On-site" },
  ];

  const toggleExpertise = (label) => {
    if (selectedExpertise.includes(label)) {
      setSelectedExpertise(selectedExpertise.filter((item) => item !== label));
    } else {
      setSelectedExpertise([...selectedExpertise, label]);
    }
  };

  const toggleAcademics = (label) => {
    if (selectedAcademics.includes(label)) {
      setSelectedAcademics(selectedAcademics.filter((item) => item !== label));
    } else {
      setSelectedAcademics([...selectedAcademics, label]);
    }
  };

  const toggleClients = (label) => {
    if (selectedClients.includes(label)) {
      setSelectedClients(selectedClients.filter((item) => item !== label));
    } else {
      setSelectedClients([...selectedClients, label]);
    }
  };

  const toggleAvailability = (label) => {
    if (selectedAvailability.includes(label)) {
      setSelectedAvailability(
        selectedAvailability.filter((item) => item !== label)
      );
    } else {
      setSelectedAvailability([...selectedAvailability, label]);
    }
  };

  const handleFilterSelect = (filterlabel) => {
    console.log("filterlabel", filterlabel);
    setActiveFilterCategory(filterlabel);
    setSearchQuery(""); // Reset search query when changing filter
  };
  const handleSector = (sectorLabel : string) => {
    console.log("sectorLabel", sectorLabel);
    setSelectedSector(sectorLabel);
  };

  const clearFilters = () => {
    setSelectedExpertise([]);
    setSelectedAcademics([]);
    setSelectedCountries([]);
    setSelectedLanguages([]);
    setSelectedClients([]);
    setSelectedAvailability([]);
    setSelectedFilters({
      skills: [],
      academics: [],
      countries: [],
      languages: [],
      clients: [],
      availability: [],
    });
  };

  const applyFilters = () => {
    setSelectedFilters({
      skills: selectedExpertise,
      academics: selectedAcademics,
      countries: selectedCountries,
      languages: selectedLanguages,
      clients: selectedClients,
      availability: selectedAvailability,
    });
    setShowFilters(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the options based on search query
  const getFilteredOptions = (options) => {
    if (!searchQuery) return options;
    return options.filter((option) =>
      typeof option === "string"
        ? option.toLowerCase().includes(searchQuery.toLowerCase())
        : option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Render filter options based on active category
  const renderFilterOptions = () => {
    switch (activeFilterCategory) {
      case "Expertise":
        return getFilteredOptions(expertiseOptions).map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-2 p-2 rounded-md"
            onClick={() => toggleExpertise(option.label)}
          >
            <Checkbox
              checked={selectedExpertise.includes(option.label)}
              onCheckedChange={() => toggleExpertise(option.label)}
            />
            <span className="text-gray-400 text-xs">{option.label}</span>
          </div>
        ));
      case "Academics":
        return getFilteredOptions(academicOptions).map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-2 p-2 rounded-md"
            onClick={() => toggleAcademics(option.label)}
          >
            <Checkbox
              checked={selectedAcademics.includes(option.label)}
              onCheckedChange={() => toggleAcademics(option.label)}
            />
            <span className="text-gray-400 text-xs">{option.label}</span>
          </div>
        ));
      case "Country":
        return getFilteredOptions(countries).map((country) => (
          <div key={country} className="flex items-center gap-2 p-2 rounded-md">
            <Checkbox
              checked={selectedCountries.includes(country)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedCountries([...selectedCountries, country]);
                } else {
                  setSelectedCountries(
                    selectedCountries.filter((c) => c !== country)
                  );
                }
              }}
            />
            <span className="text-gray-400 text-xs">{country}</span>
          </div>
        ));
      case "Clients":
        return getFilteredOptions(clientsOptions).map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-2 p-2 rounded-md"
            onClick={() => toggleClients(option.label)}
          >
            <Checkbox
              checked={selectedClients.includes(option.label)}
              onCheckedChange={() => toggleClients(option.label)}
            />
            <span className="text-gray-400 text-xs">{option.label}</span>
          </div>
        ));
      case "Languages":
        return getFilteredOptions(languages).map((language) => (
          <div
            key={language}
            className="flex items-center gap-2 p-2 rounded-md"
          >
            <Checkbox
              checked={selectedLanguages.includes(language)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedLanguages([...selectedLanguages, language]);
                } else {
                  setSelectedLanguages(
                    selectedLanguages.filter((l) => l !== language)
                  );
                }
              }}
            />
            <span className="text-gray-400 text-xs">{language}</span>
          </div>
        ));
      case "Available To":
        return getFilteredOptions(availabilityOptions).map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-2 p-2 rounded-md"
            onClick={() => toggleAvailability(option.label)}
          >
            <Checkbox
              checked={selectedAvailability.includes(option.label)}
              onCheckedChange={() => toggleAvailability(option.label)}
            />
            <span className="text-gray-400 text-xs">{option.label}</span>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="w-full  bg-gradient-to-br from-black via-[#0F0F30] to-[#0F0F30] backdrop-blur-md rounded-2xl px-2 py-2 transition-all duration-300">
      {/* <div className="absolute top-0 left-50 w-full z-1 flex justify-center">
        <img
          src="https://res.cloudinary.com/dgz1duuwu/image/upload/v1740037507/quidAi/sugtwxhrkajxvvl1bhms.png"
          alt="Spiral Background"
          className="w-full h-full object-cover"
        />
      </div> */}
      <div className="flex  justify-between items-center mb-4">
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
        <div className="space-y-2">
          <label className="text-base proxima-bold ">
            Specialization Sector
          </label>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {solutions.map((solution) => (
              <Card
                key={solution.id}
                className={`h-28 w-28 px-6 rounded-3xl m-1 border-none proxima-bold flex flex-col text-wrap justify-center items-center ${
                  solution.label == selectedSector
                    ? "bg-gradient-to-r  from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8] text-white"
                    : "bg-[#545C6C] text-white"
                }`}
                onClick={()=>handleSector(solution.label)}
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
      )}
      <div className="grid grid-cols-12 gap-4 my-4  ">
        <div className="col-span-4 flex flex-col items-center">
          <h1 className="mx-2 text-sm text-center proxima-bold text-white">
            Filters By
          </h1>
          {filterCategories.map((filter, index) => (
            <div key={index} className="text-center w-full">
              <Badge
                variant="none"
                className={`w-28 p-2 rounded-3xl m-1 border-none proxima-bold flex justify-center ${
                  filter.label == activeFilterCategory
                    ? "bg-gradient-to-r from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8] text-white"
                    : "bg-[#545C6C] text-white"
                }`}
                onClick={() => handleFilterSelect(filter.label)}
              >
                {filter.label}
              </Badge>
            </div>
          ))}
        </div>

        <div className="col-span-8 ml-2 my-4">
          <label className="relative flex items-center gap-3 px-4 py-2 rounded-3xl">
            <SearchIcon className="absolute left- text-gray-400 mx-2" />
            <Input
              type="text"
              placeholder={`Search ${activeFilterCategory}`}
              className="pl-10 pr-4 py-2 w-full outline-none border bg-transparent focus:ring-2 focus:ring-blue-500 rounded-3xl"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </label>
          <div className=" overflow-y-auto h-60">{renderFilterOptions()}</div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={applyFilters}
          className="rounded-3xl px-6 py-2 bg-gradient-to-r from-[#7C2BD3] to-[#075AA8]"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
