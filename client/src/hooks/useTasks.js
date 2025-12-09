import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { taksApi } from "../api/taskApi";

export function useTasks(projectId) {

    const queryClient = useQueryClient()

    // fetch the tasks
    const tasksQuery = useQuery({
        queryKey: ["tasks", projectId],
        queryFn: () => taksApi.getByProject(projectId).then((res) => res.data.tasks),
        // queryFn: async () => {
        //     const res = await taksApi.getByProject(projectId);
        //     return res.data.tasks;
        // },
        enabled: !!projectId,
        staleTime: 1000 * 60,        // ✅ 1 minute cache fresh
        refetchOnWindowFocus: false // ✅ tab switch pe refetch nahi
    })




    // Create task
    const createTask = useMutation({
        mutationFn: (data) => taksApi.create(projectId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks", projectId],
            });
            // tasksQuery.refetch();
        }
    })

    // Update task status
    const updateStatus = useMutation({
        mutationFn: ({ taskId, status }) =>
            taksApi.updateStatus(taskId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks", projectId],
            });
            // tasksQuery.refetch();
        }

    })

    return { tasksQuery, createTask, updateStatus }

}
