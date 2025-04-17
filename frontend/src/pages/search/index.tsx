import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search as SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import TalentCard from "@/components/TalentCard";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {  fetchProfiles, Profile } from "@/reducers/profile/profileSlice";
import { fetchAIProfile } from "@/reducers/ai-talent/ai-talent";
import { fetchUSProfile } from "@/reducers/us-talent/us-talentSlice";
import FilterDrawer from "@/components/FilterDrawer";
interface Filter {
  expertise: string[];
  academics: string[];
  country: string[];
  languages: string[];
  clients: string[];
  available_to: string[];
  industry?: string;
}
type FilterCategory =
  | "expertise"
  | "academics"
  | "country"
  | "languages"
  | "clients"
  | "available_to"
  | "industry";

const Search = () => {
  // State for selected filters
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedAcademics, setSelectedAcademics] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );
  const [selectedIndustry, setSelectedIndustry] = useState<string>();
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);
  const [isSearchApplied, setIsSearchApplied] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<Filter>({
    expertise: [],
    academics: [],
    country: [],
    languages: [],
    clients: [],
    available_to: [],
    industry: "",
  });
  // State for filter drawer
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const onSearch = (query: string) => {
    console.log("Searching for:", query);
    if (query) {
      setIsSearchApplied(true);
      dispatch(fetchProfiles({ search: query }));
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (typeof onSearch === "function") {
        onSearch(searchTerm);
      } else {
        console.error("onSearch is not a function", onSearch);
      }
    }, 300);
    setIsSearchApplied(false);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  const [activeQuickFilterCategory, setActiveQuickFilterCategory] = useState<
    string | null
  >(null);

  // Redux and data states
  const dispatch = useAppDispatch();
  const { profiles } = useAppSelector((state) => state.Profile);
  const { aiprofile } = useAppSelector((state) => state.AIProfile);
  const { usprofile } = useAppSelector((state) => state.USProfile);
  // const { filter, filterloading, filtererror } = useAppSelector(
  //   (state) => state.PostFilter
  // );
  console.log("aiProfile", aiprofile);
  console.log("usProfile", usprofile);
  const [userData, setUserData] = useState<Profile[] | null>(null);
  // const [filterUsers, setFilterUsers] = useState<Profile[] | null>(filter);
  // Fetch profile on component mount
  useEffect(() => {
    dispatch(fetchAIProfile());
    dispatch(fetchUSProfile());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchProfiles(selectedFilters));
  }, [dispatch, JSON.stringify(selectedFilters)]);

  // Update userData when profile changes
  // useEffect(() => {
  //   setUserData(profile);
  // }, [profile]);

  // Filter toggle handlers
  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const closeFilter = () => {
    setActiveQuickFilterCategory(null);
    setShowFilters(false);
  };

  // Quick filters configuration
  const QuickFilters = [
    { id: 1, icon: "/Icons/Expertise.png", label: "Expertise" },
    { id: 2, icon: "/Icons/Academic.png", label: "Academic" },
    { id: 3, icon: "/Icons/Country.png", label: "Country" },
    { id: 4, icon: "/Icons/Client.png", label: "Clients" },
    { id: 5, icon: "/Icons/Languages.png", label: "Languages" },
    { id: 6, icon: "/Icons/AvailableTo.png", label: "Available to" },
  ];

  const updateFilter = useCallback(
    (category: FilterCategory, value: string, isAdding: boolean) => {
      console.log("category",category);
      console.log("value",value);
      console.log("isAdding",isAdding);
      setSelectedFilters((prev) => {
        const updatedFilters = {
          ...prev,
          [category]: isAdding
            ? [...prev[category], value.toLowerCase()]
            : prev[category].filter((item) => item !== value.toLowerCase()),
        };

        // Check if any filter category has items
        const hasActiveFilters = Object.values(updatedFilters).some(
          (categoryFilters) => categoryFilters.length > 0
        );

        // Set isFilterApplied based on whether there are any active filters
        setIsFilterApplied(hasActiveFilters);

        return updatedFilters;
      });
    },
    []
  );
  // Apply filters and update selected filters
  const applyFilters = () => {
    // Close the filter drawer
    setShowFilters(false);

    // Function to convert array elements to lowercase
    const toLowerCaseArray = (arr: string[]) =>
      arr.map((item) => item.toLowerCase());

    const updatedFilters = {
      expertise: toLowerCaseArray(selectedExpertise),
      academics: toLowerCaseArray(selectedAcademics),
      country: toLowerCaseArray(selectedCountries),
      languages: toLowerCaseArray(selectedLanguages),
      clients: toLowerCaseArray(selectedClients),
      available_to: toLowerCaseArray(selectedAvailability),
      industry: selectedIndustry,
    };
    // setIsFilterApplied(true);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      ...updatedFilters,
    }));
  };
  const clearFilters = useCallback(() => {
    setSelectedFilters({
      expertise: [],
      academics: [],
      country: [],
      languages: [],
      clients: [],
      available_to: [],
      industry: "",
    });
    setSelectedIndustry("");
    setIsFilterApplied(false);
    console.log("clearedFilters");
  }, []);
  console.log("isFilterApplied", isFilterApplied);
  console.log("isSearchApllied", isSearchApplied);
  console.log("profiles", profiles);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="pt-10 pb-20 w-full flex flex-col gap-2">
        {/* Search input and filter button */}
        <div className="flex px-2 md:px-4 lg:px-6 max-w-xl gap-2">
          <div className="border flex w-full items-center rounded-3xl">
            <SearchIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              type="text"
              placeholder="Search talent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex h-10 w-full border-none focus-visible:ring-0 rounded-md bg-transparent py-3 text-sm outline-none"
            />
          </div>
          <Button
            size="icon"
            variant="none"
            onClick={handleFilterToggle}
            className="h-10 w-12 rounded-full bg-[#425BFF]"
          >
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "90%", width: "90%" }}
            >
              <path
                d="M25.5476 8.28571H10.3572M7.59525 8.28571H3.45239M25.5476 22.0952H10.3572M7.59525 22.0952H3.45239M18.6429 15.1905H3.45239M25.5476 15.1905H21.4048M8.9762 5.5238C9.34245 5.5238 9.6937 5.6693 9.95268 5.92828C10.2117 6.18725 10.3572 6.5385 10.3572 6.90476V9.66666C10.3572 10.0329 10.2117 10.3842 9.95268 10.6431C9.6937 10.9021 9.34245 11.0476 8.9762 11.0476C8.60995 11.0476 8.2587 10.9021 7.99972 10.6431C7.74074 10.3842 7.59525 10.0329 7.59525 9.66666V6.90476C7.59525 6.5385 7.74074 6.18725 7.99972 5.92828C8.2587 5.6693 8.60995 5.5238 8.9762 5.5238ZM8.9762 19.3333C9.34245 19.3333 9.6937 19.4788 9.95268 19.7378C10.2117 19.9968 10.3572 20.348 10.3572 20.7143V23.4762C10.3572 23.8424 10.2117 24.1937 9.95268 24.4527C9.6937 24.7116 9.34245 24.8571 8.9762 24.8571C8.60995 24.8571 8.2587 24.7116 7.99972 24.4527C7.74074 24.1937 7.59525 23.8424 7.59525 23.4762V20.7143C7.59525 20.348 7.74074 19.9968 7.99972 19.7378C8.2587 19.4788 8.60995 19.3333 8.9762 19.3333ZM20.0238 12.4286C20.3901 12.4286 20.7413 12.5741 21.0003 12.833C21.2593 13.092 21.4048 13.4433 21.4048 13.8095V16.5714C21.4048 16.9377 21.2593 17.2889 21.0003 17.5479C20.7413 17.8069 20.3901 17.9524 20.0238 17.9524C19.6576 17.9524 19.3063 17.8069 19.0473 17.5479C18.7884 17.2889 18.6429 16.9377 18.6429 16.5714V13.8095C18.6429 13.4433 18.7884 13.092 19.0473 12.833C19.3063 12.5741 19.6576 12.4286 20.0238 12.4286Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
        <div>
          <div className="mx-1 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
            <h1 className="proxima-bold text-xl text-white">
              Quick filters by
            </h1>
          </div>
          <div className="w-full px-2 md:px-4 lg:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 hide-scrollbar">
              {QuickFilters.map(({ id, icon, label }) => (
                <Card
                  key={id}
                  onClick={() => {
                    setActiveQuickFilterCategory(label);
                    setShowFilters(true);
                  }}
                  className="min-h-16 min-w-28 flex flex-col align-middle justify-center items-center border-none bg-gradient-to-r from-[#7C2BD3] via-[#5C3CD3] to-[#075AA8]"
                >
                  <CardTitle>
                    <img src={icon} alt="" />
                  </CardTitle>
                  <CardDescription className="text-white proxima-bold">
                    {label}
                  </CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Selected filters badges */}
        <div className="flex gap-2 max-w-sm hide-scrollbar overflow-x-scroll mx-2">
          {Object.entries(selectedFilters).map(
            ([category, values]) =>
              category !== "industry" &&
              values.map((value) => (
                <Badge
                  key={`${category}-${value}`}
                  className="flex bg-white/20 items-center text-nowrap rounded-3xl"
                >
                  <span className="text-xs proxima-bold">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </span>
                  <button
                    onClick={() => updateFilter(category, value, false)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Badge>
              ))
          )}
        </div>

        {/* Filter Drawer */}
        {showFilters && (
          <Drawer open={showFilters} onOpenChange={closeFilter}>
            <DrawerContent>
              <FilterDrawer
                showFilters={!activeQuickFilterCategory}
                setShowFilters={closeFilter}
                handleFilterToggle={handleFilterToggle}
                initialFilter={activeQuickFilterCategory}
                applyFilters={applyFilters}
                setSelectedFilters={setSelectedFilters}
                selectedIndustry={selectedIndustry}
                setSelectedIndustry={setSelectedIndustry}
                updateFilter={updateFilter}
                selectedFilters={selectedFilters}
                clearFilters={clearFilters}
                setIsFilterApplied={setIsFilterApplied}
              />
            </DrawerContent>
          </Drawer>
        )}

        {/* Talent Cards Section */}
        <div>
          {isSearchApplied || isFilterApplied ? (
            <div className="w-full relative overflow-x-auto hide-scrollbar px-4">
              <div className="mx-1 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                {/* <h1 className="proxima-bold text-xl text-white">
                  Talents from US
                </h1> */}
              </div> 
              <div
                className={`w-full overflow-x-auto hide-scrollbar px-4 grid ${
                  isSearchApplied || isFilterApplied
                    ? "grid-cols-1"
                    : "grid-flow-col auto-cols-max"
                } gap-2`}
              >
                {profiles?.map((talent) => (
                  <TalentCard key={talent.id} talent={talent} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="w-full relative overflow-x-auto hide-scrollbar px-4">
                <div className="mx-1 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  <h1 className="proxima-bold text-xl text-white">
                    Top AI Talents
                  </h1>
                </div>
                <div
                  className={`w-full overflow-x-auto hide-scrollbar px-4 grid ${
                    isFilterApplied
                      ? "grid-cols-1"
                      : "grid-flow-col auto-cols-max"
                  } gap-2`}
                >
                  {aiprofile?.map((talent) => (
                    <TalentCard key={talent.id} talent={talent} />
                  ))}
                </div>
              </div>
              <div className="w-full relative overflow-x-auto hide-scrollbar px-4">
                <div className="mx-1 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  <h1 className="proxima-bold text-xl text-white">
                    Talents from US
                  </h1>
                </div>
                <div
                  className={`w-full overflow-x-auto hide-scrollbar px-4 grid ${
                    isFilterApplied
                      ? "grid-cols-1"
                      : "grid-flow-col auto-cols-max"
                  } gap-2`}
                >
                  {usprofile?.map((talent) => (
                    <TalentCard key={talent.id} talent={talent} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
