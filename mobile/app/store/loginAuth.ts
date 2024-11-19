import { storageUtil } from "@/api/auth-api";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface LoginAuthStore {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}
const useLoginAuthStore = create(
    persist<LoginAuthStore>(
        (set) => ({
            isLoggedIn: false,
            login: async () => {
                const token = await storageUtil.getItem('token');
                if (token) {
                    set({ isLoggedIn: true });
                }
            },
            logout: async () => {
                try {
                    await storageUtil.removeItem('token');
                    set({ isLoggedIn: false });
                  } catch (error) {
                    console.error('Error during logout:', error);
                  }
            },
        }),
        {
            name: 'userLoginStatus',
        }
    )
);


export default useLoginAuthStore;