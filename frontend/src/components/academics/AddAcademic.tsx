import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import { fetchProfile, postAcademics } from "@/reducers/profile/profileSlice";
import { Plus, School, GraduationCap, BookOpen, Calendar, FileText } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export type AddAcademicProps = {
  profileID: number;
  initialData?: any;
  defaultOpen?: boolean;
};
export default function AddAcademic({
  profileID,
  initialData,
  defaultOpen = false,
}: AddAcademicProps) {
  const dispatch = useAppDispatch();
  const [isOpen, onOpenChange] = useState<boolean>(defaultOpen);
  const [formData, setFormData] = useState({
    id: null,
    school: "",
    degree: "",
    field_of_study: "",
    start_year: "",
    end_year: "",
    description: "",
    profile: profileID,
    ...initialData,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    console.log("formData", formData);
    dispatch(postAcademics({ id: profileID, data: formData }))
    .unwrap()
      .then(() => {
        console.log("added academics ");
        onOpenChange(false);
        dispatch(fetchProfile());
      })
      .catch((error) => {
        console.error("Error adding academic:", error);
      });
  };
  return (
    <Drawer key={"add-academics"} open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="w-full h-24 rounded-xl border-2 border-dashed border-[#3A3A5A] hover:border-[#7C2BD3] transition-all duration-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-white hover:bg-[#1E1E38]/50"
        >
          <Plus className="w-6 h-6" />
          <span className="text-sm font-medium">Add Academic Credential</span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-md bg-gradient-to-br h-4/5 rounded-3xl from-black via-[#0F0F30] to-[#0F0F30] text-white border-[#3A3A5A]">
        <DrawerHeader className="border-b border-[#3A3A5A]">
          <DrawerTitle className="text-xl">Add Academic Credential</DrawerTitle>
          <DrawerDescription className="text-gray-400">
            Add your educational background and qualifications
          </DrawerDescription>
        </DrawerHeader>

        <div className="grid gap-4 px-4 py-4 h-4/5 overflow-y-scroll">
          <div className="space-y-2">
            <Label htmlFor="school" className="text-white font-medium flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#7C2BD3] to-[#075AA8] flex items-center justify-center">
                <School className="w-3 h-3 text-white" />
              </div>
              School/University *
            </Label>
            <Input
              id="school"
              name="school"
              placeholder="e.g., Harvard University"
              value={formData.school}
              onChange={handleChange}
              className="bg-[#262640] border-[#3A3A5A] focus:border-[#7C2BD3] text-white rounded-xl h-11 focus:ring-[#7C2BD3]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="degree" className="text-white font-medium flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#075AA8] to-[#7C2BD3] flex items-center justify-center">
                <GraduationCap className="w-3 h-3 text-white" />
              </div>
              Degree *
            </Label>
            <Input
              id="degree"
              name="degree"
              placeholder="e.g., Bachelor of Science"
              value={formData.degree}
              onChange={handleChange}
              className="bg-[#262640] border-[#3A3A5A] focus:border-[#7C2BD3] text-white rounded-xl h-11 focus:ring-[#7C2BD3]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field_of_study" className="text-white font-medium flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#7C2BD3] to-[#075AA8] flex items-center justify-center">
                <BookOpen className="w-3 h-3 text-white" />
              </div>
              Field of Study
            </Label>
            <Input
              id="field_of_study"
              name="field_of_study"
              placeholder="e.g., Computer Science"
              value={formData.field_of_study}
              onChange={handleChange}
              className="bg-[#262640] border-[#3A3A5A] focus:border-[#7C2BD3] text-white rounded-xl h-11 focus:ring-[#7C2BD3]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_year" className="text-white font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                Start Year *
              </Label>
              <Input
                id="start_year"
                name="start_year"
                type="number"
                placeholder="2018"
                value={formData.start_year}
                onChange={handleChange}
                className="bg-[#262640] border-[#3A3A5A] focus:border-[#7C2BD3] text-white rounded-xl h-11 focus:ring-[#7C2BD3]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_year" className="text-white font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                End Year
              </Label>
              <Input
                id="end_year"
                name="end_year"
                type="number"
                placeholder="2022"
                value={formData.end_year}
                onChange={handleChange}
                className="bg-[#262640] border-[#3A3A5A] focus:border-[#7C2BD3] text-white rounded-xl h-11 focus:ring-[#7C2BD3]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white font-medium flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Relevant coursework, achievements, activities, etc."
              value={formData.description}
              onChange={handleChange}
              className="bg-[#262640] border-[#3A3A5A] focus:border-[#7C2BD3] text-white rounded-xl min-h-[100px] resize-none focus:ring-[#7C2BD3]"
            />
          </div>
        </div>

        <DrawerFooter className="border-t border-[#3A3A5A]">
          <Button 
            onClick={handleSubmit}
            disabled={!formData.school || !formData.degree || !formData.start_year}
            className="w-full bg-gradient-to-r from-[#7C2BD3] to-[#075AA8] hover:from-[#6A24B8] hover:to-[#064A90] text-white font-semibold h-11 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Academic Credential
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full border-[#3A3A5A] text-gray-300 hover:bg-[#262640] h-11 rounded-xl">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
