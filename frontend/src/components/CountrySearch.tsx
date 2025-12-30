import { useState, useEffect, useRef } from "react";
import { Check, ChevronDown, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchCountryList } from "@/reducers/country-list/country-listSlice";
import { useAppSelector, useAppDispatch } from "@/store/store";
import React from "react";

interface Country {
  id: number;
  name: string;
}

interface CountrySearchProps {
  selectedCountry: Country | null;
  onChange: (country: Country | null) => void;
  icon?: React.ReactNode;
}

const CountrySearch = ({
  selectedCountry,
  onChange,
  icon = <MapPin size={18} />,
}: CountrySearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { countryList } = useAppSelector((state) => state.CountryList);
  console.log("Inside country search",)
  // Dispatch search action when the user types
  useEffect(() => {
    if (searchTerm.length > 0) {
      dispatch(fetchCountryList({ SearchData: searchTerm } as any));
    }
  }, [searchTerm, dispatch]);

  // Initialize the search field with the selected country name
  useEffect(() => {
    if (selectedCountry && selectedCountry.name) {
      setSearchTerm(selectedCountry.name);
    }
  }, [selectedCountry]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target) &&
        inputRef.current &&
        !(inputRef.current as any).contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCountry = (country: Country) => {
    setSearchTerm(country.name);
    onChange(country);
    setShowDropdown(false);
  };

  const handleClearSelection = () => {
    setSearchTerm("");
    onChange(null);
    setShowDropdown(false);
    inputRef.current?.focus();
  };
  console.log("selectedCountry", selectedCountry);
  return (
    <div className="relative w-full">
      <div className="absolute z-50 inset-y-0 left-3 flex items-center text-white">
        {icon}
      </div>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search for a country"
          className="w-full p-2 pl-10 pr-8 bg-[#262640] text-white rounded-lg border-none focus:ring-2 focus:ring-[#7C2BD3]"
        />

        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleClearSelection}
            className="absolute inset-y-0 right-8 flex items-center text-white h-8 w-8 p-0 my-auto"
          >
            <X size={16} />
          </Button>
        )}

        <Button
          type="button"
          variant="ghost"
          onClick={() => setShowDropdown(!showDropdown)}
          className="absolute inset-y-0 right-0 flex items-center text-white h-8 w-8 p-0 my-auto"
        >
          <ChevronDown
            size={18}
            className={`transition-transform ${showDropdown ? "rotate-180" : ""
              }`}
          />
        </Button>
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-[#1E1E38] rounded-md shadow-lg border border-[#3A3A5A]"
        >
          {countryList.length > 0 ? (
            countryList.map((country) => (
              <div
                key={country.id}
                onClick={() => handleSelectCountry(country)}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-[#2A2A4A] transition"
              >
                <span className="text-white">{country.name}</span>
                {selectedCountry && selectedCountry.id === country.id && (
                  <Check size={16} className="text-[#7C2BD3]" />
                )}
              </div>
            ))
          ) : searchTerm ? (
            <div className="px-4 py-2 text-gray-400">No countries found</div>
          ) : (
            <div className="px-4 py-2 text-gray-400">
              Type to search countries
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
