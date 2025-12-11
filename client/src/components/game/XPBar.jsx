import React from 'react'
import { useGameStore } from '../../store/useGameStore'

const XPBar = () => {

    const { level, xp } = useGameStore()

    const nextLevelXp = level === 1 ? 100 : level * 200;
    const percent = Math.min((xp / nextLevelXp) * 100, 100)

    return (
        <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
                <span>Level {level}</span>
                <span>{xp} / {nextLevelXp} XP</span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded">
                <div
                    className="h-2 bg-green-500 rounded transition-all"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    )
}

export default XPBar