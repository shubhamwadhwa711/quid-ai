import AddAcademic from "./AddAcademic";
import { AcademicCards } from "./AcademicCard";

export interface Academic {
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
  defaultAcademics: Academic[];
}

const AcademicsSearch: React.FC<AcademicSearchProps> = ({
  profileID,
  defaultAcademics,
}) => {
  console.log("defaultAcademics", defaultAcademics);
  console.log("profileID", profileID);
  return (
    <div className="relative space-y-2">
      <AcademicCards academics={defaultAcademics} />
      <AddAcademic profileID={profileID} />
    </div>
  );
};

export default AcademicsSearch;
