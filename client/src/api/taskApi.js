import { axiosClient } from "./axiosClient";

export const taksApi = {
    getByProject: (projectId) => {
        axiosClient.get(`/tasks/project/${projectId}`)
    },
    create: (projectId, data) => {
        axiosClient.post(`/tasks/project/${projectId}`, data)
    },
    updateStatus: (taskId, status) => {
        axiosClient.patch(`/tasks/${taskId}/status`, { status })
    }
}