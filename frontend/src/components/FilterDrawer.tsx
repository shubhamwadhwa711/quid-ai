import React, { useCallback, useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchAcademics } from "@/reducers/filter/academics/academicsSlice";
import { fetchExpertise } from "@/reducers/filter/expertise/expertiseSlice";
import { fetchCountry } from "@/reducers/filter/country/countrySlice";
import { fetchClient } from "@/reducers/filter/client/clientSlice";
import { fetchLanguage } from "@/reducers/filter/language/languageSlice";
import { fetchAvailableTo } from "@/reducers/filter/availableto/availabletoSlice";
import { fetchProfiles } from "@/reducers/profile/profileSlice";
import { fetchSolutions } from "@/reducers/solutions/solutionSlice";

export default function FilterDrawer({
  showFilters,
  setShowFilters,
  handleFilterToggle,
  initialFilter,
  applyFilters,
  setSelectedFilters,
  selectedIndustry,
  setSelectedIndustry,
  updateFilter,
  selectedFilters,
  clearFilters,
  setIsFilterApplied,
}) {
  const [open, setOpen] = useState(false);
  const [activeFilterCategory, setActiveFilterCategory] = useState(
    initialFilter ?? "Expertise"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useAppDispatch();

  // Redux state selectors
  const { academics, academicsloading, academicserror } = useAppSelector(
    (state) => state.Academics
  );
  const { expertise, expertiseloading, expertiseerror } = useAppSelector(
    (state) => state.Expertise
  );
  const { country, countryloading, countryerror } = useAppSelector(
    (state) => state.Country
  );
  const { clients, clientloading, clienterror } = useAppSelector(
    (state) => state.Client
  );
  const { language, languageloading, languageerror } = useAppSelector(
    (state) => state.Language
  );
  const { availableto, availabletoloading, availabletoerror } = useAppSelector(
    (state) => state.AvailableTo
  );
  const { Solutions, loading, error } = useAppSelector(
    (state) => state.Solutions
  );

  // Fetch solutions data on component mount
  useEffect(() => {
    dispatch(fetchSolutions());
  }, [dispatch]);

  // Fetch data based on active filter category
  useEffect(() => {
    // Only fetch data if it hasn't been loaded yet or if there was an error
    switch (activeFilterCategory) {
      case "Expertise":
        if (!expertise || expertise.length === 0 || expertiseerror) {
          dispatch(fetchExpertise());
        }
        break;
      case "Academic":
        if (!academics || academics.length === 0 || academicserror) {
          dispatch(fetchAcademics());
        }
        break;
      case "Country":
        if (!country || country.length === 0 || countryerror) {
          dispatch(fetchCountry());
        }
        break;
      case "Clients":
        if (!clients || clients.length === 0 || clienterror) {
          dispatch(fetchClient());
        }
        break;
      case "Languages":
        if (!language || language.length === 0 || languageerror) {
          dispatch(fetchLanguage());
        }
        break;
      case "Available to":
        if (!availableto || availableto.length === 0 || availabletoerror) {
          dispatch(fetchAvailableTo());
        }
        break;
      default:
        break;
    }
  }, [
    activeFilterCategory,
    dispatch,
    expertise,
    expertiseerror,
    academics,
    academicserror,
    country,
    countryerror,
    clients,
    clienterror,
    language,
    languageerror,
    availableto,
    availabletoerror,
  ]);

  // Update profiles when filters change
  useEffect(() => {
    dispatch(fetchProfiles(selectedFilters));
  }, [selectedFilters, dispatch]);

  // Filter categories
  const filterCategories = [
    { id: "expertise", label: "Expertise" },
    { id: "academic", label: "Academic" },
    { id: "country", label: "Country" },
    { id: "clients", label: "Clients" },
    { id: "languages", label: "Languages" },
    { id: "available_to", label: "Available to" },
  ];

  const handleFilterSelect = (filterlabel) => {
    setActiveFilterCategory(filterlabel);
    setSearchQuery(""); // Reset search query when changing filter
  };

  const handleSector = (sectorLabel) => {
    setSelectedIndustry(sectorLabel);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      industry: sectorLabel,
    }));
    setIsFilterApplied(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the options based on search query
  const getFilteredOptions = (options) => {
    if (!options || !Array.isArray(options)) return [];
    if (!searchQuery) return options;

    return options.filter((option) =>
      typeof option === "string"
        ? option?.toLowerCase().includes(searchQuery.toLowerCase())
        : option?.degree
        ? option.degree.toLowerCase().includes(searchQuery.toLowerCase())
        : option?.name
        ? option.name.toLowerCase().includes(searchQuery.toLowerCase())
        : false
    );
  };

  // Display loading state for the current category
  const isLoading = () => {
    switch (activeFilterCategory) {
      case "Expertise":
        return expertiseloading;
      case "Academic":
        return academicsloading;
      case "Country":
        return countryloading;
      case "Clients":
        return clientloading;
      case "Languages":
        return languageloading;
      case "Available to":
        return availabletoloading;
      default:
        return false;
    }
  };

  // Render filter options based on active category
  const renderFilterOptions = () => {
    if (isLoading()) {
      return <div className="text-gray-400 text-center py-4">Loading...</div>;
    }

    switch (activeFilterCategory) {
      case "Expertise":
        return getFilteredOptions(expertise).map((option) => (
          <div
            key={option.id || option.name}
            className="flex items-center gap-2 p-2 rounded-md"
          >
            <Checkbox
              checked={selectedFilters?.expertise?.includes(
                option.name.toLowerCase()
              )}
              onCheckedChange={(checked) =>
                updateFilter("expertise", option.name, checked)
              }
            />
            <span className="text-gray-400 text-xs">{option.name}</span>
          </div>
        ));
      case "Academic":
        return getFilteredOptions(academics).map((option) => (
          <div
            key={option?.id || option?.degree}
            className="flex items-center gap-2 p-2 rounded-md"
          >
            <Checkbox
              checked={selectedFilters?.academics?.includes(
                option?.degree?.toLowerCase()
              )}
              onCheckedChange={(checked) =>
                updateFilter("academics", option?.degree, checked)
              }
            />
            <span className="text-gray-400 text-xs">{option?.degree}</span>
          </div>
        ));
      case "Country":
        return getFilteredOptions(country).map((count) => (
          <div
            key={count.id || count.name}
            className="flex items-center gap-2 p-2 rounded-md"
          >
            <Checkbox
              checked={selectedFilters?.country?.includes(
                count.name.toLowerCase()
              )}
              onCheckedChange={(checked) =>
                updateFilter("country", count.name, checked)
              }
            />
            <span className="text-gray-400 text-xs">{count.name}</span>
          </div>
        ));
      case "Clients":
        return getFilteredOptions(clients)?.map((option) => (
          <div
            key={option.id || option.name}
            className="flex items-center gap-2 p-2 rounded-md"
          >
            <Checkbox
              checked={selectedFilters?.clients?.includes(
                option.name.toLowerCase()
              )}
              onCheckedChange={(checked) =>
                updateFilter("clients", option.name, checked)
              }
            />
            <span className="text-gray-400 text-xs">{option.name}</span>
          </div>
        ));
      case "Languages":
        return getFilteredOptions(language).map((lang) => (
          <div
            key={lang.id || lang.name}
            className="flex items-center gap-2 p-2 rounded-md"
          >
            <Checkbox
              checked={selectedFilters?.languages?.includes(
                lang.name.toLowerCase()
              )}
              onCheckedChange={(checked) =>
                updateFilter("languages", lang.name, checked)
              }
            />
            <span className="text-gray-400 text-xs">{lang.name}</span>
          </div>
        ));
      case "Available to":
        return getFilteredOptions(availableto).map((option) => (
          <div
            key={option.id || option.name}
            className="flex items-center gap-2 p-2 rounded-md"
          >
            <Checkbox
              checked={selectedFilters?.available_to?.includes(
                option.name.toLowerCase()
              )}
              onCheckedChange={(checked) =>
                updateFilter("available_to", option.name, checked)
              }
            />
            <span className="text-gray-400 text-xs">{option.name}</span>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div
      className="  mx-auto bg-gradient-to-br w-11/12 max-w-md from-black via-[#0F0F30] to-[#0F0F30] backdrop-blur-md rounded-2xl px-2 py-2"
    >
      <div className="flex justify-between items-center mb-4">
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
          <label className="text-base proxima-bold">
            Specialization Sector
          </label>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {Solutions &&
              Solutions.map((solution) => (
                <Card
                  key={solution.id}
                  className={`h-28 w-28 p-10 rounded-xl border-none flex flex-col text-wrap justify-center items-center ${
                    solution.name === selectedIndustry
                      ? "bg-gradient-to-r from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8] text-white"
                      : "bg-[#545C6C] text-white"
                  }`}
                  onClick={() => handleSector(solution.name)}
                >
                  <img
                    src={solution.logo}
                    alt={solution.name}
                    className="w-10 h-10"
                  />
                  <CardHeader className="p-2">
                    <CardTitle className="text-white text-xs font-medium break-words text-center leading-tight line-clamp-3">
                      {solution.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </div>
      )}

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
                  filter.label === activeFilterCategory
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
            <SearchIcon className="absolute left-4 text-gray-400 mx-2" />
            <Input
              type="text"
              placeholder={`Search ${activeFilterCategory}`}
              className="pl-10 pr-4 py-2 w-full outline-none border bg-transparent focus:ring-2 focus:ring-blue-500 rounded-3xl"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </label>
          <div className="overflow-y-auto h-60">{renderFilterOptions()}</div>
        </div>
      </div>
    </div>
  );
}
