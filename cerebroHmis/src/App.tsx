import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import PatientsPage from './pages/PatientsPage'
import PatientProfile from './pages/PatientProfile'
import AppointmentsPage from './pages/AppointmentsPage'
import BillingPage from './pages/BillingPage'
import PrescriptionsPage from './pages/PrescriptionsPage'
import NewPatientPage from './pages/NewPatientPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/patients" replace />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="patients/new" element={<NewPatientPage />} />
          <Route path="patients/:id" element={<PatientProfile />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="prescriptions" element={<PrescriptionsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
