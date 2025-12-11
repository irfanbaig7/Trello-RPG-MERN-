import { statsApi } from "../api/statsApi";
import { useGameStore } from "../store/useGameStore";
import { useQuery } from "@tanstack/react-query"


export function useUserStats() {
    const setStats = useGameStore((s) => s.setStats);

    return useQuery({
        queryKey: ["user-stats"],
        queryFn: async () => {
            const res = await statsApi.getMyStats();
            if (res.data.stats) {
                setStats(res.data.stats);
            }
            return res.data.stats;
        },
    });
}