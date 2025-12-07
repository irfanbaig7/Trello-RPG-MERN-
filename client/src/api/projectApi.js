import { axiosClient } from "./axiosClient";

export const projectApi = {
    getAll: () => axiosClient.get("/projects"),
    create: (data) => axiosClient.post("/projects", data),
    getOne: (id) => axiosClient.get(`/projects/${id}`),
};
