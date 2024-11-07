import { create } from 'zustand'

interface AuthState {
  phoneNumber: string
  isVerified: boolean
  setPhoneNumber: (phone: string) => void
  setVerified: (verified: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  phoneNumber: '',
  isVerified: false,
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  setVerified: (verified) => set({ isVerified: verified })
}))