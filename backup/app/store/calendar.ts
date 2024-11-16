import { create } from 'zustand'

interface CalendarState {
  selectedDate: string
  setSelectedDate: (date: string) => void
}

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: '',
  setSelectedDate: (date) => set({ selectedDate: date })
}))