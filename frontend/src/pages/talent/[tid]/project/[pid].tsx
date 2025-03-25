import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { fetchProject } from "@/reducers/project/projectSlice";
const ProjectView = () => {
  const { tid, pid } = useParams();
  const dispatch = useAppDispatch();
  const { project, loading, error } = useAppSelector((state) => state.Project);
  useEffect(() => {
    // console.log("dispatching profile...");
    dispatch(fetchProject({ tid, pid }));
  }, [dispatch]);
  console.log("project", project);
  return (
    <div className="py-20 px-10 max-w-md">
      <div key={pid} className="flex flex-col  gap-y-4">
        <h1 className="proxima-bold text-xl">{project?.title}</h1>
        <div className="flex gap-2">
          {project?.tag?.map((t) => (
            <Badge
              key={project.id}
              className="bg-white/30 border-none rounded-3xl proxima-FAQ"
              variant="none"
            >
              <span>{t.name}</span>
            </Badge>
          ))}
        </div>
        <div>
          <p className="text-sm">{project?.description}</p>
        </div>
        <div className="">
          <img className="rounded-xl" src={project?.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
