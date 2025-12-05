import { useEffect } from "react";
import { useState } from "react";
import { projectApi } from "../api/projectApi.js";
import Input from "../components/ui/Input.jsx";

function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [setError] = useState(null);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Fetch projects on mount
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectApi.getAll();
      setProjects(res.data.projects);
    } catch (err) {
      setError("Could not load projects");
      console.log("Error inside fetchProjects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create project
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setCreateLoading(true);
      await projectApi.create({ name, description });

      // Refresh list
      fetchProjects();

      // Clear form
      setName("");
      setDescription("");
    } catch (err) {
      console.log("Error inside handleCreate", err.message);
    } finally {
      setCreateLoading(false);
    }
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
          disabled={createLoading}
          className={`w-full p-2 rounded text-white ${createLoading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {createLoading ? "Creating..." : "Create Project"}
        </button>
      </form>

      {/* Project List */}
      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p._id} className="p-3 border rounded bg-gray-50">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-gray-600">{p.description}</p>
            </div>
          ))}

          {projects.length === 0 && (
            <p className="text-gray-500">No projects yet. Create one!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
