import axios from "axios"

export const axiosClient = axios.create({
    baseURL: "http://localhost:3500/api",
    headers: {
        "Content-Type": "application/json",
    }
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

})

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(" Api Error  : ", error.response?.data || error.message);
        return Promise.reject(error);
    }
)
