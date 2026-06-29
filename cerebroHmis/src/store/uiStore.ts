import { create } from 'zustand'

type PatientTab = 'history' | 'diagnoses' | 'rx' | 'notes' | 'labs'

interface UIStore {
  darkMode: boolean
  toggleDarkMode: () => void
  labPreviewOpen: boolean
  setLabPreviewOpen: (open: boolean) => void
  activePatientTab: PatientTab
  setActivePatientTab: (tab: PatientTab) => void
}

const savedDark = localStorage.getItem('medtrack-dark') === 'true'

export const useUiStore = create<UIStore>((set) => ({
  darkMode: savedDark,
  toggleDarkMode: () =>
    set((s) => {
      const next = !s.darkMode
      localStorage.setItem('medtrack-dark', String(next))
      return { darkMode: next }
    }),
  labPreviewOpen: false,
  setLabPreviewOpen: (open) => set({ labPreviewOpen: open }),
  activePatientTab: 'history',
  setActivePatientTab: (tab) => set({ activePatientTab: tab }),
}))
