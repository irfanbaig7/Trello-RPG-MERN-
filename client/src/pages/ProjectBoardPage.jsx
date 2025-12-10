import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useProject } from "../hooks/useProjectById";
import TaskCard from "../components/tasks/TaskCard";
import { DndContext } from "@dnd-kit/core";
import TaskColumn from "../components/tasks/TaskColumn";

function ProjectBoardPage() {
  const { id: projectId } = useParams();

  const { data: project, isLoading: projectLoading } = useProject(projectId);
  const { tasksQuery, createTask, updateStatus } = useTasks(projectId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Group tasks by status
  const tasks = tasksQuery.data || [];
  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  useEffect(() => {
    console.log(tasksQuery.data);
  }, [tasksQuery.data]);

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!title) return;

    createTask.mutate(
      { title, description },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
        },
      }
    );
  };

  const handleMoveTask = (taskId, status) => {
    updateStatus.mutate(
      { taskId, status }
    )
  }


  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    // same col me drag hua -> Ignore
    const oldStatus = active.data.current.status;
    if (oldStatus === newStatus) return;

    updateStatus.mutate({ taskId, status: newStatus })
  }


  if (projectLoading) return <p>Loading project...</p>;

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div>
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <p className="text-gray-600">{project.description}</p>
      </div>

      {/* Create Task */}
      <form
        onSubmit={handleCreateTask}
        className="p-4 border rounded space-y-3 max-w-md"
      >
        <h3 className="font-semibold">Create Task</h3>

        <input
          className="w-full border p-2 rounded"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          disabled={createTask.isPending}
          className={`px-4 py-2 rounded text-white ${createTask.isPending
            ? "bg-blue-400"
            : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {createTask.isPending ? "Creating..." : "Add Task"}
        </button>
      </form>

      {/* Kanban Columns */}
      {tasksQuery.isFetching ? (
        <p>Loading tasks...</p>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* TODO */}
            <TaskColumn id="todo" title="Todo">
              {todoTasks.map((task) => (
                <TaskCard key={task._id} task={task} onMove={handleMoveTask} />
              ))}
            </TaskColumn>

            <TaskColumn id="in_progress" title="In Progress">
              {inProgressTasks.map((task) => (
                <TaskCard key={task._id} task={task} onMove={handleMoveTask} />
              ))}
            </TaskColumn>

            <TaskColumn id="done" title="Done">
              {doneTasks.map((task) => (
                <TaskCard key={task._id} task={task} onMove={handleMoveTask} />
              ))}
            </TaskColumn>

          </div>
        </DndContext>
      )}
    </div>
  );
}

export default ProjectBoardPage;
