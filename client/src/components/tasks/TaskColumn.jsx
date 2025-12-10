import { useDroppable } from "@dnd-kit/core";

function TaskColumn({ id, title, children }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`p-3 rounded border min-h-[200px] transition ${isOver ? "bg-blue-50" : "bg-gray-50"
                }`}
        >
            <h3 className="font-semibold mb-2">{title}</h3>
            <div className="space-y-2">{children}</div>
        </div>
    );
}

export default TaskColumn;
