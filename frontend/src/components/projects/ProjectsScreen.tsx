import { Project } from "@/reducers/project/projectSlice";
import { ProjectAddForm } from "./ProjectAddForm";
import { ProjectCard } from "./ProjectCard";

type ProjectsScreenProps = {
  projects: Project[];
  profileId:number;
};
export default function ProjectsScreen({ projects,profileId }: ProjectsScreenProps) {
  return (
    <div className="w-full max-w-2xl p-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="h-2.5 w-2.5 rounded-full bg-orange-500"></div>
          <h2 className="text-xl proxima-regular">RECENT PROJECTS</h2>
        </div>
        <ProjectAddForm profileId={profileId} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
        {projects?.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </div>
    </div>
  );
}
