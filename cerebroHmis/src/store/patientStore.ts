import { create } from 'zustand'
import type { Patient } from '../types'
import { patients as initialPatients } from '../data/mockData'

interface PatientStore {
  patients: Patient[]
  activePatientId: string | null
  setActivePatient: (id: string) => void
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: initialPatients,
  activePatientId: null,
  setActivePatient: (id) => set({ activePatientId: id }),
}))
