import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  X,
  BookOpen,
  Plus,
  Trash,
  Calendar,
  School,
  Pencil,
} from "lucide-react";
import { fetchAcademics } from "@/reducers/filter/academics/academicsSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import {
  postAcademics,
  removeAcademics,
} from "@/reducers/profile/profileSlice";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { EditAcademicDrawer } from "./EditAcademicDrawer";

interface Academic {
  id: number;
  school: string;
  degree: string;
  field_of_study: string;
  start_year: string;
  end_year: string;
  description: string;
  profile: number;
}

interface AcademicSearchProps {
  profileID: number;
  selectedAcademics: Academic[];
  onSelectAcademics: (academic: Academic) => void;
}

const AcademicsSearch: React.FC<AcademicSearchProps> = ({
  profileID,
  selectedAcademics,
  onSelectAcademics,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [CreateAcademicDrawerOpen, setCreateAcademicDrawerOpen] =
    useState(false);
  const [EditAcademicDrawerOpen, setEditAcademicDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    school: "",
    degree: "",
    field_of_study: "",
    start_year: "",
    end_year: "",
    description: "",
    profile: profileID,
  });
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddAcademic = (academic: Academic) => {
    // if (!selectedAcademics.some((a) => a.id === academic.id)) {
    //   onSelectAcademic(academic);
    // }
    onSelectAcademics(academic);
    setInputValue("");
    setShowSuggestions(false);
  };
  const onRemoveAcademics = (academicId) => {
    // Remove the selected academic
    console.log("Remove academic", academicId);
    dispatch(removeAcademics({ id: profileID, eid: academicId }));
  };
  const handleAddUnknownAcademic = () => {
    if (inputValue.trim()) {
      const newAcademic: Academic = {
        id: Date.now(), // more stable than Math.random
        degree: inputValue,
      };
      onSelectAcademics(newAcademic);
      setInputValue("");
      setShowSuggestions(false);
    }
  };
  const handleEditSubmit = () => {};
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Dispatch action or API call here
    dispatch(postAcademics({ id: profileID, data: formData }));
    setCreateAcademicDrawerOpen(false);
  };
  const handleAcademicEditDrawer = (academicId) => {
    // Open the academic edit drawer
    // console.log("Open academic edit drawer", selectedAcademics);
    let index = selectedAcademics.findIndex((a) => a.id === academicId);
    // console.log("Index",index)
    setFormData(selectedAcademics[index]);
    setEditAcademicDrawerOpen(true);
  };
  const isUnknown =
    debouncedValue &&
    academics.length > 0 &&
    !academics.some((a) =>
      a.degree.toLowerCase().includes(debouncedValue.toLowerCase())
    );
  console.log("EditAcademicDrawerOpen", EditAcademicDrawerOpen);
  return (
    <div className="relative space-y-2">
      {/* Search Input */}
      {/* <div className="relative w-full">
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
      </div> */}

      {/* Suggestions Dropdown */}
      {/* {showSuggestions && academics.length > 0 && (
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
      )} */}

      {/* Selected Items */}
      <div className="flex flex-wrap gap-2 pt-4">
        {selectedAcademics.map((academic) => (
          <Card
            key={academic.id}
            className="bg-white overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300"
          >
            <CardHeader className=" pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-bold">
                    {academic.degree}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-600"
                    >
                      {academic.field_of_study}
                    </Badge>
                  </CardDescription>
                </div>
                <div>
                  <Button
                    onClick={() => handleAcademicEditDrawer(academic.id)}
                    variant="ghost"
                  >
                    <Pencil />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <span>
                    {academic.start_year} - {academic.end_year || "Present"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <School size={16} className="text-gray-400" />
                  <span>{academic.school}</span>
                </div>

                {academic.description && (
                  <div className="mt-2 text-sm text-gray-500 pt-2 border-t border-gray-100">
                    <p>{academic.description}</p>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="pt-2 pb-4 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                onClick={() => onRemoveAcademics(academic.id)}
              >
                <Trash size={16} className="mr-2" />
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Drawer
        open={CreateAcademicDrawerOpen}
        onOpenChange={setCreateAcademicDrawerOpen}
      >
        <DrawerTrigger asChild>
          <Button variant="outline">
            <Plus size={16} className="mr-2" />
            Add Academic
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add Academic Information</DrawerTitle>
            <DrawerDescription>
              Fill out the academic details below.
            </DrawerDescription>
          </DrawerHeader>

          <div className="grid gap-4 px-4 py-2">
            <div>
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="field_of_study">Field of Study</Label>
              <Input
                id="field_of_study"
                name="field_of_study"
                value={formData.field_of_study}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start_year">Start Year</Label>
                <Input
                  id="start_year"
                  name="start_year"
                  value={formData.start_year}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="end_year">End Year</Label>
                <Input
                  id="end_year"
                  name="end_year"
                  value={formData.end_year}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <DrawerFooter>
            <Button onClick={handleSubmit}>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* <EditAcademicDrawer
        open={EditAcademicDrawerOpen}
        onOpenChange={()=>{}}
        initialData={formData}
        onSubmit={handleEditSubmit}
      /> */}
    </div>
  );
};

export default AcademicsSearch;
