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
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.9998 8.4L2.0998 13.3C1.91647 13.4833 1.68314 13.575 1.3998 13.575C1.11647 13.575 0.883138 13.4833 0.699804 13.3C0.516471 13.1167 0.424805 12.8833 0.424805 12.6C0.424805 12.3167 0.516471 12.0833 0.699804 11.9L5.5998 7L0.699804 2.1C0.516471 1.91667 0.424805 1.68333 0.424805 1.4C0.424805 1.11667 0.516471 0.883332 0.699804 0.699999C0.883138 0.516666 1.11647 0.424999 1.3998 0.424999C1.68314 0.424999 1.91647 0.516666 2.0998 0.699999L6.9998 5.6L11.8998 0.699999C12.0831 0.516666 12.3165 0.424999 12.5998 0.424999C12.8831 0.424999 13.1165 0.516666 13.2998 0.699999C13.4831 0.883332 13.5748 1.11667 13.5748 1.4C13.5748 1.68333 13.4831 1.91667 13.2998 2.1L8.3998 7L13.2998 11.9C13.4831 12.0833 13.5748 12.3167 13.5748 12.6C13.5748 12.8833 13.4831 13.1167 13.2998 13.3C13.1165 13.4833 12.8831 13.575 12.5998 13.575C12.3165 13.575 12.0831 13.4833 11.8998 13.3L6.9998 8.4Z"
                fill="white"
              />
            </svg>
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
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.3851 12.446C10.0371 13.5231 8.32776 14.0432 6.60827 13.8994C4.88877 13.7555 3.28961 12.9588 2.13922 11.6727C0.988832 10.3867 0.374549 8.70893 0.422536 6.98409C0.470522 5.25926 1.17713 3.61827 2.39725 2.39816C3.61736 1.17805 5.25835 0.471438 6.98318 0.423451C8.70801 0.375465 10.3857 0.989748 11.6718 2.14014C12.9579 3.29052 13.7546 4.88969 13.8984 6.60918C14.0422 8.32868 13.5222 10.038 12.4451 11.386L17.6011 16.541C17.6748 16.6097 17.7339 16.6925 17.7749 16.7845C17.8159 16.8765 17.8379 16.9758 17.8397 17.0765C17.8415 17.1772 17.8229 17.2772 17.7852 17.3706C17.7475 17.464 17.6913 17.5488 17.6201 17.62C17.5489 17.6913 17.4641 17.7474 17.3707 17.7851C17.2773 17.8228 17.1773 17.8414 17.0766 17.8396C16.9759 17.8378 16.8766 17.8158 16.7846 17.7748C16.6926 17.7338 16.6098 17.6747 16.5411 17.601L11.3851 12.446ZM3.46009 10.884C2.72613 10.15 2.22624 9.21483 2.0236 8.19678C1.82096 7.17872 1.92466 6.12344 2.3216 5.1643C2.71854 4.20517 3.3909 3.38523 4.2537 2.80811C5.11651 2.23098 6.13103 1.92259 7.16906 1.92189C8.20709 1.92119 9.22203 2.22822 10.0856 2.80418C10.9492 3.38014 11.6226 4.19918 12.0209 5.15778C12.4191 6.11638 12.5242 7.17152 12.323 8.18985C12.1217 9.20817 11.6231 10.144 10.8901 10.879L10.8851 10.884L10.8801 10.888C9.89518 11.8706 8.56052 12.4221 7.16926 12.4214C5.77801 12.4206 4.44394 11.8677 3.46009 10.884Z"
                  fill="white"
                />
              </svg>
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
