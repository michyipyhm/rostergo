import { create } from 'zustand'

interface AuthState {
  phoneNumber: string
  isVerified: boolean
  isAuthenticated: boolean;
  setPhoneNumber: (phone: string) => void
  setVerified: (verified: boolean) => void
  login: () => void
  logout: () => void
}
export const useAuthStore = create<AuthState>((set) => ({
  phoneNumber: '',
  isVerified: false,
  isAuthenticated: false,

  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  setVerified: (verified) => set({ isVerified: verified }),

  login: () => {
    set({ isVerified: true })
  },
  logout: () => {
    set({ isVerified: false })
  }
}))


