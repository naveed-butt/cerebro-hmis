export interface Patient {
  id: string
  name: string
  initials: string
  age: number
  sex: 'M' | 'F' | 'Other'
  dob: string
  phone: string
  insurance: string
  condTag: string
  condType: 'am' | 'bl' | 'pu' | 'gr' | 'pk' | 're'
  avatarColor: string
  lastVisit: string
  nextAppt: string
  status: 'Active' | 'New' | 'Refill Due'
  totalVisits: number
  totalBilled: string
}

export interface Visit {
  day: string
  mon: string
  type: string
  notes: string
  badge: string
}

export interface Diagnosis {
  code: string
  label: string
  since: string
  severity: string
  sevType: 'am' | 'bl' | 'gr' | 're' | 'pu' | 'pk'
}

export interface Prescription {
  drug: string
  dose: string
  patient: string
  freq: string
  refills: number
  expires: string
  status: 'Active' | 'Refill Due'
}

export interface LabFile {
  name: string
  type: string
  size: string
  icon: string
  uploadedAt: string
}

export interface Transaction {
  patient: string
  service: string
  date: string
  amount: string
  status: 'Paid' | 'Pending'
}

export interface Appointment {
  id: string
  time: string
  name: string
  type: string
  dur: string
  status: 'Confirmed' | 'Cancelled' | 'Pending'
  patientId: string
}
