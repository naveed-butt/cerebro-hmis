import type { Patient, Visit, Diagnosis, Prescription, LabFile, Transaction, Appointment } from '../types'

export const patients: Patient[] = [
  {
    id: 'P-0024', name: 'Maria Santos', initials: 'MS', age: 52, sex: 'F',
    dob: 'Mar 14, 1972', phone: '+1 (555) 201-4832', insurance: 'BlueCross PPO',
    condTag: 'Hypertension', condType: 'am', avatarColor: '#d97706',
    lastVisit: 'Jun 12', nextAppt: 'Jul 10', status: 'Active',
    totalVisits: 14, totalBilled: '$3,820',
  },
  {
    id: 'P-0031', name: 'James O\'Brien', initials: 'JO', age: 67, sex: 'M',
    dob: 'Sep 3, 1956', phone: '+1 (555) 344-9012', insurance: 'Medicare Advantage',
    condTag: 'Diabetes T2', condType: 'bl', avatarColor: '#0891b2',
    lastVisit: 'Jun 18', nextAppt: 'Jul 2', status: 'Active',
    totalVisits: 22, totalBilled: '$6,140',
  },
  {
    id: 'P-0018', name: 'Priya Mehta', initials: 'PM', age: 34, sex: 'F',
    dob: 'Jan 27, 1990', phone: '+1 (555) 489-7231', insurance: 'Aetna HMO',
    condTag: 'Asthma', condType: 'pu', avatarColor: '#7c3aed',
    lastVisit: 'May 30', nextAppt: 'Jul 15', status: 'Refill Due',
    totalVisits: 8, totalBilled: '$1,960',
  },
  {
    id: 'P-0047', name: 'Kenji Andou', initials: 'KA', age: 29, sex: 'M',
    dob: 'Nov 11, 1994', phone: '+1 (555) 610-3344', insurance: 'Cigna PPO',
    condTag: 'New Patient', condType: 'gr', avatarColor: '#059669',
    lastVisit: '—', nextAppt: 'Jun 30', status: 'New',
    totalVisits: 0, totalBilled: '$0',
  },
  {
    id: 'P-0039', name: 'Amina Rashid', initials: 'AR', age: 44, sex: 'F',
    dob: 'Apr 5, 1980', phone: '+1 (555) 772-8890', insurance: 'UnitedHealth PPO',
    condTag: 'Thyroid', condType: 'pk', avatarColor: '#db2777',
    lastVisit: 'Jun 5', nextAppt: 'Jul 20', status: 'Active',
    totalVisits: 11, totalBilled: '$2,750',
  },
  {
    id: 'P-0012', name: 'Lucia Vasquez', initials: 'LV', age: 58, sex: 'F',
    dob: 'Aug 22, 1965', phone: '+1 (555) 893-5567', insurance: 'Medicaid',
    condTag: 'Hypertension', condType: 'am', avatarColor: '#64748b',
    lastVisit: 'Jun 20', nextAppt: 'Aug 1', status: 'Active',
    totalVisits: 18, totalBilled: '$4,210',
  },
]

export const visits: Visit[] = [
  {
    day: '12', mon: 'Jun',
    type: 'Routine Follow-up',
    notes: 'BP reading 142/88 — slightly elevated. Patient reports good compliance with Amlodipine 5 mg. Advised to reduce sodium intake and increase daily walking. Lab results reviewed: CBC normal, fasting glucose slightly elevated at 112 mg/dL.',
    badge: 'BP: 142 / 88',
  },
  {
    day: '28', mon: 'Apr',
    type: 'Medication Review',
    notes: 'Reviewed Amlodipine dosage. No adverse effects reported. Patient self-monitoring at home — average readings around 138/86. Renewed prescription for 3 months. Referred to dietitian.',
    badge: 'Amlodipine renewed',
  },
  {
    day: '15', mon: 'Feb',
    type: 'Initial Consultation',
    notes: 'First visit for persistent headaches and occasional dizziness. BP measured at 158/96. Diagnosed Stage 1 Hypertension. Started on Amlodipine 5 mg daily. Ordered baseline CBC, metabolic panel, and ECG.',
    badge: 'Dx: Hypertension',
  },
]

export const diagnoses: Diagnosis[] = [
  { code: 'I10', label: 'Essential Hypertension', since: 'Feb 2026', severity: 'Moderate', sevType: 'am' },
  { code: 'E11.9', label: 'Type 2 Diabetes (borderline)', since: 'Jun 2026', severity: 'Watch', sevType: 'bl' },
  { code: 'F41.1', label: 'Generalised Anxiety Disorder', since: 'Feb 2026', severity: 'Mild', sevType: 'gr' },
]

export const prescriptions: Prescription[] = [
  { drug: 'Amlodipine', dose: '5 mg', patient: 'Maria Santos', freq: 'Once daily', refills: 2, expires: 'Sep 30, 2026', status: 'Active' },
  { drug: 'Metformin', dose: '500 mg', patient: 'James O\'Brien', freq: 'Twice daily with meals', refills: 1, expires: 'Aug 15, 2026', status: 'Active' },
  { drug: 'Salbutamol Inhaler', dose: '100 mcg', patient: 'Priya Mehta', freq: 'As needed (PRN)', refills: 0, expires: 'Jul 1, 2026', status: 'Refill Due' },
  { drug: 'Levothyroxine', dose: '50 mcg', patient: 'Amina Rashid', freq: 'Once daily (fasting)', refills: 3, expires: 'Dec 31, 2026', status: 'Active' },
  { drug: 'Lisinopril', dose: '10 mg', patient: 'Lucia Vasquez', freq: 'Once daily', refills: 2, expires: 'Oct 15, 2026', status: 'Active' },
]

export const labFiles: LabFile[] = [
  { name: 'CBC Full Panel', type: 'PDF Report', size: '1.2 MB', icon: '📄', uploadedAt: 'Jun 12, 2026' },
  { name: 'Metabolic Panel', type: 'PDF Report', size: '890 KB', icon: '📄', uploadedAt: 'Feb 20, 2026' },
  { name: 'ECG Tracing', type: 'Image / PNG', size: '3.4 MB', icon: '🩺', uploadedAt: 'Feb 20, 2026' },
]

export const labResults = [
  { test: 'Hemoglobin', result: '14.2 g/dL', ref: '13.5 – 17.5', flag: 'Normal', flagType: 'ok' },
  { test: 'White Blood Cells', result: '7.8 K/μL', ref: '4.5 – 11.0', flag: 'Normal', flagType: 'ok' },
  { test: 'Platelets', result: '215 K/μL', ref: '150 – 400', flag: 'Normal', flagType: 'ok' },
  { test: 'Creatinine', result: '1.1 mg/dL', ref: '0.7 – 1.3', flag: 'Normal', flagType: 'ok' },
  { test: 'Glucose (fasting)', result: '112 mg/dL', ref: '70 – 100', flag: '↑ High', flagType: 'hi' },
  { test: 'Total Cholesterol', result: '218 mg/dL', ref: '< 200', flag: '↑ High', flagType: 'hi' },
  { test: 'HDL Cholesterol', result: '45 mg/dL', ref: '> 40', flag: 'Normal', flagType: 'ok' },
  { test: 'LDL Cholesterol', result: '148 mg/dL', ref: '< 130', flag: '↑ High', flagType: 'hi' },
]

export const appointments: Appointment[] = [
  { id: 'a1', time: '9:00 AM', name: 'Maria Santos', type: 'Follow-up', dur: '30 min', status: 'Confirmed', patientId: 'P-0024' },
  { id: 'a2', time: '10:30 AM', name: 'James O\'Brien', type: 'Medication Review', dur: '20 min', status: 'Confirmed', patientId: 'P-0031' },
  { id: 'a3', time: '12:00 PM', name: 'Kenji Andou', type: 'New Patient Intake', dur: '60 min', status: 'Confirmed', patientId: 'P-0047' },
  { id: 'a4', time: '2:30 PM', name: 'Priya Mehta', type: 'Prescription Renewal', dur: '15 min', status: 'Cancelled', patientId: 'P-0018' },
]

export const transactions: Transaction[] = [
  { patient: 'Maria Santos', service: 'Follow-up Consultation', date: 'Jun 12', amount: '$150', status: 'Paid' },
  { patient: 'James O\'Brien', service: 'Diabetes Management', date: 'Jun 18', amount: '$220', status: 'Paid' },
  { patient: 'Amina Rashid', service: 'Thyroid Panel + Consult', date: 'Jun 5', amount: '$310', status: 'Pending' },
  { patient: 'Lucia Vasquez', service: 'Routine Follow-up', date: 'Jun 20', amount: '$150', status: 'Paid' },
  { patient: 'Priya Mehta', service: 'Inhaler Prescription Review', date: 'May 30', amount: '$120', status: 'Pending' },
]
