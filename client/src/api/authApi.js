import { axiosClient } from "./axiosClient";

export const authApi = {
    login: (data) => axiosClient.post("/auth/login", data),
    register: (data) => axiosClient.post("/auth/register", data),
    getProfile: () => axiosClient.get("/auth/me"),
}