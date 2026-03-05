import { create } from "zustand";

interface AuthStore {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
    isAuthenticated: false,

    login: (password: string) => {
        if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
            set({ isAuthenticated: true });
            return true;
        }
        return false;
    },

    logout: () => set({ isAuthenticated: false }),
}));
