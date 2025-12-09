import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { taksApi } from "../api/taskApi";

export function useTasks(projectId) {
    const queryClient = useQueryClient();

    // fetch the tasks
    const tasksQuery = useQuery({
        queryKey: ["tasks", projectId],
        queryFn: () => taksApi.getByProject(projectId).then((res) => res.data.tasks),
        enabled: !!projectId,
    })

    // Create task
    const createTask = useMutation({
        mutationFn: (data) => taksApi.create(projectId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks", projectId])
        }
    })

    return { tasksQuery, createTask }

}
