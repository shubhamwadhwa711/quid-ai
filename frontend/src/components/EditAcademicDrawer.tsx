import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";

interface EditAcademicDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: {
    id: number;
    school: string;
    degree: string;
    field_of_study: string;
    start_year: number | string;
    end_year: number | string;
    description: string;
  };
  onSubmit: (updatedData: typeof initialData) => void;
}

export function EditAcademicDrawer({
  open,
  onOpenChange,
  initialData,
  onSubmit,
}: EditAcademicDrawerProps) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Academic Information</DrawerTitle>
          <DrawerDescription>You can update your academic details here.</DrawerDescription>
        </DrawerHeader>

        <div className="grid gap-4 px-4 py-2">
          <div>
            <Label htmlFor="school">School</Label>
            <Input id="school" name="school" value={formData.school} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="degree">Degree</Label>
            <Input id="degree" name="degree" value={formData.degree} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="field_of_study">Field of Study</Label>
            <Input id="field_of_study" name="field_of_study" value={formData.field_of_study} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_year">Start Year</Label>
              <Input id="start_year" name="start_year" value={formData.start_year} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="end_year">End Year</Label>
              <Input id="end_year" name="end_year" value={formData.end_year} onChange={handleChange} />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
          </div>
        </div>

        <DrawerFooter>
          <Button onClick={handleSubmit}>Save Changes</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
