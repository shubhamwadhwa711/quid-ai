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
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

interface FilterDrawerProps {
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  handleFilterToggle: () => void;
  initialFilter?: string;
  applyFilters: () => void;
  setSelectedFilters: React.Dispatch<React.SetStateAction<any>>;
  selectedIndustry: string;
  setSelectedIndustry: React.Dispatch<React.SetStateAction<string>>;
  updateFilter: (category: string, value: string, checked: boolean) => void;
  selectedFilters: any;
  clearFilters: () => void;
  setIsFilterApplied: React.Dispatch<React.SetStateAction<boolean>>;
}

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
}: FilterDrawerProps) {
  const solutionsScrollRef = useHorizontalScroll<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [activeFilterCategory, setActiveFilterCategory] = useState(
    initialFilter ?? "Expertise"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useAppDispatch();

  // Redux state selectors
  const { academics, loading: academicsLoading, error: academicError } = useAppSelector(
    (state) => state.Academics
  );
  const { expertise, loading: expertiseLoading, error: expertiseError } = useAppSelector(
    (state) => state.Expertise
  );
  const { country, loading: countryLoading, error: countryError } = useAppSelector(
    (state) => state.Country
  );
  const { clients, loading: clientsLoading, error: clientsError } = useAppSelector(
    (state) => state.Client
  );
  const { language, loading: languageLoading, error: languageError } = useAppSelector(
    (state) => state.Language
  );
  const { availableTo, loading: availableToLoading, error: availableToError } = useAppSelector(
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
        if (!expertise || expertise.length === 0 || expertiseError) {
          dispatch(fetchExpertise({}));
        }
        break;
      case "Academic":
        if (!academics || academics.length === 0 || academicError) {
          dispatch(fetchAcademics());
        }
        break;
      case "Country":
        if (!country || country.length === 0 || countryError) {
          dispatch(fetchCountry());
        }
        break;
      case "Clients":
        if (!clients || clients.length === 0 || clientsError) {
          dispatch(fetchClient({}));
        }
        break;
      case "Languages":
        if (!language || language.length === 0 || languageError) {
          dispatch(fetchLanguage({ search: "" }));
        }
        break;
      case "Available To":
        if (!availableTo || availableTo.length === 0 || availableToError) {
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
    expertiseError,
    academics,
    academicError,
    country,
    countryError,
    clients,
    clientsError,
    language,
    languageError,
    availableTo,
    availableToError,
  ]);

  // Update profiles when filters change
  useEffect(() => {
    dispatch(fetchProfiles(selectedFilters));
  }, [selectedFilters, dispatch]);

  // Filter categories
  const filterCategories = [
    { id: "available_to", label: "Available To" },
    { id: "expertise", label: "Expertise" },
    { id: "academic", label: "Academic" },
    { id: "country", label: "Country" },
    { id: "clients", label: "Clients" },
    { id: "languages", label: "Languages" },
  ];

  const handleFilterSelect = (filterLabel: string) => {
    setActiveFilterCategory(filterLabel);
    setSearchQuery(""); // Reset search query when changing filter
  };

  const handleSector = (sectorLabel: string) => {
    setSelectedIndustry(sectorLabel);
    setSelectedFilters((prevFilters: any) => ({
      ...prevFilters,
      industry: sectorLabel,
    }));
    setIsFilterApplied(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter the options based on search query
  const getFilteredOptions = (options: any) => {
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
        return expertiseLoading;
      case "Academic":
        return academicsLoading;
      case "Country":
        return countryLoading;
      case "Clients":
        return clientsLoading;
      case "Languages":
        return languageLoading;
      case "Available To":
        return availableToLoading;
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
                updateFilter("expertise", option.name, checked as boolean)
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
                updateFilter("academics", option?.degree, checked as boolean)
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
                updateFilter("country", count.name, checked as boolean)
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
                updateFilter("clients", option.name, checked as boolean)
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
                updateFilter("languages", lang.name, checked as boolean)
              }
            />
            <span className="text-gray-400 text-xs">{lang.name}</span>
          </div>
        ));
      case "Available To":
        return getFilteredOptions(availableTo).map((option) => (
          <div
            key={option.id || option.name}
            className="flex items-center gap-2 p-2 rounded-md"
          >
            <Checkbox
              checked={selectedFilters?.available_to?.includes(
                option.name.toLowerCase()
              )}
              onCheckedChange={(checked) =>
                updateFilter("available_to", option.name, checked as boolean)
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
    <div className=" bg-gradient-to-br   from-black via-[#0F0F30] to-[#0F0F30] backdrop-blur-md rounded-2xl px-2 py-2">
      <div className="flex justify-between items-center mb-4 relative">
        <div className="w-24">{/* Left spacer to balance the layout */}</div>

        <h3 className="text-lg font-bold text-white absolute left-1/2 transform -translate-x-1/2">
          Filters
        </h3>

        <div className="flex gap-2">
          {/* <Button
            variant="ghost"
            className="text-xs text-gray-300 hover:text-white"
            onClick={clearFilters}
          >
            Clear All
          </Button> */}
          <Button
            variant="none"
            className="p-1 rounded-full"
            onClick={handleFilterToggle}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="space-y-2">
          <label className="text-base proxima-bold">
            Specialization Sector
          </label>

          <div ref={solutionsScrollRef} className="flex gap-2 overflow-x-auto hide-scrollbar">
            {Solutions &&
              Solutions.map((solution) => (
                <Card
                  key={solution.id}
                  className={`h-28 w-28 p-10 rounded-xl border-none flex flex-col text-wrap justify-center items-center ${solution.name === selectedIndustry
                    ? "bg-gradient-to-r from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8] text-white"
                    : "bg-white/20 text-white"
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
            <div key={index} className="text-center  w-full">
              <Badge
                variant="none"
                className={`relative w-28 p-2  text-xs rounded-3xl m-1 border-none proxima-bold flex justify-center items-center text-white
                ${filter.label === activeFilterCategory
                    ? "bg-gradient-to-r from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8] after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:right-[-10px] after:border-y-[12px] after:border-l-[16px] after:border-y-transparent after:border-l-[#075AA8]"
                    : "bg-white/20"
                  }
              `}
                onClick={() => handleFilterSelect(filter.label)}
              >
                {filter.label}
              </Badge>
            </div>
          ))}
        </div>

        <div className="col-span-8 ml-2 my-4">
          <label className="relative flex items-center gap-3 px-4 py-2 rounded-3xl">
            <div className="absolute left-6 mx-2">
              <Search className="w-4.5 h-4.5" />
            </div>
            <Input
              type="text"
              placeholder={`Search ${activeFilterCategory}`}
              className="pl-10 pr-4 text-sm font-semibold  py-2 w-full outline-none border bg-transparent focus:ring-2 focus:ring-blue-500 rounded-3xl"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </label>
          <div className="overflow-y-auto h-60 hide-scrollbar">{renderFilterOptions()}</div>
        </div>
      </div>
    </div>
  );
}
