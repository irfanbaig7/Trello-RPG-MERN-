import { useState } from "react";
import Input from "../components/ui/Input.jsx";
import { useProjects } from "../hooks/useProjects.js";
import { Link } from "react-router-dom";

function DashboardPage() {

  const { projectQuery, createProject } = useProjects();

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Create project
  const handleCreate = (e) => {
    e.preventDefault();
    createProject.mutate(
      { name, description },
      {
        onSuccess: () => {
          setName("");
          setDescription("");
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Your Projects</h2>

      {/* Create Project Form */}
      <form onSubmit={handleCreate} className="space-y-3 p-4 border rounded">
        <Input
          label="Project Name"
          name="name"
          register={() => ({})} // not using RHF here
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Description"
          name="description"
          register={() => ({})}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          disabled={createProject.isPending}
          className={`w-full p-2 rounded text-white ${createProject.isPending
            ? "bg-green-400"
            : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {createProject.isPending ? "Creating..." : "Create Project"}
        </button>
      </form>

      {/* Project List */}
      {projectQuery.isLoading ? (
        <p>Loading projects...</p>
      ) : projectQuery.isError ? (
        <p className="text-red-500">Failed to load projects</p>
      ) : (
        <div className="space-y-3">
          {projectQuery.data.map((p) => (
            <div key={p._id} className="p-3 border rounded bg-gray-50">
              <Link to={`/project/${p._id}`}>
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-gray-600">{p.description}</p>
              </Link>
            </div>
          ))}

          {projectQuery.data.length === 0 && (
            <p className="text-gray-500">No projects yet. Create one!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
