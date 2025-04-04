import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, Globe } from "lucide-react";
import { fetchLanguage } from "@/reducers/filter/language/languageSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

interface Language {
  id: number;
  name: string;
}

interface LanguageSearchProps {
  selectedLanguages: Language[];
  onSelectLanguage: (language: string) => void;
  onRemoveLanguage: (languageId: number) => void;
}

const LanguageSearch: React.FC<LanguageSearchProps> = ({
  selectedLanguages,
  onSelectLanguage,
  onRemoveLanguage,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { language } = useAppSelector((state) => state.Language);

  // Debounce Input Value
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue]);

  // Fetch suggestions when debouncedValue changes
  useEffect(() => {
    if (debouncedValue.trim()) {
        console.log("debouncedValue",debouncedValue)
      dispatch(fetchLanguage({ search: debouncedValue }));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [debouncedValue, dispatch]);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddLanguage = (language: Language) => {
    if (!selectedLanguages.some((l) => l.id === language.id)) {
      onSelectLanguage(language);
    }
    setInputValue("");
    setShowSuggestions(false);
  };
  console.log("INSIDE LANGUAGES")
  return (
    <div className="relative space-y-2">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-3 flex items-center text-white">
          <Globe />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for languages..."
          className="w-full p-2 pl-10 bg-[#262640] text-white rounded-3xl border-none focus:ring-2 focus:ring-[#7C2BD3]"
        />
      </div>

      {/* Suggestion Dropdown */}
      {showSuggestions && language.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-[#262640] rounded-lg shadow-lg max-h-40 overflow-y-auto"
        >
          {language.map((language) => (
            <div
              key={language.id}
              onClick={() => handleAddLanguage(language)}
              className="p-2 cursor-pointer hover:bg-[#7C2BD3] text-white"
            >
              {language.name}
            </div>
          ))}
        </div>
      )}

      {/* Selected Languages */}
      <div className="flex flex-wrap gap-2 pt-4">
        {selectedLanguages.map((language) => (
          <Badge
            key={language.id}
            variant="none"
            className="border-none text-xs whitespace-nowrap rounded-3xl bg-white/30 flex items-center"
          >
            <span>{language.name}</span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onRemoveLanguage(language.id)}
              className="h-4 w-4 p-0 ml-1"
            >
              <X size={10} />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default LanguageSearch;
