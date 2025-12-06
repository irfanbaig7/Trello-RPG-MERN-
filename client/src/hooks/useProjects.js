import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../api/projectApi";

export function useProjects() {
    const queryClient = useQueryClient();

    // fetch the projects
    const projectQuery = useQuery({
        queryKey: ['projects'],
        queryFn: () => projectApi.getAll().then((res) => res.data.projects)
    })

    // create a project
    const createProject = useMutation({
        mutationFn: (data) => projectApi.create(data),
        onSuccess: () => {
            // Refetch project list
            queryClient.invalidateQueries(["projects"]);
        }
    })

    return { projectQuery, createProject }

}

