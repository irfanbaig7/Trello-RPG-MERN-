import { create } from "zustand"

export const useAuthStore = create((set) => ({

    user: null,
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"),


    // Set user after login/register

    setAuth: (user, token) => set(() => {

        // Save token in localStorage
        localStorage.setItem("token", token);

        return {
            user,
            token,
            isLoggedIn: true,
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

}))