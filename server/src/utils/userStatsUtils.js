import UserStats from "../models/UserStats.js"

export const getOrCreateUserStats = async (userId) => {
    let stats = await UserStats.findOne({ userId })

    if (!stats) {
        stats = await UserStats.create({
            userId,
            level: 1,
            xp: 0,
            points: 0,
            completedTask: 0,

        })
    }

    return stats
}


export const applyTaskCompletionReward = async (userId, taskPoints) => {
    const stats = await getOrCreateUserStats(userId);

    stats.xp += taskPoints;           // XP increase
    stats.points += taskPoints;       // Points
    stats.completedTasks += 1;        // Count

    stats.level = calculateLevel(stats.xp);

    await stats.save();

    return stats;
};
