import {axiosClient} from "./axiosClient.js"

export const statsApi = {
    getMyStats: () => axiosClient.get("/stats/me")
}
