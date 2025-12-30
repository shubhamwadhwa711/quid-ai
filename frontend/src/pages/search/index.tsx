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
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import TalentCard from "@/components/TalentCard";
import FilterDrawer from "@/components/FilterDrawer";
import JoinExpertCTA from "@/components/JoinExpertCTA";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { fetchProfiles, Profile } from "@/reducers/profile/profileSlice";
import { fetchAIProfiles } from "@/reducers/ai-talent/ai-talent";
import {
  fetchUSProfile,
  fetchUSProfiles,
} from "@/reducers/us-talent/us-talentSlice";
import { useRouter } from "next/router";
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

const SearchPage = () => {
  const router = useRouter();

  // Horizontal scroll refs
  const searchResultsScrollRef = useHorizontalScroll<HTMLDivElement>();
  const allTalentsScrollRef = useHorizontalScroll<HTMLDivElement>();
  const aiTalentsScrollRef = useHorizontalScroll<HTMLDivElement>();
  const usTalentsScrollRef = useHorizontalScroll<HTMLDivElement>();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchApplied, setIsSearchApplied] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeQuickFilterCategory, setActiveQuickFilterCategory] = useState<string | null>(null);

  // Filter states
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedAcademics, setSelectedAcademics] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");

  const [selectedFilters, setSelectedFilters] = useState<Filter>({
    expertise: [],
    academics: [],
    country: [],
    languages: [],
    clients: [],
    available_to: [],
    industry: "",
  });

  const dispatch = useAppDispatch();

  const onSearch = useCallback((query: string) => {
    if (query.trim()) {
      setIsSearchApplied(true);
      dispatch(fetchProfiles({ search: query }));
    } else {
      setIsSearchApplied(false);
      dispatch(fetchProfiles({}));
    }
  }, [dispatch]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTerm, onSearch]);

  // Redux data states
  const { profiles } = useAppSelector((state) => state.Profile);
  const { aiProfiles } = useAppSelector((state) => state.AIProfile);
  const { usProfiles } = useAppSelector((state) => state.USProfile);
  const [allTalents, setAllTalents] = useState<Profile[]>([]);

  // Debug log
  useEffect(() => {
    console.log("Profiles data:", profiles);
    console.log("AI profiles data:", aiProfiles);
    console.log("US profiles data:", usProfiles);
    console.log("Is search applied:", isSearchApplied, "Is filter applied:", isFilterApplied);
  }, [profiles, aiProfiles, usProfiles, isSearchApplied, isFilterApplied]);
  // Fetch AI and US profiles on component mount
  useEffect(() => {
    dispatch(fetchAIProfiles());
    dispatch(fetchUSProfiles());
    // Fetch all talents for the default view
    dispatch(fetchProfiles({})).unwrap().then((response) => {
      setAllTalents(response.results || response);
    });
  }, [dispatch]);

  // Fetch profiles based on selected filters
  useEffect(() => {
    dispatch(fetchProfiles(selectedFilters));
  }, [dispatch, selectedFilters]);

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
    { id: 6, icon: "/Icons/AvailableTo.png", label: "Available To" },
  ];

  const updateFilter = useCallback(
    (category: string, value: string, isAdding: boolean) => {
      setSelectedFilters((prev) => {
        const categoryKey = category as FilterCategory;
        const categoryValue = prev[categoryKey];
        const updatedFilters = {
          ...prev,
          [category]: isAdding && Array.isArray(categoryValue)
            ? [...categoryValue, value.toLowerCase()]
            : Array.isArray(categoryValue)
              ? categoryValue.filter((item: string) => item !== value.toLowerCase())
              : [],
        };

        // Check if any filter category has items
        const hasActiveFilters = Object.values(updatedFilters).some(
          (categoryFilters) => Array.isArray(categoryFilters) && categoryFilters.length > 0
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
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Header Section with Explanation */}
      <div className="w-full bg-gradient-to-b from-[#0a0e27]/80 to-transparent pt-12 pb-3 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold proxima-bold text-white mb-3">
            Find Top AI Talent
          </h1>
          <p className="text-md text-white/80 proxima-large mb-2">
            Search through our verified directory of AI professionals
            {/* <span className="text-sm text-white/60 proxima-small block mt-2">
              Use filters to narrow down by expertise, skills, location, and availability
            </span> */}
          </p>
        </div>
      </div>

      <div className="pt-8 pb-20 w-full flex flex-col gap-4">
        {/* Search input and filter button */}
        <div className="px-2 md:px-4 lg:px-6 flex justify-center">
          <div className="w-full max-w-2xl flex gap-3">
            <div className="border border-white/20 flex w-full items-center rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="ml-4">
                <Search />
              </div>
              <Input
                type="text"
                placeholder="Search by name, skill, or expertise..."
                name="search"
                value={searchTerm}
                onChange={handleSearch}
                className="flex h-12 w-full border-none focus-visible:ring-0 rounded-full bg-transparent py-3 px-2 text-sm outline-none placeholder:text-white/50"
              />
            </div>
            <Button
              size="icon"
              variant="none"
              onClick={handleFilterToggle}
              className="h-12 w-12 rounded-full bg-gradient-to-r from-[#425BFF] to-[#7C2BD3] hover:from-[#3a4fd1] hover:to-[#6b23a9] transition-all flex-shrink-0"
            >
              <SlidersHorizontal />
            </Button>
          </div>
        </div>
        <div>
          <div className="mx-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
            <h1 className="proxima-bold text-lg text-white/90">
              Refine by expertise
            </h1>
          </div>
          <div className="w-full px-2 md:px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {QuickFilters.map(({ id, icon, label }) => (
                <Card
                  key={id}
                  onClick={() => {
                    setActiveQuickFilterCategory(label);
                    setShowFilters(true);
                  }}
                  className="h-20 cursor-pointer flex flex-col items-center justify-center border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl transition-all"
                >
                  <img src={icon} alt={label} className="h-6 w-6 mb-1" />
                  <span className="text-xs text-white/80 proxima-bold text-center line-clamp-2">
                    {label}
                  </span>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Selected filters badges */}
        <div className="flex relative gap-2 px-2 md:px-4 hide-scrollbar overflow-x-scroll flex-wrap">
          {Object.entries(selectedFilters).map(
            ([category, values]) =>
              category !== "industry" &&
              Array.isArray(values) &&
              values.map((value: string) => (
                <Badge
                  variant="none"
                  key={`${category}-${value}`}
                  className="flex border border-white/20 bg-white/10 hover:bg-white/15 items-center text-nowrap rounded-full px-3 py-1 transition-colors"
                >
                  <span className="text-xs proxima-bold text-white">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </span>
                  <button
                    onClick={() => updateFilter(category as FilterCategory, value, false)}
                    className="ml-2 hover:text-red-400 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </Badge>
              ))
          )}
        </div>

        {/* Filter Drawer */}
        {showFilters && (
          <Drawer open={showFilters} onOpenChange={closeFilter}>
            <DrawerContent className="max-w-md outline-none mx-auto border-none focus-visible:none">
              <FilterDrawer
                showFilters={!activeQuickFilterCategory}
                setShowFilters={closeFilter}
                handleFilterToggle={handleFilterToggle}
                initialFilter={activeQuickFilterCategory ?? undefined}
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
                <h1 className="proxima-bold text-xl text-white">
                  Search Results
                </h1>
              </div>
              <div className="flex justify-center w-full">
                <div
                  ref={searchResultsScrollRef}
                  className={`overflow-x-auto hide-scrollbar px-4 grid ${isSearchApplied || isFilterApplied
                    ? "grid-cols-1"
                    : "grid-flow-col auto-cols-max"
                    } gap-2`}
                >
                  {profiles && profiles.length > 0 ? (
                    profiles.map((talent: Profile) => (
                      <TalentCard key={talent.id} talent={talent} talentType="search" />
                    ))
                  ) : (
                    <p className="text-white/60 text-center py-8">No profiles found</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full relative overflow-x-auto hide-scrollbar px-4">
                <div className="mx-1 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                    <h1 className="proxima-bold text-xl text-white">
                      All Talents
                    </h1>
                  </div>
                  {allTalents && allTalents.length > 10 && (
                    <Button
                      variant="ghost"
                      onClick={() => router.push("/talents/all")}
                      className="text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                    >
                      See More
                    </Button>
                  )}
                </div>
                <div
                  ref={allTalentsScrollRef}
                  className={`w-full overflow-x-auto hide-scrollbar px-4 grid ${isFilterApplied
                    ? "grid-cols-1"
                    : "grid-flow-col auto-cols-max"
                    } gap-2`}
                >
                  {allTalents && allTalents.length > 0 ? (
                    allTalents.map((talent: Profile) => (
                      <TalentCard key={talent.id} talent={talent} talentType={"all"} />
                    ))
                  ) : (
                    <p className="text-white/60 text-center py-8">No talents found</p>
                  )}
                </div>
              </div>
              <div className="w-full relative overflow-x-auto hide-scrollbar px-4">
                <div className="mx-1 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                    <h1 className="proxima-bold text-xl text-white">
                      Top AI Talents
                    </h1>
                  </div>
                  {aiProfiles && aiProfiles.length > 10 && (
                    <Button
                      variant="ghost"
                      onClick={() => router.push("/talents/ai")}
                      className="text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                    >
                      See More
                    </Button>
                  )}
                </div>
                <div
                  ref={aiTalentsScrollRef}
                  className={`w-full overflow-x-auto hide-scrollbar px-4 grid ${isFilterApplied
                    ? "grid-cols-1"
                    : "grid-flow-col auto-cols-max"
                    } gap-2`}
                >
                  {aiProfiles && aiProfiles.length > 0 ? (
                    aiProfiles.slice(0, 10).map((talent: any) => (
                      <TalentCard key={talent.id} talent={talent as Profile} talentType={"AI"} />
                    ))
                  ) : (
                    <p className="text-white/60 text-center py-8">No AI profiles found</p>
                  )}
                </div>
              </div>
              <div className="w-full relative overflow-x-auto hide-scrollbar px-4">
                <div className="mx-1 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                    <h1 className="proxima-bold text-xl text-white">
                      Talents from US
                    </h1>
                  </div>
                  {usProfiles && usProfiles.length > 10 && (
                    <Button
                      variant="ghost"
                      onClick={() => router.push("/talents/us")}
                      className="text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                    >
                      See More
                    </Button>
                  )}
                </div>
                <div
                  ref={usTalentsScrollRef}
                  className={`w-full overflow-x-auto hide-scrollbar px-4 grid ${isFilterApplied
                    ? "grid-cols-1"
                    : "grid-flow-col auto-cols-max"
                    } gap-2`}
                >
                  {usProfiles && usProfiles.length > 0 ? (
                    usProfiles.slice(0, 10).map((talent: any) => (
                      <TalentCard key={talent.id} talent={talent as Profile} talentType={"US"} />
                    ))
                  ) : (
                    <p className="text-white/60 text-center py-8">No US profiles found</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Join Expert CTA */}
        <div className="mt-16 mb-8">
          <JoinExpertCTA />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
