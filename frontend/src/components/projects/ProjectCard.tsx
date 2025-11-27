import { Project } from "@/reducers/project/projectSlice";
import { Card, CardTitle } from "../ui/card";
import { ProjectEditForm } from "./ProjectEditForm";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card
      className="hover:shadow-md border-none relative bg-gray-800 transition flex-shrink-0 w-44 h-48"
    >
      <div className="relative h-4/5">
        <img
          src={project?.image || "/AI.jpg"}
          alt={project?.title}
          className="w-full h-full object-fill rounded-t-lg"
        />
      </div>
      <ProjectEditForm initialProject={project} />
      <div className="h-1/5 flex  flex-col justify-between p-1">
        <CardTitle className="text-xs text-center text-wrap text-white ">
          {project.title}
        </CardTitle>
      </div>
    </Card>
  );
};
