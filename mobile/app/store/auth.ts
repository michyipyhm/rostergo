import { create } from 'zustand'

interface AuthState {
  phoneNumber: string
  isVerified: boolean
  isAuthenticated: boolean;
  setPhoneNumber: (phone: string) => void
  setVerified: (verified: boolean) => void
  login: () => void
  logout: () => void
  token: string | null;
  userId: string | null;
  setAuth: (token: string, userId: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  phoneNumber: '',
  isVerified: false,
  isAuthenticated: false,

  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  setVerified: (verified) => set({ isVerified: verified }),

  
  token: null,
  userId: null,
  setAuth: (token, userId) => set({ token, userId }),
  clearAuth: () => set({ token: null, userId: null }),
  login: () => {
    set({ isVerified: true })
  },
  logout: () => {
    set({ isVerified: false })
  }
}))


