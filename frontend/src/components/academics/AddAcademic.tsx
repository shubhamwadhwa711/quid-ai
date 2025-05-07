import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import { fetchProfile, postAcademics } from "@/reducers/profile/profileSlice";
import { Plus } from "lucide-react";
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
        <Button variant="outline">
          <Plus size={16} className="mr-2" />
          Add Academic
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-md bg-gradient-to-br h-4/5 rounded-3xl from-black via-[#0F0F30] to-[#0F0F30] text-white">
        <DrawerHeader>
          <DrawerTitle>Add Academic Information</DrawerTitle>
          <DrawerDescription>
            Fill out the academic details below.
          </DrawerDescription>
        </DrawerHeader>

        <div className="grid gap-4 px-4 py-2 h-4/5 overflow-y-scroll">
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
  );
}
