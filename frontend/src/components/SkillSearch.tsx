import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, Brain, Plus } from "lucide-react";
import {
  fetchExpertise,
  postExpertise,
} from "@/reducers/filter/expertise/expertiseSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

interface Skill {
  id: number;
  name: string;
}

interface SkillSearchProps {
  selectedSkills: Skill[];
  onSelectSkill: (skill: string) => void;
  onRemoveSkill: (skillId: number) => void;
}

const SkillSearch: React.FC<SkillSearchProps> = ({
  selectedSkills,
  onSelectSkill,
  onRemoveSkill,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { expertise } = useAppSelector((state) => state.Expertise);

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
      dispatch(fetchExpertise({ search: debouncedValue }));
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

  const handleAddSkill = (skill: Skill) => {
    if (!selectedSkills.some((s) => s.id === skill.id)) {
      onSelectSkill(skill);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleAddUnknownSkill = () => {
    if (inputValue.trim()) {
      const newSkill = inputValue;

      dispatch(postExpertise({ name: newSkill }));
      // onSelectSkill(newSkill);
      // setInputValue("");
      // setShowSuggestions(false);
    }
  };

  const isUnknownSkill =
    debouncedValue &&
    !expertise.some((skill) =>
      skill.name.toLowerCase().includes(debouncedValue.toLowerCase())
    );

  return (
    <div className="relative space-y-2">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-3 flex items-center text-white">
          <Brain />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for skills..."
          className="w-full p-2 pl-10 bg-[#262640] text-white rounded-3xl border-none focus:ring-2 focus:ring-[#7C2BD3]"
        />
        {isUnknownSkill && (
          <Button
            type="button"
            onClick={handleAddUnknownSkill}
            className="absolute inset-y-0 right-3 flex items-center justify-center bg-gradient-to-tr from-[#7C2BD3] to-[#075AA8] text-white rounded-full p-2.5"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1V15M1 8H15"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        )}
      </div>

      {/* Suggestion Dropdown */}
      {showSuggestions && expertise.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-[#262640] rounded-lg shadow-lg max-h-40 overflow-y-auto"
        >
          {expertise.map((skill) => (
            <div
              key={skill.id}
              onClick={() => handleAddSkill(skill)}
              className="p-2 cursor-pointer hover:bg-[#7C2BD3] text-white"
            >
              {skill.name}
            </div>
          ))}
        </div>
      )}

      {/* Selected Skills */}
      <div className="flex flex-wrap gap-2 pt-4 pb-20 overflow-y-scroll overflow-x-hidden max-h-96 hide-scrollbar">
        {selectedSkills?.map((skill) => (
          <Badge
            key={skill.id}
            variant="none"
            className="border-none text-xs whitespace-nowrap rounded-3xl bg-white/30 flex items-center"
          >
            <span>{skill.name}</span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onRemoveSkill(skill.id)}
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

export default SkillSearch;
