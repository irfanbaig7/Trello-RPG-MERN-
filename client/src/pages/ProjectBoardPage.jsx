import { useParams } from "react-router-dom";
import { useProject } from "../hooks/useProjectById";


function ProjectBoardPage() {
  const { id } = useParams(); // read URL :id
  const { data, isLoading, isError } = useProject(id);

  if (isLoading) return <p>Loading project...</p>;
  if (isError) return <p className="text-red-500">Failed to load project</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{data.name}</h2>
      <p className="text-gray-600">{data.description}</p>

      <hr />

      {/* Tasks will come here in next steps */}
      <p className="text-gray-500">Tasks will be displayed here...</p>
    </div>
  );
}

export default ProjectBoardPage;
