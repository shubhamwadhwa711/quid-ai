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
    <div className="relative group">
      <div className="bg-gradient-to-br from-[#1E1E38] to-[#0F0F30] rounded-xl p-4 border border-[#3A3A5A] hover:border-[#7C2BD3] transition-all duration-300 hover:shadow-lg hover:shadow-[#7C2BD3]/20">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7C2BD3] to-[#075AA8] flex items-center justify-center flex-shrink-0">
                <School className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white leading-tight">
                  {academic.degree}
                </h3>
                {academic.field_of_study && (
                  <p className="text-sm text-gray-400">
                    {academic.field_of_study}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-1">
            <EditAcademic academic={academic} />
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10"
              onClick={onRemoveAcademics}
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>

        {/* School Name */}
        <div className="mb-3">
          <p className="text-white font-medium">{academic.school}</p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <Calendar size={14} />
          <span>
            {academic.start_year} - {academic.end_year || "Present"}
          </span>
        </div>

        {/* Description */}
        {academic.description && (
          <div className="mt-3 pt-3 border-t border-[#3A3A5A]">
            <p className="text-sm text-gray-300 line-clamp-3">
              {academic.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const AcademicCards = ({ academics }: { academics: Academic[] }) => {
  return (
    <div
      className="grid grid-cols-1 overflow-y-scroll hide-scrollbar max-h-96  gap-1 mb-24 pb-20"
     
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