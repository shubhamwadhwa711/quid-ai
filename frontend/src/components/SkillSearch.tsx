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
  onSelectSkill: (skill: Skill) => void;
  onRemoveSkill: (skillId: number) => void;
  profileId?: number;
}

const SkillSearch: React.FC<SkillSearchProps> = ({
  selectedSkills,
  onSelectSkill,
  onRemoveSkill,
  profileId,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const dispatch = useAppDispatch();

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
    }
  }, [debouncedValue, dispatch]);

  const handleAddSkill = (skill: Skill) => {
    if (!selectedSkills.some((s) => s.id === skill.id)) {
      onSelectSkill(skill);
    }
    setInputValue("");
  };

  const handleAddUnknownSkill = async () => {
    if (inputValue.trim()) {
      const newSkill = inputValue;

      try {
        // Create the skill in the backend first
        const result = await dispatch(postExpertise({ id: 0, name: newSkill })).unwrap();
        
        // Then add it to selected skills
        if (result && result.id) {
          onSelectSkill(result);
        }
        
        setInputValue("");
      } catch (error) {
        console.error("Failed to add skill:", error);
      }
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
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Available Skills - Inline Results */}
      {debouncedValue && expertise.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            Available Skills
          </h3>
          <div className="max-h-48 overflow-y-auto hide-scrollbar space-y-2">
            {expertise.map((skill) => (
              <div
                key={skill.id}
                onClick={() => handleAddSkill(skill)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition ${
                  selectedSkills.some((s) => s.id === skill.id)
                    ? 'bg-[#2A2A4A] border border-[#7C2BD3]'
                    : 'bg-[#1E1E38] hover:bg-[#2A2A4A] border border-[#3A3A5A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7C2BD3] to-[#075AA8] flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Skills */}
      <div className="mt-6 pt-6 border-t border-[#3A3A5A]">
        <h3 className="text-sm font-medium text-gray-400 mb-3">
          Selected Skills ({selectedSkills?.length || 0})
        </h3>
        <div className="flex flex-wrap gap-2 pb-20 max-h-64 overflow-y-auto hide-scrollbar">
        {selectedSkills?.map((skill) => (
          <Badge
            key={skill.id}
            variant="none"
            className="border-none text-xs whitespace-nowrap rounded-3xl bg-gradient-to-r from-[#2A2A4A] to-[#1E1E38] border border-[#3A3A5A] flex items-center px-3 py-2"
          >
            <span>{skill.name}</span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onRemoveSkill(skill.id)}
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

export default SkillSearch;
