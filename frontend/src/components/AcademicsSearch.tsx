import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, BookOpen, Plus } from "lucide-react";
import { fetchAcademics } from "@/reducers/filter/academics/academicsSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

interface Academic {
  id: number;
  degree: string;
}

interface AcademicSearchProps {
  selectedAcademics: Academic[];
  onSelectAcademic: (academic: Academic) => void;
  onRemoveAcademic: (academicId: number) => void;
}

const AcademicsSearch: React.FC<AcademicSearchProps> = ({
  selectedAcademics,
  onSelectAcademic,
  onRemoveAcademic,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const { academics, loading } = useAppSelector((state) => state.Academics);
    console.log("academics", academics);
    console.log("selected academics", selectedAcademics);
  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue]);

  // Fetch academics
  useEffect(() => {
    if (debouncedValue.trim()) {
      dispatch(fetchAcademics({ search: debouncedValue }));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [debouncedValue, dispatch]);

  // Close suggestion box on outside click
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddAcademic = (academic: Academic) => {
    if (!selectedAcademics.some((a) => a.id === academic.id)) {
      onSelectAcademic(academic);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleAddUnknownAcademic = () => {
    if (inputValue.trim()) {
      const newAcademic: Academic = {
        id: Date.now(), // more stable than Math.random
        degree: inputValue,
      };
      onSelectAcademic(newAcademic);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const isUnknown =
    debouncedValue &&
    academics.length > 0 &&
    !academics.some((a) =>
      a.degree.toLowerCase().includes(debouncedValue.toLowerCase())
    );

  return (
    <div className="relative space-y-2">
      {/* Search Input */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-3 flex items-center text-white">
          <BookOpen />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for academic subjects..."
          className="w-full p-2 pl-10 bg-[#262640] text-white rounded-3xl border-none focus:ring-2 focus:ring-[#7C2BD3]"
        />
        {isUnknown && (
          <button
            type="button"
            onClick={handleAddUnknownAcademic}
            className="absolute inset-y-0 right-3 flex items-center justify-center bg-[#7C2BD3] hover:bg-[#5B1FA8] text-white rounded-full p-1"
          >
            <Plus size={16} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && academics.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-[#262640] rounded-lg shadow-lg max-h-40 overflow-y-auto"
        >
          {academics.map((academic) => (
            <div
              key={academic?.id}
              onClick={() => handleAddAcademic(academic)}
              className="p-2 cursor-pointer hover:bg-[#7C2BD3] text-white"
            >
              {academic?.degree}
            </div>
          ))}
        </div>
      )}

      {/* Selected Items */}
      <div className="flex flex-wrap gap-2 pt-4">
        {selectedAcademics.map((academic) => (
          <Badge
            key={academic?.id}
            variant="none"
            className="border-none text-xs whitespace-nowrap rounded-3xl bg-white/30 flex items-center"
          >
            <span>{academic?.degree}</span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onRemoveAcademic(academic.id)}
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

export default AcademicsSearch;
