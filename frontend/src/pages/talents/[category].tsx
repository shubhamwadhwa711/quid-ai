import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import TalentCard from "@/components/TalentCard";
import FilterDrawer from "@/components/FilterDrawer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProfiles, Profile } from "@/reducers/profile/profileSlice";
import { fetchAIProfiles } from "@/reducers/ai-talent/ai-talent";
import { fetchUSProfiles } from "@/reducers/us-talent/us-talentSlice";
import { useRouter } from "next/router";
import { Card } from "@/components/ui/card";

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

const CategoryTalentsPage = () => {
    const router = useRouter();
    const { category } = router.query;
    const dispatch = useAppDispatch();

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchApplied, setIsSearchApplied] = useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [activeQuickFilterCategory, setActiveQuickFilterCategory] = useState<string | null>(null);
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

    // Redux data states
    const { profiles } = useAppSelector((state) => state.Profile);
    const { aiProfiles } = useAppSelector((state) => state.AIProfile);
    const { usProfiles } = useAppSelector((state) => state.USProfile);

    // Get the appropriate data based on category
    const getTalentData = () => {
        switch (category) {
            case "ai":
                return aiProfiles || [];
            case "us":
                return usProfiles || [];
            case "all":
            default:
                return profiles || [];
        }
    };

    const talents = getTalentData();

    // Get category title
    const getCategoryTitle = () => {
        switch (category) {
            case "ai":
                return "Top AI Talents";
            case "us":
                return "Talents from US";
            case "all":
                return "All Talents";
            default:
                return "All Talents";
        }
    };

    // Fetch data based on category
    useEffect(() => {
        if (!category) return;

        // Reset filters when category changes
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
        setShowFilters(false);
        setActiveQuickFilterCategory(null);
        setSearchTerm("");
        setIsSearchApplied(false);

        switch (category) {
            case "ai":
                dispatch(fetchAIProfiles());
                break;
            case "us":
                dispatch(fetchUSProfiles());
                break;
            case "all":
            default:
                dispatch(fetchProfiles({}));
                break;
        }
    }, [category, dispatch]);

    // Search handler
    const onSearch = useCallback(
        (query: string) => {
            if (query.trim()) {
                setIsSearchApplied(true);
                dispatch(fetchProfiles({ search: query }));
            } else {
                setIsSearchApplied(false);
                // Refetch based on category
                if (category === "ai") {
                    dispatch(fetchAIProfiles());
                } else if (category === "us") {
                    dispatch(fetchUSProfiles());
                } else {
                    dispatch(fetchProfiles({}));
                }
            }
        },
        [dispatch, category]
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            onSearch(searchTerm);
        }, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, onSearch]);

    // Fetch profiles based on selected filters
    useEffect(() => {
        if (isFilterApplied) {
            dispatch(fetchProfiles(selectedFilters));
        }
    }, [dispatch, selectedFilters, isFilterApplied]);

    const handleFilterToggle = () => {
        setShowFilters(!showFilters);
    };

    const closeFilter = () => {
        setActiveQuickFilterCategory(null);
        setShowFilters(false);
    };

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
                    [category]:
                        isAdding && Array.isArray(categoryValue)
                            ? [...categoryValue, value.toLowerCase()]
                            : Array.isArray(categoryValue)
                                ? categoryValue.filter((item: string) => item !== value.toLowerCase())
                                : [],
                };

                const hasActiveFilters = Object.values(updatedFilters).some(
                    (categoryFilters) => Array.isArray(categoryFilters) && categoryFilters.length > 0
                );

                setIsFilterApplied(hasActiveFilters);

                return updatedFilters;
            });
        },
        []
    );

    const applyFilters = () => {
        setShowFilters(false);
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
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            {/* Header Section */}
            <div className="w-full bg-gradient-to-b from-[#0a0e27]/80 to-transparent pt-12 pb-8 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold proxima-bold text-white mb-3">
                        {getCategoryTitle()}
                    </h1>
                    <p className="text-md text-white/80 proxima-large mb-2">
                        Browse through our verified directory of professionals
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

                {/* Quick Filters */}
                <div>
                    <div className="mx-4 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                        <h1 className="proxima-bold text-lg text-white/90">Refine by expertise</h1>
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

                {/* Talents Grid */}
                <div className="w-full px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {talents && talents.length > 0 ? (
                            talents.map((talent: any) => (
                                <TalentCard
                                    key={talent.id}
                                    talent={talent as Profile}
                                    talentType={category as string}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-white/60 text-lg">No talents found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryTalentsPage;
