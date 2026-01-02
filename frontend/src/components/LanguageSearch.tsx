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
  onSelectLanguage: (language: Language) => void;
  onRemoveLanguage: (languageId: number) => void;
}

const LanguageSearch: React.FC<LanguageSearchProps> = ({
  selectedLanguages,
  onSelectLanguage,
  onRemoveLanguage,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const dispatch = useAppDispatch();

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
    }
  }, [debouncedValue, dispatch]);

  const handleAddLanguage = (language: Language) => {
    if (!selectedLanguages.some((l) => l.id === language.id)) {
      onSelectLanguage(language);
    }
    setInputValue("");
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

      {/* Available Languages - Inline Results */}
      {debouncedValue && language.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            Available Languages
          </h3>
          <div className="max-h-48 overflow-y-auto hide-scrollbar space-y-2">
            {language.map((lang) => (
              <div
                key={lang.id}
                onClick={() => handleAddLanguage(lang)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition ${
                  selectedLanguages.some((l) => l.id === lang.id)
                    ? 'bg-[#2A2A4A] border border-[#7C2BD3]'
                    : 'bg-[#1E1E38] hover:bg-[#2A2A4A] border border-[#3A3A5A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7C2BD3] to-[#075AA8] flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{lang.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Languages */}
      <div className="mt-6 pt-6 border-t border-[#3A3A5A]">
        <h3 className="text-sm font-medium text-gray-400 mb-3">
          Selected Languages ({selectedLanguages?.length || 0})
        </h3>
        <div className="flex flex-wrap gap-2">
        {selectedLanguages?.map((language) => (
          <Badge
            key={language.id}
            variant="none"
            className="border-none text-xs whitespace-nowrap rounded-3xl bg-gradient-to-r from-[#2A2A4A] to-[#1E1E38] border border-[#3A3A5A] flex items-center px-3 py-2"
          >
            <span>{language.name}</span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onRemoveLanguage(language.id)}
              className="h-4 w-4 p-0 ml-2 hover:text-red-400"
            >
              <X size={12} />
            </Button>
          </Badge>
        ))}
      </div>
      </div>
    </div>
  );
};

export default LanguageSearch;
