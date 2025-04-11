import { useState, useCallback, useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { fetchProfile, updateAcademics } from "@/reducers/profile/profileSlice";
import { Academic } from "./AcademicsSearch";
import { DialogTrigger } from "../ui/dialog";

// Edit Academic Component - Handles editing existing academic entries
export const EditAcademic = ({ academic }: { academic: Academic }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: academic.id,
    school: academic.school || "",
    degree: academic.degree || "",
    field_of_study: academic.field_of_study || "",
    start_year: academic.start_year || "",
    end_year: academic.end_year || "",
    description: academic.description || "",
    profile: academic.profile,
  });

  const dispatch = useAppDispatch();

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(() => {
    dispatch(
      updateAcademics({
        id: academic?.profile,
        eid: formData.id,
        data: formData,
      })
    )
      .unwrap()
      .then(() => {
        console.log("updated profile ");
        setOpen(false);
        dispatch(fetchProfile());
      })
      .catch((error) => {
        console.error("Error updating academic:", error);
      });
  }, [formData, dispatch]);

  const resetFormOnClose = useCallback(() => {
    if (!open) {
      setFormData({
        id: academic.id,
        school: academic.school || "",
        degree: academic.degree || "",
        field_of_study: academic.field_of_study || "",
        start_year: academic.start_year || "",
        end_year: academic.end_year || "",
        description: academic.description || "",
        profile: academic.profile,
      });
    }
  }, [academic, open]);

  // Reset form data when component mounts or academic prop changes
  useEffect(() => {
    resetFormOnClose();
  }, [academic, resetFormOnClose]);

  return (
    <Drawer
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetFormOnClose();
      }}
      onClose={resetFormOnClose}
      nested={true}
      key={"edit-academics"}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} variant="ghost">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DrawerContent className="mx-auto max-w-md bg-gradient-to-br h-4/5 rounded-3xl from-black via-[#0F0F30] to-[#0F0F30] text-white">
        <DrawerHeader>
          <DrawerTitle>Edit Academic Information</DrawerTitle>
          <DrawerDescription>
            Update the academic details below.
          </DrawerDescription>
        </DrawerHeader>

        <div className="grid gap-4 px-4 py-2 h-4/5 overflow-y-scroll">
          <div>
            <Label htmlFor="edit-school">School</Label>
            <Input
              id="edit-school"
              name="school"
              value={formData.school}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="edit-degree">Degree</Label>
            <Input
              id="edit-degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="edit-field_of_study">Field of Study</Label>
            <Input
              id="edit-field_of_study"
              name="field_of_study"
              value={formData.field_of_study}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-start_year">Start Year</Label>
              <Input
                id="edit-start_year"
                name="start_year"
                value={formData.start_year}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="edit-end_year">End Year</Label>
              <Input
                id="edit-end_year"
                name="end_year"
                value={formData.end_year}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <DrawerFooter>
          <Button onClick={handleSubmit}>Update</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
