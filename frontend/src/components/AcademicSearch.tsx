import { useState } from "react";
import { useDispatch } from "react-redux";
import { Badge, Button } from "@/components/ui";
import { X, Book } from "lucide-react";
import { addAcademic, removeAcademic } from "@/store/academicSlice"; // Adjust path

interface AcademicSearchProps {
  selectedAcademics: { id: number; name: string }[];
}

const AcademicSearch: React.FC<AcademicSearchProps> = ({ selectedAcademics }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleAddAcademic = () => {
    if (!inputValue.trim()) return;
    dispatch(addAcademic({ id: Date.now(), name: inputValue }));
    setInputValue("");
  };

  return (
    <div className="space-y-2">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-3 flex items-center text-white">
          <Book />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add Academic Qualification"
          className="w-full p-2 pl-10 bg-[#262640] text-white rounded-3xl border-none focus:ring-2 focus:ring-[#7C2BD3]"
        />
      </div>

      <Button
        type="button"
        onClick={handleAddAcademic}
        className="bg-[#7C2BD3] text-white hover:bg-[#6620B0]"
      >
        Add Academic Qualification
      </Button>

      <div className="flex flex-wrap gap-2 pt-4">
        {selectedAcademics.map((academic) => (
          <Badge
            key={academic.id}
            variant="none"
            className="border-none text-xs whitespace-nowrap rounded-3xl bg-white/30 flex items-center"
          >
            <span>{academic.name}</span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => dispatch(removeAcademic(academic.id))}
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

export default AcademicSearch;
