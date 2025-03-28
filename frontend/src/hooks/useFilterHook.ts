import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProfile } from "@/reducers/profile/profileSlice";
import { fetchAcademics } from "@/reducers/filter/academics/academicsSlice";
import { fetchExpertise } from "@/reducers/filter/expertise/expertiseSlice";
import { fetchCountry } from "@/reducers/filter/country/countrySlice";
import { fetchClient } from "@/reducers/filter/client/clientSlice";
import { fetchLanguage } from "@/reducers/filter/language/languageSlice";
import { fetchAvailableTo } from "@/reducers/filter/availableto/availabletoSlice";

// Define filter categories
export type FilterCategory =
  | "expertise"
  | "academics"
  | "country"
  | "languages"
  | "clients"
  | "available_to";

// Define the structure of filters
export interface FilterState {
  expertise: string[];
  academics: string[];
  country: string[];
  languages: string[];
  clients: string[];
  available_to: string[];
}

export const useFilterManagement = () => {
  // Single state object for all filters
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    expertise: [],
    academics: [],
    country: [],
    languages: [],
    clients: [],
    available_to: [],
  });

  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.Profile);

  // Fetch all filter options when the hook is used
  useEffect(() => {
    // Dispatch all filter fetching actions
    dispatch(fetchAcademics());
    dispatch(fetchExpertise());
    dispatch(fetchCountry());
    dispatch(fetchClient());
    dispatch(fetchLanguage());
    dispatch(fetchAvailableTo());
  }, [dispatch]);

  // Centralized method to update filters
  const updateFilter = useCallback(
    (category: FilterCategory, value: string, isAdding: boolean) => {
      setSelectedFilters((prev) => ({
        ...prev,
        [category]: isAdding
          ? [...prev[category], value.toLowerCase()]
          : prev[category].filter((item) => item !== value.toLowerCase()),
      }));
    },
    []
  );

  // Trigger profile fetch whenever filters change
  useEffect(() => {
    dispatch(fetchProfile(selectedFilters));
  }, [dispatch, selectedFilters]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedFilters({
      expertise: [],
      academics: [],
      country: [],
      languages: [],
      clients: [],
      available_to: [],
    });
    console.log("clearedFilters");
  }, []);

  // Toggle filter drawer
  const toggleFilterDrawer = useCallback(() => {
    setShowFilters((prev) => !prev);
    console.log("toggledFilterDrawer");
  }, []);
  return {
    selectedFilters,
    setShowFilters,
    updateFilter,
    clearFilters,
    toggleFilterDrawer,
    showFilters,
    profile,
    loading,
    error,
  };
};
