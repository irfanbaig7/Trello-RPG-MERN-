import { useQuery } from "@tanstack/react-query";
import { projectApi } from "../api/projectApi";

export function useProject(id) {
    return useQuery({
        queryKey: ["project", id],
        queryFn: () => projectApi.getOne(id).then((res) => res.data.project),
        enabled: !!id, // only fetch when id exists
    });
}
