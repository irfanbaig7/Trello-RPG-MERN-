
import { create } from "zustand"

export const useGameStore = create((set) => ({

    level: 1,
    xp: 0,
    point: 0,
    completedTasks: 0,

    setStats: (stats) => {
        set({
            level: stats.level,
            xp: stats.xp,
            points: stats.points,
            completedTasks: stats.completedTasks,
        })
    }


}))
