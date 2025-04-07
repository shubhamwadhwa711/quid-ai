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
  }, []);
  return (
    <Card
      key={academic.id}
      className="bg-white overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300"
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">
              {academic.degree}
            </CardTitle>
            <CardDescription className="text-gray-600">
              <Badge variant="outline" className="bg-blue-50 text-blue-600">
                {academic.field_of_study}
              </Badge>
            </CardDescription>
          </div>
          <div>
            <EditAcademic academic={academic} />
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
            <div className="w-3/4 mt-2 text-sm text-gray-500 pt-2 border-t border-gray-100">
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
          onClick={() => onRemoveAcademics()}
        >
          <Trash size={16} className="mr-2" />
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export const AcademicCards = ({ academics }: { academics: Academic[] }) => {
  return (
    <div className="flex flex-wrap gap-2 pt-4">
      {academics &&
        academics.map((academic) => <AcademicCard academic={academic} />)}
      {academics.length <= 0 && "Add academics"}
    </div>
  );
};
