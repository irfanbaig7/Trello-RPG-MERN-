import { create } from "zustand"

export const useAuthStore = create((set) => ({

    user: null,
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"),
    loading: false,
    error: null,



    // Set user after login/register

    setAuth: (user, token) => set(() => {

        // Save token in localStorage
        localStorage.setItem("token", token);

        return {
            user,
            token,
            isLoggedIn: true,
            loading: false,
            error: null,
        };

    }),

    // Logout

    logout: () =>
        set(() => {
            localStorage.removeItem("token");

            return {
                user: null,
                token: null,
                isLoggedIn: false,
            };
        }),

    setLoading: (value) => set({ loading: value }),

    setError: (msg) => set({ error: msg, loading: false }),

}))