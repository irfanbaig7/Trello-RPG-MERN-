import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function TaskCard({ task, onMove }) {


    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task._id,
        data: {
            status: task.status
        }
    })

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1
    }


    return (
        <div ref={setNodeRef} style={style} className="p-3 border rounded bg-white shadow-sm space-y-2">
            <div className="cursor-grab font-semibold" {...listeners} {...attributes}>
                <h4 className="font-semibold">{task.title}</h4>

                {task.description && (
                    <p className="text-sm text-gray-600">{task.description}</p>
                )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 text-xs">
                {task.status === "todo" && (
                    <button
                        onClick={() => onMove(task._id, "in_progress")}
                        className="px-2 py-1 bg-yellow-200 rounded"
                    >
                        Start
                    </button>
                )}

                {task.status === "in_progress" && (
                    <>
                        <button
                            onClick={() => onMove(task._id, "todo")}
                            className="px-2 py-1 bg-gray-200 rounded"
                        >
                            Back
                        </button>

                        <button
                            onClick={() => onMove(task._id, "done")}
                            className="px-2 py-1 bg-green-200 rounded"
                        >
                            Done
                        </button>
                    </>
                )}

                {task.status === "done" && (
                    <button
                        onClick={() => onMove(task._id, "in_progress")}
                        className="px-2 py-1 bg-blue-200 rounded"
                    >
                        Reopen
                    </button>
                )}
            </div>
        </div>
    );
}

export default TaskCard;
