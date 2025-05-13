import { Trash, Calendar, School, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Academic } from "./AcademicsSearch";
import { fetchProfile, removeAcademics } from "@/reducers/profile/profileSlice";
import { useCallback } from "react";
import { EditAcademic } from "./EditAcademic";
import { useAppDispatch } from "@/store/store";

export const AcademicCard = ({ academic }: { academic: Academic }) => {
  const dispatch = useAppDispatch();

  const onRemoveAcademics = useCallback(() => {
    dispatch(removeAcademics({ id: academic.profile, eid: academic.id }))
   .unwrap()
   .then(() => {
     dispatch(fetchProfile());
   })
   .catch((error) => {
     console.error("Error removing academic:", error);
   });
  }, [dispatch,academic.profile, academic.id]);

  return (
    <Card key={academic.id} className="bg-white h-40">
      <CardHeader className="p-0">
        <div className="flex justify-between items-start">
          <div className="p-4">
            <CardTitle className="text-base text-black font-semibold truncate">
              {academic.degree}
            </CardTitle>
           
          </div>
          <EditAcademic academic={academic} />
        </div>
      </CardHeader>

      <CardContent className="-mt-4">
        <div className="text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-gray-400" />
            <span>
              {academic.start_year} - {academic.end_year || "Present"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <School size={14} className="text-gray-400" />
            <span className="truncate">{academic.school}</span>
          </div>

          {academic.description && (
            <div className="mt-1 text-xs text-gray-500 line-clamp-3">
              {academic.description}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="-mt-4">
        <Button
          variant="destructive"
          size="sm"
          className=" hover:bg-red-50  transition-colors h-8 text-xs"
          onClick={onRemoveAcademics}
        >
          <Trash size={14} />
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export const AcademicCards = ({ academics }: { academics: Academic[] }) => {
  return (
    <div
      className="grid grid-cols-1 overflow-y-auto gap-1 mb-24"
     
    >
      {academics?.length > 0 ? (
        academics.map((academic) => (
          <AcademicCard key={academic.id} academic={academic} />
        ))
      ) : (
        <p className="text-gray-500">Add academics</p>
      )}
    </div>
  );
};