import React from 'react'

const TaskCard = ({ task }) => {
    console.log("this is task", task);
    
    return (
        <div className="p-3 border rounded bg-white shadow-sm">
            <h4 className="font-semibold">{task.title}</h4>
            {task.description && (
                <p className="text-sm text-gray-600">{task.description}</p>
            )}
        </div>
    )
}

export default TaskCard